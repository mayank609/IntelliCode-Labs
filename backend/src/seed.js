require('dotenv').config()

const bcrypt = require('bcryptjs')
const { connect } = require('./db')
const Admin = require('./models/Admin')

const username = process.env.ADMIN_USERNAME || 'admin'
const password = process.env.ADMIN_PASSWORD || 'admin123'

async function seed() {
  await connect()

  const existing = await Admin.findOne({ username })
  if (existing) {
    console.log(`Admin '${username}' already exists — skipping.`)
    process.exit(0)
  }

  await Admin.create({
    username,
    passwordHash: bcrypt.hashSync(password, 10),
  })

  console.log(`\n  ✓ Admin created`)
  console.log(`    Username : ${username}`)
  console.log(`    Password : ${password}`)
  console.log(`\n  Change the password in .env before going to production.\n`)
  process.exit(0)
}

seed().catch(err => { console.error(err); process.exit(1) })
