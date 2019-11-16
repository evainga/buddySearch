const express = require('express')
const router = express.Router()

const BuddySearchService = require('../services/buddy-search-service')
const BouldererService = require('../services/boulderer-service')
const LocationService = require('../services/location-service')

router.get('/all', async (req, res) => {
  const buddySearches = await BuddySearchService.findAll()
  res.render('buddy-search', { buddySearches })
})

router.get('/:id', async (req, res) => {
  const id = req.params.id
  const buddySearch = await BuddySearchService.find(id)
  res.send(buddySearch)
})

router.post('/', async (req, res) => {
  const date = new Date(req.body.date)
  const boulderer = await BouldererService.find(req.body.bouldererId)
  const location = await LocationService.find(req.body.locationId)
  const buddySearch = await BouldererService.searchBuddy(boulderer, location, date)
  res.send(buddySearch)
})

router.post('/join', async (req, res) => {
  const boulderer = await BouldererService.find(req.body.bouldererId)
  const buddySearch = await boulderer.joinBuddy(req.body.searchId)
  res.send(buddySearch)
})

router.delete('/:id', async (req, res) => {
  const id = req.params.id
  await BuddySearchService.del(id)
  res.send('ok')
})

module.exports = router
