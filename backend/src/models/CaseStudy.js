const mongoose = require('mongoose')
const schema = new mongoose.Schema({
  client:      { type: String, default: '' },
  title:       { type: String, required: true },
  domain:      { type: String, default: '' },
  metric:      { type: String, default: '' },
  metricLabel: { type: String, default: '' },
  desc:        { type: String, default: '' },
  image:       { type: String, default: '' },
  order:       { type: Number, default: 0 },
  published:   { type: Boolean, default: true },
}, { timestamps: true })
module.exports = mongoose.model('CaseStudy', schema)
