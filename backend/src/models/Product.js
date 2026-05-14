const mongoose = require('mongoose')
const schema = new mongoose.Schema({
  badge:       { type: String, default: '' },
  title:       { type: String, required: true },
  tagline:     { type: String, default: '' },
  desc:        { type: String, default: '' },
  tags:        { type: [String], default: [] },
  metric:      { type: String, default: '' },
  metricLabel: { type: String, default: '' },
  features:    { type: [String], default: [] },
  color:       { type: String, default: '' },
  order:       { type: Number, default: 0 },
  published:   { type: Boolean, default: true },
}, { timestamps: true })
module.exports = mongoose.model('Product', schema)
