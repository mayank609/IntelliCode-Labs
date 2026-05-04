const fs = require('fs')
const path = require('path')

const DB_PATH = path.join(__dirname, '../data/db.json')

const DEFAULT_DATA = { queries: [], admins: [] }

function readDb() {
  const dir = path.dirname(DB_PATH)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  if (!fs.existsSync(DB_PATH)) fs.writeFileSync(DB_PATH, JSON.stringify(DEFAULT_DATA, null, 2))
  return JSON.parse(fs.readFileSync(DB_PATH, 'utf8'))
}

function writeDb(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2))
}

module.exports = { readDb, writeDb }
