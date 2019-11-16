const express = require('express')
const router = express.Router()

const BuddySearchService = require('../services/buddy-search-service')

router.get('/all', async (req, res) => {
  const buddySearches = await BuddySearchService.findAll()
  res.render('buddy-search', { buddySearches })
})

router.get('/:id', async (req, res) => {
  const id = req.params.id
  const buddySearch = await BuddySearchService.find(id)
  res.send(buddySearch)
})

router.post('/search', async (req, res) => {
  const date = new Date(req.body.date)
  const buddySearch = await BuddySearchService.createSearch(req.body.bouldererId, req.body.locationId, date)
  res.send(buddySearch)
})

router.post('/join', async (req, res) => {
  const buddySearch = await BuddySearchService.addParticipant(req.body.bouldererId, req.body.searchId)
  res.send(buddySearch)
})

router.delete('/:id', async (req, res) => {
  const id = req.params.id
  await BuddySearchService.del(id)
  res.send('ok')
})

module.exports = router
