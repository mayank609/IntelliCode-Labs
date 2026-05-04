require('dotenv').config()

const bcrypt = require('bcryptjs')
const { v4: uuidv4 } = require('uuid')
const { readDb, writeDb } = require('./db')

const username = process.env.ADMIN_USERNAME || 'admin'
const password = process.env.ADMIN_PASSWORD || 'admin123'

const db = readDb()

if (db.admins.find(a => a.username === username)) {
  console.log(`Admin '${username}' already exists — skipping.`)
  process.exit(0)
}

db.admins.push({
  id: uuidv4(),
  username,
  passwordHash: bcrypt.hashSync(password, 10),
  createdAt: new Date().toISOString(),
})

writeDb(db)
console.log(`\n  ✓ Admin created`)
console.log(`    Username : ${username}`)
console.log(`    Password : ${password}`)
console.log(`\n  Change the password in .env before going to production.\n`)
