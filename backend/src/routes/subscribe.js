const express = require('express')
const Subscriber = require('../models/Subscriber')
const router = express.Router()

router.post('/', async (req, res) => {
  const { email } = req.body
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email || !emailRe.test(email)) {
    return res.status(400).json({ error: 'Valid email required' })
  }
  try {
    await Subscriber.create({ email: email.trim().toLowerCase() })
    res.status(201).json({ success: true })
  } catch (err) {
    if (err.code === 11000) return res.json({ success: true }) // already subscribed silently
    res.status(500).json({ error: 'Failed to subscribe' })
  }
})

module.exports = router
