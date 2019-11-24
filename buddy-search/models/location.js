const mongoose = require('mongoose')

const LocationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2
  },
  address: {
    type: String,
    required: false
  }
})

LocationSchema.plugin(require('mongoose-autopopulate'))

const LocationModel = mongoose.model('Location', LocationSchema)

module.exports = LocationModel
