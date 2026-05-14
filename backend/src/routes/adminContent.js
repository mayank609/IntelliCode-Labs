const express = require('express')
const BlogPost   = require('../models/BlogPost')
const CaseStudy  = require('../models/CaseStudy')
const Service    = require('../models/Service')
const Product    = require('../models/Product')
const Industry   = require('../models/Industry')
const requireAuth = require('../middleware/auth')
const router = express.Router()

const MODELS = { blogs: BlogPost, 'case-studies': CaseStudy, services: Service, products: Product, industries: Industry }

// List all (including unpublished) for admin
router.get('/:type', requireAuth, async (req, res) => {
  const Model = MODELS[req.params.type]
  if (!Model) return res.status(404).json({ error: 'Unknown type' })
  try {
    const docs = await Model.find().sort({ order: 1, createdAt: 1 })
    res.json(docs)
  } catch { res.status(500).json({ error: 'Server error' }) }
})

// Create
router.post('/:type', requireAuth, async (req, res) => {
  const Model = MODELS[req.params.type]
  if (!Model) return res.status(404).json({ error: 'Unknown type' })
  try {
    const doc = await Model.create(req.body)
    res.status(201).json(doc)
  } catch (err) { res.status(400).json({ error: err.message }) }
})

// Update
router.patch('/:type/:id', requireAuth, async (req, res) => {
  const Model = MODELS[req.params.type]
  if (!Model) return res.status(404).json({ error: 'Unknown type' })
  try {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!doc) return res.status(404).json({ error: 'Not found' })
    res.json(doc)
  } catch (err) { res.status(400).json({ error: err.message }) }
})

// Delete
router.delete('/:type/:id', requireAuth, async (req, res) => {
  const Model = MODELS[req.params.type]
  if (!Model) return res.status(404).json({ error: 'Unknown type' })
  try {
    await Model.findByIdAndDelete(req.params.id)
    res.json({ success: true })
  } catch { res.status(500).json({ error: 'Server error' }) }
})

module.exports = router
