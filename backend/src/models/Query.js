const mongoose = require('mongoose')

const querySchema = new mongoose.Schema({
  name:    { type: String, required: true },
  email:   { type: String, required: true },
  company: { type: String, default: '' },
  service: { type: String, default: '' },
  message: { type: String, required: true },
  status:  { type: String, enum: ['new', 'read', 'responded', 'archived'], default: 'new' },
  notes:   { type: String, default: '' },
}, { timestamps: true })

module.exports = mongoose.model('Query', querySchema)
