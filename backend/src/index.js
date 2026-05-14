require('dotenv').config()

const express = require('express')
const cors = require('cors')
const { connect } = require('./db')
const contactRouter = require('./routes/contact')
const adminRouter = require('./routes/admin')

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}))
app.use(express.json())

app.get('/api/health', (_req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }))
app.use('/api/contact', contactRouter)
const subscribeRouter = require('./routes/subscribe')
app.use('/api/subscribe', subscribeRouter)
const contentRouter = require('./routes/content')
const adminContentRouter = require('./routes/adminContent')
app.use('/api/content', contentRouter)
app.use('/api/admin/content', adminContentRouter)
app.use('/api/admin', adminRouter)

app.use((_req, res) => res.status(404).json({ error: 'Not found' }))

connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`\n  IntelliCodeLabs backend →  http://localhost:${PORT}`)
      console.log(`  Health check             →  http://localhost:${PORT}/api/health\n`)
    })
  })
  .catch(err => {
    console.error('  MongoDB connection failed:', err.message)
    process.exit(1)
  })
