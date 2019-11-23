import test from 'ava'
import request from 'supertest'
import app from '../app'
import MongodbMemoryServer from 'mongodb-memory-server'
import mongoose from 'mongoose'

import Location from '../models/location'

const mongod = new MongodbMemoryServer()

const location = new Location({
  name: 'location 1',
  address: 'address 1'
})

test.before(async () => {
  const uri = await mongod.getConnectionString()
  await mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true })
})

test.serial('Create new location', async t => {
  t.plan(3)

  // When
  const res = await request(app)
    .post('/location')
    .send(location)

  // Then
  t.is(res.status, 200)
  t.is(res.body.name, location.name)
  t.is(res.body.address, location.address)
})

test.serial('Get all locations', async t => {
  t.plan(4)

  // Given
  await location.save()

  const location2 = new Location({
    name: 'location 2',
    address: 'address 2'
  })

  await location2.save()

  // When
  const res = await request(app).get('/location/all')
  const jsonRes = await request(app).get('/location/all/json')

  // Then
  t.is(res.status, 200)
  t.is(jsonRes.status, 200)
  t.true(Array.isArray(jsonRes.body), 'Body should be an array')
  t.true(jsonRes.body.length > 0)
})

test.serial('Get specific location', async t => {
  t.plan(2)

  // Given
  const createdLocationBody = (await request(app).post('/location').send(location)).body

  // When
  const res = await request(app).get(`/location/${createdLocationBody._id}`)

  // Then
  t.is(res.status, 200)
  t.deepEqual(res.body, createdLocationBody)
})

test.serial('Delete specific location', async t => {
  t.plan(3)

  // Given
  const createdLocationBody = (await request(app).post('/location').send(location)).body

  // When
  const res = await request(app).delete(`/location/${createdLocationBody._id}`)

  // Then
  t.is(res.status, 200)
  t.is(res.ok, true)

  const fetch = await request(app).get(`/location/${createdLocationBody._id}`)
  console.log(fetch.body)
  t.is(fetch.status, 404)
})

test.afterEach.always(() => Location.deleteMany())
