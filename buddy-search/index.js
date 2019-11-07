const bodyParser = require('body-parser')
const express = require('express')

const BuddySearchService = require('./services/buddy-search-service')
const BouldererService = require('./services/boulderer-service')
const LocationService = require('./services/location-service')

const app = express()
app.use(bodyParser.json())

app.set('view engine', 'pug')

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/boulderer/all', async (req, res) => {
  const boulderers = await BouldererService.findAll()
  res.render('boulderer', { boulderers })
})

app.get('/buddy-search/all', async (req, res) => {
  const buddySearches = await BuddySearchService.findAll()
  res.render('buddy-search', { buddySearches })
})

app.get('/location/all', async (req, res) => {
  const locations = await LocationService.findAll()
  res.render('location', { locations })
})

app.get('/boulderer/:id', async (req, res) => {
  const id = req.params.id
  const boulderer = await BouldererService.find(id)
  res.send(boulderer)
})

app.get('/location/:id', async (req, res) => {
  const id = req.params.id
  const location = await LocationService.find(id)
  res.send(location)
})

app.get('/buddy-search/:id', async (req, res) => {
  const id = req.params.id
  const buddySearch = await BuddySearchService.find(id)
  res.send(buddySearch)
})

app.post('/boulderer', async (req, res) => {
  const boulderer = await BouldererService.add(req.body)
  res.send(boulderer)
})

app.post('/location', async (req, res) => {
  const location = await LocationService.add(req.body)
  res.send(location)
})

app.post('/buddy-search', async (req, res) => {
  const buddySearch = await BuddySearchService.add(req.body)
  res.send(buddySearch)
})

app.delete('boulderer/:id', async (req, res) => {
  const id = req.params.id
  await BouldererService.del(id)
  res.send('ok')
})

app.delete('location/:id', async (req, res) => {
  const id = req.params.id
  await LocationService.del(id)
  res.send('ok')
})

app.delete('buddy-search/:id', async (req, res) => {
  const id = req.params.id
  await BuddySearchService.del(id)
  res.send('ok')
})

app.listen(3000, () => {
  console.log('listening')
})
