const mongoose = require('mongoose')

const BouldererSchema = new mongoose.Schema({
  name: String,
  level: String,
  boulderSessions: 0
})

const BouldererModel = mongoose.model('Boulderer', BouldererSchema)

module.exports = BouldererModel

//   boulder (location) {
//     console.log(this.name + ' boulders ' + location.name)
//     this.boulderSessions += 1
//     if (!location.boulderers.includes(this)) {
//       location.boulderers.push(this)
//     }
//   }
