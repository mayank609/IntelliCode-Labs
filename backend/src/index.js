require('dotenv').config()
const { connect } = require('./db')
const createApp = require('./app')

const PORT = process.env.PORT || 3001

connect()
  .then(() => {
    const app = createApp()
    app.listen(PORT, () => {
      console.log(`\n  IntelliCodeLabs backend →  http://localhost:${PORT}`)
      console.log(`  Health check             →  http://localhost:${PORT}/api/health\n`)
    })
  })
  .catch(err => {
    console.error('  MongoDB connection failed:', err.message)
    process.exit(1)
  })
