const mongoose = require('mongoose')

const BuddySearchSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2
  },
  location: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  level: {
    type: String,
    required: true
  },
  participants: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Participant',
    autopopulate: {
      maxDepth: 1
    }
  }],
  summary: {
    type: String,
    required: true
  }
})

BuddySearchSchema.plugin(require('mongoose-autopopulate'))

const BuddySearchModel = mongoose.model('BuddySearch', BuddySearchSchema)

module.exports = BuddySearchModel

// summarizeSearch (name, location, date, level, participants) {
//   const summary = name + '-' + location.name + '-' + date + '-' + level

//   if (participants.length === 0) {
//     return summary
//   } else {
//     const participantNames = participants.map(p => p.name)
//     return summary + ' with participants: ' + participantNames.join(', ')
//   }
// }
