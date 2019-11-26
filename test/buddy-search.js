import test from 'ava'
import request from 'supertest'
import app from '../app'

import BuddySearchModel from '../models/buddy-search'
import LocationModel from '../models/location'
import BouldererModel from '../models/boulderer'

test.serial('Create new buddy search', async t => {
  t.plan(4)

  // Given
  const boulderer = {
    name: 'boulderer',
    age: 22,
    level: 'ADVANCED',
    buddySearches: []
  }

  const location = { name: 'bright site' }

  const buddySearchCreated = {
    boulderer,
    location,
    date: '2019-11-11',
    participants: []
  }

  const createdLocationBody = (await request(app).post('/location').send(location)).body
  const createdBouldererBody = (await request(app).post('/boulderer').send(boulderer)).body

  const search = {
    bouldererId: `${createdBouldererBody._id}`,
    locationId: `${createdLocationBody._id}`,
    date: '2019-11-11'
  }

  // When
  const res = await request(app)
    .post('/buddy-search/search')
    .send(search)

  // Then
  t.is(res.status, 200)
  const buddySearchFetched = await request(app).get(`/buddy-search/${res.text}`)

  t.deepEqual(buddySearchFetched.body.boulderer.name, buddySearchCreated.boulderer.name)
  t.deepEqual(buddySearchFetched.body.location.name, buddySearchCreated.location.name)
  t.deepEqual(buddySearchFetched.body.date, buddySearchCreated.date)
})

test.serial('Get all buddy searches', async t => {
  t.plan(4)
  // Given

  const boulderer = {
    name: 'boulderer',
    level: 'ADVANCED'
  }

  const location = { name: 'bright site' }

  const createdLocationBody = (await request(app).post('/location').send(location)).body
  const createdBouldererBody = (await request(app).post('/boulderer').send(boulderer)).body

  const search = {
    bouldererId: `${createdBouldererBody._id}`,
    locationId: `${createdLocationBody._id}`,
    date: '2019-11-12'
  }

  await request(app).post('/buddy-search/search').send(search)

  // When
  const res = await request(app).get('/buddy-search/all')
  const jsonRes = await request(app).get('/buddy-search/all/json')

  // Then
  t.is(res.status, 200)
  t.is(jsonRes.status, 200)
  t.true(Array.isArray(jsonRes.body), 'Body should be an array')
  t.true(jsonRes.body.length > 0)
})

test.serial('Get specific buddy search', async t => {
  t.plan(2)

  // Given
  const boulderer = {
    name: 'boulderer',
    level: 'ADVANCED'
  }

  const location = { name: 'bright site' }

  const createdLocationBody = (await request(app).post('/location').send(location)).body
  const createdBouldererBody = (await request(app).post('/boulderer').send(boulderer)).body

  const search = {
    bouldererId: `${createdBouldererBody._id}`,
    locationId: `${createdLocationBody._id}`,
    date: '2019-11-13'
  }

  const createdBuddySearchId = (await request(app).post('/buddy-search/search').send(search)).text

  // When
  const res = await request(app).get(`/buddy-search/${createdBuddySearchId}`)

  // Then
  t.is(res.status, 200)
  t.deepEqual(res.body.boulderer.name, 'boulderer')
})

test.serial('Delete specific buddy search', async t => {
  t.plan(3)

  // Given
  // Given
  const boulderer = {
    name: 'boulderer',
    level: 'ADVANCED'
  }

  const location = { name: 'bright site' }

  const createdLocationBody = (await request(app).post('/location').send(location)).body
  const createdBouldererBody = (await request(app).post('/boulderer').send(boulderer)).body

  const search = {
    bouldererId: `${createdBouldererBody._id}`,
    locationId: `${createdLocationBody._id}`,
    date: '2019-11-13'
  }

  const createdBuddySearchId = (await request(app).post('/buddy-search/search').send(search)).text

  // When
  const res = await request(app).delete(`/buddy-search/${createdBuddySearchId}`)

  // Then
  t.is(res.status, 200)
  t.is(res.ok, true)

  const fetch = await request(app).get(`/buddy-search/${createdBuddySearchId}`)
  t.is(fetch.status, 404)
})

test.serial('Join a buddy search', async t => {
  t.plan(2)

  // Given
  const bouldererSearching = {
    name: 'boulderer',
    level: 'ADVANCED'
  }
  const bouldererJoining = {
    name: 'boulderer searching',
    level: 'ADVANCED'
  }

  const location = { name: 'bright site' }

  const locationBody = (await request(app).post('/location').send(location)).body
  const bouldererSearchingBody = (await request(app).post('/boulderer').send(bouldererSearching)).body
  const bouldererJoiningBody = (await request(app).post('/boulderer').send(bouldererJoining)).body

  const search = {
    bouldererId: `${bouldererSearchingBody._id}`,
    locationId: `${locationBody._id}`,
    date: '2019-11-14'
  }

  const buddySearchId = (await request(app).post('/buddy-search/search').send(search)).text


  const joinObject = { bouldererId: bouldererJoiningBody._id, searchId: buddySearchId }

  // When
  const res = await request(app).post('/buddy-search/join').send(joinObject)

  // Then
  t.is(res.status, 200)
  t.truthy(res.body.participants.length === 1)
})

test.serial('Throws error when participant has already joined', async t => {
  t.plan(2)

  // Given
  const bouldererSearching = {
    name: 'boulderer',
    level: 'ADVANCED'
  }
  const bouldererJoining = {
    name: 'boulderer searching',
    level: 'ADVANCED'
  }

  const location = { name: 'bright site' }

  const locationBody = (await request(app).post('/location').send(location)).body
  const bouldererSearchingBody = (await request(app).post('/boulderer').send(bouldererSearching)).body
  const bouldererJoiningBody = (await request(app).post('/boulderer').send(bouldererJoining)).body

  const search = {
    bouldererId: `${bouldererSearchingBody._id}`,
    locationId: `${locationBody._id}`,
    date: '2019-11-14'
  }

  const buddySearchId = (await request(app).post('/buddy-search/search').send(search)).text
  const buddySearch = await request(app).get(`/buddy-search/${buddySearchId}`)
  await buddySearch.participants.push(bouldererJoiningBody._id)

  const joinObject = { bouldererId: bouldererJoiningBody._id, searchId: buddySearchId }

  // When
  const resAfterSecondJoin = await request(app).post('/buddy-search/join').send(joinObject)

  // Then
  console.log(resAfterSecondJoin)
  t.is(resAfterSecondJoin.status, 200)
  t.is(resAfterSecondJoin.message, 'participant already takes part at session!')
})

test.afterEach.always(async () => {
  await BuddySearchModel.deleteMany()
  await LocationModel.deleteMany()
  await BouldererModel.deleteMany()
})
