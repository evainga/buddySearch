import test from 'ava'
import request from 'supertest'
import app from '../app'
import MongodbMemoryServer from 'mongodb-memory-server'
import mongoose from 'mongoose'

import Boulderer from '../models/boulderer'

const mongod = new MongodbMemoryServer()

const boulderer = new Boulderer({
  name: 'boulderer',
  age: 32,
  level: 'ADVANCED',
  buddySearches: []
})

test.before(async () => {
  const uri = await mongod.getConnectionString()
  await mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true })
})

test.serial('Create new location', async t => {
  t.plan(3)

  // When
  const res = await request(app)
    .post('/boulderer')
    .send(boulderer)

  // Then
  t.is(res.status, 200)
  t.is(res.body.name, boulderer.name)
  t.is(res.body.address, boulderer.address)
})

test.serial('Get all boulderers', async t => {
  t.plan(4)

  // Given
  await boulderer.save()

  const boulderer2 = new Boulderer({
    name: 'boulderer 2',
    age: 22,
    level: 'BEGINNER',
    buddySearches: []
  })

  await boulderer2.save()

  // When
  const res = await request(app).get('/boulderer/all')
  const jsonRes = await request(app).get('/boulderer/all/json')

  // Then
  t.is(res.status, 200)
  t.is(jsonRes.status, 200)
  t.true(Array.isArray(jsonRes.body), 'Body should be an array')
  t.true(jsonRes.body.length > 0)
})

test.serial('Get specific boulderer', async t => {
  t.plan(2)

  // Given
  const createdBouldererBody = (await request(app).post('/boulderer').send(boulderer)).body

  // When
  const res = await request(app).get(`/boulderer/${createdBouldererBody._id}`)

  // Then
  t.is(res.status, 200)
  t.deepEqual(res.body, createdBouldererBody)
})

test.serial('Delete specific boulderer', async t => {
  t.plan(3)

  // Given
  const createdBouldererBody = (await request(app).post('/boulderer').send(boulderer)).body

  // When
  const res = await request(app).delete(`/boulderer/${createdBouldererBody._id}`)

  // Then
  t.is(res.status, 200)
  t.is(res.ok, true)

  const fetch = await request(app).get(`/boulderer/${createdBouldererBody._id}`)
  console.log(fetch.body)
  t.is(fetch.status, 404)
})

test.afterEach.always(() => Boulderer.deleteMany())
