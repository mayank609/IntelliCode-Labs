const express = require('express')
const cors = require('cors')
const contactRouter = require('./routes/contact')
const adminRouter = require('./routes/admin')
const subscribeRouter = require('./routes/subscribe')
const contentRouter = require('./routes/content')
const adminContentRouter = require('./routes/adminContent')

function createApp() {
  const app = express()

  const allowedOrigins = (process.env.FRONTEND_URL || 'http://localhost:5173')
    .split(',')
    .map(o => o.trim())

  app.use(cors({
    origin: (origin, cb) => {
      if (!origin || allowedOrigins.some(o => origin.startsWith(o))) return cb(null, true)
      cb(new Error('Not allowed by CORS'))
    },
    credentials: true,
  }))
  app.use(express.json())

  app.get('/api/health', (_req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }))
  app.use('/api/contact', contactRouter)
  app.use('/api/subscribe', subscribeRouter)
  app.use('/api/content', contentRouter)
  app.use('/api/admin/content', adminContentRouter)
  app.use('/api/admin', adminRouter)
  app.use((_req, res) => res.status(404).json({ error: 'Not found' }))

  return app
}

module.exports = createApp
