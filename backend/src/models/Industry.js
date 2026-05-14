const mongoose = require('mongoose')
const schema = new mongoose.Schema({
  tag:         { type: String, default: '' },
  title:       { type: String, required: true },
  desc:        { type: String, default: '' },
  bgWord:      { type: String, default: '' },
  metric:      { type: String, default: '' },
  metricLabel: { type: String, default: '' },
  variant:     { type: String, default: 'dark' },
  challenges:  { type: [String], default: [] },
  solutions:   { type: [String], default: [] },
  order:       { type: Number, default: 0 },
  published:   { type: Boolean, default: true },
}, { timestamps: true })
module.exports = mongoose.model('Industry', schema)
