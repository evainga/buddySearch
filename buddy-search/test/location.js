import test from 'ava'
import request from 'supertest'
import app from '../app'

import Location from '../models/location'

test('Create new location', async t => {
  t.plan(3)

  // When
  const location = {
    name: 'location name',
    address: 'address 1'
  }

  const res = await request(app)
    .post('/location')
    .send(location)

  // Then
  t.is(res.status, 200)
  t.is(res.body.name, location.name)
  t.is(res.body.address, location.address)
})

test('Get all locations', async t => {
  t.plan(4)

  // Given
  const location1 = {
    name: 'location name 1'
  }

  await request(app)
    .post('/location')
    .send(location1)

  // When
  const res = await request(app).get('/location/all')
  const jsonRes = await request(app).get('/location/all/json')

  // Then
  t.is(res.status, 200)
  t.is(jsonRes.status, 200)
  t.true(Array.isArray(jsonRes.body), 'Body should be an array')
  t.true(jsonRes.body.length > 0)
})

test('Get specific location', async t => {
  t.plan(2)

  // Given
  const location = {
    name: 'location name'
  }

  const createdLocationBody = (await request(app).post('/location').send(location)).body

  // When
  const res = await request(app).get(`/location/${createdLocationBody._id}`)

  // Then
  t.is(res.status, 200)
  t.deepEqual(res.body, createdLocationBody)
})

test('Delete specific location', async t => {
  t.plan(3)

  // Given
  const location = {
    name: 'location name'
  }

  const createdLocationBody = (await request(app).post('/location').send(location)).body

  // When
  const res = await request(app).delete(`/location/${createdLocationBody._id}`)

  // Then
  t.is(res.status, 200)
  t.is(res.ok, true)

  const fetch = await request(app).get(`/location/${createdLocationBody._id}`)
  t.is(fetch.status, 404)
})