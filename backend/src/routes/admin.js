const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Query = require('../models/Query')
const Admin = require('../models/Admin')
const Subscriber = require('../models/Subscriber')
const requireAuth = require('../middleware/auth')

const router = express.Router()

/* ── AUTH ── */

router.post('/login', async (req, res) => {
  const { username, password } = req.body
  if (!username || !password) return res.status(400).json({ error: 'username and password required' })

  try {
    const admin = await Admin.findOne({ username })
    if (!admin || !bcrypt.compareSync(password, admin.passwordHash)) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const token = jwt.sign(
      { id: admin._id, username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    )
    res.json({ token, username: admin.username })
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

router.post('/logout', requireAuth, (_req, res) => {
  res.json({ success: true })
})

/* ── STATS ── */

router.get('/stats', requireAuth, async (_req, res) => {
  try {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const [total, newCount, readCount, respondedCount, archivedCount, todayCount, byServiceAgg, subscriberCount] = await Promise.all([
      Query.countDocuments(),
      Query.countDocuments({ status: 'new' }),
      Query.countDocuments({ status: 'read' }),
      Query.countDocuments({ status: 'responded' }),
      Query.countDocuments({ status: 'archived' }),
      Query.countDocuments({ createdAt: { $gte: today } }),
      Query.aggregate([
        { $group: { _id: { $ifNull: ['$service', 'Not specified'] }, count: { $sum: 1 } } },
      ]),
      Subscriber.countDocuments(),
    ])

    const byService = {}
    byServiceAgg.forEach(item => { byService[item._id || 'Not specified'] = item.count })

    res.json({ total, new: newCount, read: readCount, responded: respondedCount, archived: archivedCount, today: todayCount, byService, subscribers: subscriberCount })
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

/* ── QUERIES ── */

router.get('/queries', requireAuth, async (req, res) => {
  try {
    const { status, service, search, sort = 'newest' } = req.query
    const filter = {}

    if (status) filter.status = status
    if (service) filter.service = service
    if (search) {
      const s = new RegExp(search, 'i')
      filter.$or = [{ name: s }, { email: s }, { company: s }, { message: s }]
    }

    const sortOrder = sort === 'oldest' ? { createdAt: 1 } : { createdAt: -1 }
    const queries = await Query.find(filter).sort(sortOrder)
    res.json(queries)
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

router.get('/queries/export', requireAuth, async (_req, res) => {
  try {
    const queries = await Query.find().sort({ createdAt: -1 })
    const header = 'ID,Name,Email,Company,Service,Status,Message,Notes,Date\n'
    const rows = queries.map(q => {
      const esc = v => `"${String(v || '').replace(/"/g, '""')}"`
      return [q._id, esc(q.name), esc(q.email), esc(q.company), esc(q.service), q.status, esc(q.message), esc(q.notes), new Date(q.createdAt).toISOString()].join(',')
    })
    res.setHeader('Content-Type', 'text/csv')
    res.setHeader('Content-Disposition', 'attachment; filename="queries.csv"')
    res.send(header + rows.join('\n'))
  } catch { res.status(500).json({ error: 'Server error' }) }
})

router.get('/queries/:id', requireAuth, async (req, res) => {
  try {
    const query = await Query.findById(req.params.id)
    if (!query) return res.status(404).json({ error: 'Not found' })

    if (query.status === 'new') {
      query.status = 'read'
      await query.save()
    }

    res.json(query)
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

router.patch('/queries/:id', requireAuth, async (req, res) => {
  try {
    const { status, notes } = req.body
    const validStatuses = ['new', 'read', 'responded', 'archived']
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' })
    }

    const update = {}
    if (status) update.status = status
    if (notes !== undefined) update.notes = notes

    const query = await Query.findByIdAndUpdate(req.params.id, update, { new: true })
    if (!query) return res.status(404).json({ error: 'Not found' })
    res.json(query)
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

router.delete('/queries/:id', requireAuth, async (req, res) => {
  try {
    const query = await Query.findByIdAndDelete(req.params.id)
    if (!query) return res.status(404).json({ error: 'Not found' })
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

/* ── BULK ACTIONS ── */

router.post('/queries/bulk-delete', requireAuth, async (req, res) => {
  const { ids } = req.body
  if (!Array.isArray(ids)) return res.status(400).json({ error: 'ids must be an array' })

  try {
    const result = await Query.deleteMany({ _id: { $in: ids } })
    res.json({ success: true, deleted: result.deletedCount })
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

router.post('/queries/bulk-status', requireAuth, async (req, res) => {
  const { ids, status } = req.body
  const validStatuses = ['new', 'read', 'responded', 'archived']
  if (!Array.isArray(ids) || !validStatuses.includes(status)) {
    return res.status(400).json({ error: 'Invalid request' })
  }

  try {
    await Query.updateMany({ _id: { $in: ids } }, { status })
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

/* ── SUBSCRIBERS ── */

router.get('/subscribers', requireAuth, async (_req, res) => {
  try {
    const subs = await Subscriber.find().sort({ createdAt: -1 })
    res.json(subs)
  } catch { res.status(500).json({ error: 'Server error' }) }
})

router.post('/subscribers/bulk-delete', requireAuth, async (req, res) => {
  const { ids } = req.body
  if (!Array.isArray(ids)) return res.status(400).json({ error: 'ids must be array' })
  try {
    await Subscriber.deleteMany({ _id: { $in: ids } })
    res.json({ success: true })
  } catch { res.status(500).json({ error: 'Server error' }) }
})

router.delete('/subscribers/:id', requireAuth, async (req, res) => {
  try {
    await Subscriber.findByIdAndDelete(req.params.id)
    res.json({ success: true })
  } catch { res.status(500).json({ error: 'Server error' }) }
})

/* ── CHANGE PASSWORD ── */

router.post('/change-password', requireAuth, async (req, res) => {
  const { currentPassword, newPassword } = req.body
  if (!currentPassword || !newPassword || newPassword.length < 6) {
    return res.status(400).json({ error: 'currentPassword and newPassword (min 6 chars) required' })
  }
  try {
    const admin = await Admin.findById(req.admin.id)
    if (!admin || !bcrypt.compareSync(currentPassword, admin.passwordHash)) {
      return res.status(401).json({ error: 'Current password is incorrect' })
    }
    admin.passwordHash = bcrypt.hashSync(newPassword, 10)
    await admin.save()
    res.json({ success: true })
  } catch { res.status(500).json({ error: 'Server error' }) }
})

module.exports = router
