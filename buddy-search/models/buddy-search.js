const mongoose = require('mongoose')

const BuddySearchSchema = new mongoose.Schema({
  boulderer: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true
    },
  location: {
    type:  mongoose.SchemaTypes.ObjectId,
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
      maxDepth: 1
    }
  }]
})

BuddySearchSchema.plugin(require('mongoose-autopopulate'))

const BuddySearchModel = mongoose.model('BuddySearch', BuddySearchSchema)

module.exports = BuddySearchModel
