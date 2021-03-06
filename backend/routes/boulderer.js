const express = require('express')
const router = express.Router()

const BouldererService = require('../services/boulderer-service')

router.get('/all', async (req, res) => {
  const boulderers = await BouldererService.findAll()
  res.render('boulderer', { boulderers })
})

router.get('/all/json', async (req, res) => {
  const boulderers = await BouldererService.findAll()
  res.send(boulderers)
})

router.get('/:id', async (req, res) => {
  const id = req.params.id
  const boulderer = await BouldererService.find(id)
  if (!boulderer) res.status(404)
  res.send(boulderer)
})

router.post('/', async (req, res) => {
  const boulderer = await BouldererService.add(req.body)
  res.send(boulderer)
})

router.delete('/:id', async (req, res) => {
  const id = req.params.id
  await BouldererService.del(id)
  res.send('ok')
})

module.exports = router
