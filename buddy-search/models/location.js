const mongoose = require('mongoose')

const LocationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2
  },
  boulderers: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Location',
    autopopulate: {
      maxDepth: 1
    }
  }]
})

LocationSchema.plugin(require('mongoose-autopopulate'))

const LocationModel = mongoose.model('Location', LocationSchema)

module.exports = LocationModel
