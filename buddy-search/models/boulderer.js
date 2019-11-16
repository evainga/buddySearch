const mongoose = require('mongoose')

const BouldererSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  level: {
    type: String,
    enum: ['BEGINNER', 'MEDIUM', 'ADVANCED', 'PROFESSIONAL'],
    required: true
  },
  boulderSessions: {
    type: Number,
    required: false,
    default: 0
  }
})

const BouldererModel = mongoose.model('Boulderer', BouldererSchema)

module.exports = BouldererModel
