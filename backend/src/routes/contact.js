const express = require('express')
const Query = require('../models/Query')

const router = express.Router()

router.post('/', async (req, res) => {
  const { name, email, company, service, message } = req.body

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'name, email, and message are required' })
  }

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRe.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' })
  }

  try {
    const query = await Query.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      company: (company || '').trim(),
      service: (service || '').trim(),
      message: message.trim(),
    })
    res.status(201).json({ success: true, message: "Your message has been received. We'll be in touch within 24 hours.", id: query._id })
  } catch (err) {
    res.status(500).json({ error: 'Failed to save query' })
  }
})

module.exports = router
