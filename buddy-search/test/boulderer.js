import test from 'ava'
import request from 'supertest'
import app from '../app'
import MongodbMemoryServer from 'mongodb-memory-server'
import mongoose from 'mongoose'

import Boulderer from '../models/boulderer'

const mongod = new MongodbMemoryServer()

test.before(async () => {
  const uri = await mongod.getConnectionString('BBSearchTest')
  await mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true })
})

test.serial('Create new boulderer', async t => {
  t.plan(3)

  // Given
  const boulderer = {
    name: 'boulderer',
    age: 32,
    level: 'ADVANCED',
    buddySearches: []
  }

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
  const boulderer = {
    name: 'boulderer',
    level: 'ADVANCED'
  }

  await request(app)
    .post('/boulderer')
    .send(boulderer)

  const boulderer2 = {
    name: 'boulderer 2',
    level: 'BEGINNER'
  }

  await request(app)
    .post('/boulderer')
    .send(boulderer2)

  // When
  const res = await request(app).get('/boulderer/all')
  const jsonRes = await request(app).get('/boulderer/all/json')

  // Then
  t.is(res.status, 200)
  t.is(jsonRes.status, 200)
  t.true(Array.isArray(jsonRes.body), 'Body should be an array')
  t.true(jsonRes.body.length === 2)
})

test.serial('Get specific boulderer', async t => {
  t.plan(2)

  // Given
  const boulderer = {
    name: 'boulderer',
    level: 'ADVANCED'
  }

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
  const boulderer = {
    name: 'boulderer',
    level: 'ADVANCED'
  }

  const createdBouldererBody = (await request(app).post('/boulderer').send(boulderer)).body

  // When
  const res = await request(app).delete(`/boulderer/${createdBouldererBody._id}`)

  // Then
  t.is(res.status, 200)
  t.is(res.ok, true)

  const fetch = await request(app).get(`/boulderer/${createdBouldererBody._id}`)
  t.is(fetch.status, 404)
})

test.afterEach.always(() => Boulderer.deleteMany())

test.after.always(async t => {
  mongoose.disconnect()
  mongod.stop()
})
