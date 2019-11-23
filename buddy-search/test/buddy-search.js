import test from 'ava'
import request from 'supertest'
import app from '../app'
import MongodbMemoryServer from 'mongodb-memory-server'
import mongoose from 'mongoose'

import BuddySearchModel from '../models/buddy-search'
import LocationModel from '../models/location'
import BouldererModel from '../models/boulderer'

const mongod = new MongodbMemoryServer()

test.before(async () => {
  const uri = await mongod.getConnectionString()
  await mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true })
})

test('Create new buddySearch', async t => {
  t.plan(2)

  // Given
  const boulderer = new BouldererModel({
    name: 'boulderer',
    age: 22,
    level: 'ADVANCED',
    buddySearches: []
  })

  const location = new LocationModel({ name: 'location' })

  const buddySearchCreated = new BuddySearchModel({
    boulderer: boulderer,
    location: location,
    date: '2019-11-06',
    participants: []
  })

  const createdLocationBody = (await request(app).post('/location').send(location)).body
  const createdBouldererBody = (await request(app).post('/boulderer').send(boulderer)).body

  const search = {
    bouldererId: `${createdBouldererBody._id}`,
    locationId: `${createdLocationBody._id}`,
    date: '2019-11-06'
  }

  // When
  const res = await request(app)
    .post('/buddy-search/search')
    .send(search)

  // Then
  t.is(res.status, 200)
  const buddySearchFetched = res.body
  t.deepEqual(buddySearchFetched, buddySearchCreated)
})

test.afterEach.always(() => {
  BuddySearchModel.deleteMany()
  LocationModel.deleteMany()
  BouldererModel.deleteMany()
})