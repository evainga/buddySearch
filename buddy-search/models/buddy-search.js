module.exports = class BuddySearch {
  constructor (name, location, date, level, participants, summary = this.summarizeSearch(name, location, date, level, participants), id) {
    this.name = name
    this.location = location
    this.date = date
    this.level = level
    this.participants = participants
    this.summary = summary
    this.id = id
  };

  summarizeSearch (name, location, date, level, participants) {
    const summary = name + '-' + location.name + '-' + date + '-' + level

    if (participants.length === 0) {
      return summary
    } else {
      const participantNames = participants.map(p => p.name)
      return summary + ' with participants: ' + participantNames.join(', ')
    }
  }

  static create ({ name, location, date, level, participants, summary, id }) {
    return new BuddySearch(name, location, date, level, participants, summary, id)
  }
}
