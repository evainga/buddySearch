const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')

const bouldererRouter = require('./routes/boulderer')
const locationRouter = require('./routes/location')
const buddySearchRouter = require('./routes/buddy-search')

require('./mongo-connection')

const app = express()

app.use(cors())

app.set('view engine', 'pug')
app.use(bodyParser.json())

app.use('/boulderer', bouldererRouter)
app.use('/location', locationRouter)
app.use('/buddy-search', buddySearchRouter)

app.get('/', (req, res) => {
  res.render('index')
})

module.exports = app
