const express = require('express')
const BlogPost   = require('../models/BlogPost')
const CaseStudy  = require('../models/CaseStudy')
const Service    = require('../models/Service')
const Product    = require('../models/Product')
const Industry   = require('../models/Industry')
const router = express.Router()

const MODELS = { blogs: BlogPost, 'case-studies': CaseStudy, services: Service, products: Product, industries: Industry }

router.get('/:type', async (req, res) => {
  const Model = MODELS[req.params.type]
  if (!Model) return res.status(404).json({ error: 'Unknown content type' })
  try {
    const docs = await Model.find({ published: true }).sort({ order: 1, createdAt: 1 })
    res.json(docs)
  } catch { res.status(500).json({ error: 'Server error' }) }
})

module.exports = router
