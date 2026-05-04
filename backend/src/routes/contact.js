const express = require('express')
const { v4: uuidv4 } = require('uuid')
const { readDb, writeDb } = require('../db')

const router = express.Router()

router.post('/', (req, res) => {
  const { name, email, company, service, message } = req.body

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'name, email, and message are required' })
  }

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRe.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' })
  }

  const db = readDb()
  const query = {
    id: uuidv4(),
    name: name.trim(),
    email: email.trim().toLowerCase(),
    company: (company || '').trim(),
    service: (service || '').trim(),
    message: message.trim(),
    status: 'new',
    notes: '',
    createdAt: new Date().toISOString(),
  }

  db.queries.unshift(query)
  writeDb(db)

  res.json({ success: true, message: 'Your message has been received. We\'ll be in touch within 24 hours.' })
})

module.exports = router
