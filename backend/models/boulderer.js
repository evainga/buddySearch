const mongoose = require('mongoose')

const BouldererSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: false
  },
  level: {
    type: String,
    enum: ['BEGINNER', 'MEDIUM', 'ADVANCED', 'PROFESSIONAL'],
    required: true
  },
  buddySearches: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'BuddySearch',
    required: false,
    autopopulate: {
      maxDepth: 1
    }
  }]
})

BouldererSchema.plugin(require('mongoose-autopopulate'))

const BouldererModel = mongoose.model('Boulderer', BouldererSchema)

module.exports = BouldererModel
