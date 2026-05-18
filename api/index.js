require('dotenv').config()
const mongoose = require('mongoose')
const createApp = require('../backend/src/app')

let cachedApp = null
let isConnected = false

async function getApp() {
  if (!isConnected) {
    await mongoose.connect(process.env.MONGODB_URI)
    isConnected = true
  }
  if (!cachedApp) {
    cachedApp = createApp()
  }
  return cachedApp
}

module.exports = async (req, res) => {
  const app = await getApp()
  return app(req, res)
}
