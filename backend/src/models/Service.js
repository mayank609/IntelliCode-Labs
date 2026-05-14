const mongoose = require('mongoose')
const schema = new mongoose.Schema({
  icon:      { type: String, default: '' },
  title:     { type: String, required: true },
  desc:      { type: String, default: '' },
  bullets:   { type: [String], default: [] },
  order:     { type: Number, default: 0 },
  published: { type: Boolean, default: true },
}, { timestamps: true })
module.exports = mongoose.model('Service', schema)
