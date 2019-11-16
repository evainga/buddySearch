const mongoose = require('mongoose')

const BouldererSchema = new mongoose.Schema({
  name: String,
  level: String,
  boulderSessions: {
    type: Number,
    default: 0
  }
})

const BouldererModel = mongoose.model('Boulderer', BouldererSchema)

module.exports = BouldererModel
