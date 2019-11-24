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

test.afterEach.always(async () => {
  await BuddySearchModel.deleteMany()
  await LocationModel.deleteMany()
  await BouldererModel.deleteMany()
})
