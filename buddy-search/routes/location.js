const express = require('express')
const router = express.Router()

const LocationService = require('../services/location-service')

router.get('/all', async (req, res) => {
  const locations = await LocationService.findAll()
  res.render('location', { locations })
})

router.get('/:id', async (req, res) => {
  const id = req.params.id
  const location = await LocationService.find({ _id: id })
  res.send(location)
})

router.post('/', async (req, res) => {
  const location = await LocationService.add(req.body)
  res.send(location)
})

router.delete('/:id', async (req, res) => {
  const id = req.params.id
  await LocationService.del(id)
  res.send('ok')
})

module.exports = router
