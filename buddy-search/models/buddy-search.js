const mongoose = require('mongoose')

const BuddySearchSchema = new mongoose.Schema({
  boulderer: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Boulderer',
    required: true
  },
  location: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Location',
    required: true
  },
  date: {
    type: String,
    required: true
  },
  participants: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Boulderer',
    autopopulate: {
      maxDepth: 2
    }
  }]
})

BuddySearchSchema.plugin(require('mongoose-autopopulate'))

mongoose.set('useCreateIndex', true)
BuddySearchSchema.index({ boulderer: 1, location: 1, date: 1 }, { unique: true })

const BuddySearchModel = mongoose.model('BuddySearch', BuddySearchSchema)

module.exports = BuddySearchModel
