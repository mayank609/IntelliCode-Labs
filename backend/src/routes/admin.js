const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { readDb, writeDb } = require('../db')
const requireAuth = require('../middleware/auth')

const router = express.Router()

/* ── AUTH ── */

router.post('/login', (req, res) => {
  const { username, password } = req.body
  if (!username || !password) return res.status(400).json({ error: 'username and password required' })

  const db = readDb()
  const admin = db.admins.find(a => a.username === username)
  if (!admin || !bcrypt.compareSync(password, admin.passwordHash)) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }

  const token = jwt.sign(
    { id: admin.id, username: admin.username },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  )
  res.json({ token, username: admin.username })
})

router.post('/logout', requireAuth, (_req, res) => {
  res.json({ success: true })
})

/* ── STATS ── */

router.get('/stats', requireAuth, (_req, res) => {
  const db = readDb()
  const queries = db.queries
  const today = new Date().toDateString()

  const byService = queries.reduce((acc, q) => {
    const key = q.service || 'Not specified'
    acc[key] = (acc[key] || 0) + 1
    return acc
  }, {})

  res.json({
    total: queries.length,
    new: queries.filter(q => q.status === 'new').length,
    read: queries.filter(q => q.status === 'read').length,
    responded: queries.filter(q => q.status === 'responded').length,
    archived: queries.filter(q => q.status === 'archived').length,
    today: queries.filter(q => new Date(q.createdAt).toDateString() === today).length,
    byService,
  })
})

/* ── QUERIES ── */

router.get('/queries', requireAuth, (req, res) => {
  const { status, service, search, sort = 'newest' } = req.query
  let { queries } = readDb()

  if (status) queries = queries.filter(q => q.status === status)
  if (service) queries = queries.filter(q => q.service === service)
  if (search) {
    const s = search.toLowerCase()
    queries = queries.filter(q =>
      q.name.toLowerCase().includes(s) ||
      q.email.toLowerCase().includes(s) ||
      (q.company || '').toLowerCase().includes(s) ||
      q.message.toLowerCase().includes(s)
    )
  }
  if (sort === 'oldest') queries = [...queries].reverse()

  res.json(queries)
})

router.get('/queries/:id', requireAuth, (req, res) => {
  const db = readDb()
  const query = db.queries.find(q => q.id === req.params.id)
  if (!query) return res.status(404).json({ error: 'Not found' })

  if (query.status === 'new') {
    query.status = 'read'
    writeDb(db)
  }

  res.json(query)
})

router.patch('/queries/:id', requireAuth, (req, res) => {
  const db = readDb()
  const query = db.queries.find(q => q.id === req.params.id)
  if (!query) return res.status(404).json({ error: 'Not found' })

  const { status, notes } = req.body
  const validStatuses = ['new', 'read', 'responded', 'archived']
  if (status && !validStatuses.includes(status)) {
    return res.status(400).json({ error: 'Invalid status' })
  }

  if (status) query.status = status
  if (notes !== undefined) query.notes = notes

  writeDb(db)
  res.json(query)
})

router.delete('/queries/:id', requireAuth, (req, res) => {
  const db = readDb()
  const idx = db.queries.findIndex(q => q.id === req.params.id)
  if (idx === -1) return res.status(404).json({ error: 'Not found' })

  db.queries.splice(idx, 1)
  writeDb(db)
  res.json({ success: true })
})

/* ── BULK ACTIONS ── */

router.post('/queries/bulk-delete', requireAuth, (req, res) => {
  const { ids } = req.body
  if (!Array.isArray(ids)) return res.status(400).json({ error: 'ids must be an array' })

  const db = readDb()
  db.queries = db.queries.filter(q => !ids.includes(q.id))
  writeDb(db)
  res.json({ success: true, deleted: ids.length })
})

router.post('/queries/bulk-status', requireAuth, (req, res) => {
  const { ids, status } = req.body
  const validStatuses = ['new', 'read', 'responded', 'archived']
  if (!Array.isArray(ids) || !validStatuses.includes(status)) {
    return res.status(400).json({ error: 'Invalid request' })
  }

  const db = readDb()
  db.queries.forEach(q => { if (ids.includes(q.id)) q.status = status })
  writeDb(db)
  res.json({ success: true })
})

module.exports = router
