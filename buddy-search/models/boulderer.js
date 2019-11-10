const BuddySearch = require('./buddy-search')
const BuddySearchService = require('../services/buddy-search-service')

module.exports = class Boulderer {
  constructor (name, level, boulderSessions = 0, id) {
    this.name = name
    this.level = level
    this.boulderSessions = boulderSessions
    this.id = id
  }

  async searchBuddy (location, date) {
    const formattedDate = date.toLocaleDateString('de-DE')
    const participants = []
    const buddySearch = new BuddySearch(this.name, location, formattedDate, this.level, participants)

    console.log(this.name + ' is searching for a boulder buddy with search ' + buddySearch.summary)

    await BuddySearchService.add(buddySearch)
  }

  async joinBuddy (buddySearchId) {
    const search = await BuddySearchService.find(buddySearchId)
    const newParticipant = await BuddySearchService.find(this.id)
    const oldParticipants = await search.participants
    const newParticipants = oldParticipants.push(newParticipant)
    await BuddySearchService.del(buddySearchId)
    
    const updatedSearch = new BuddySearch(search.name, search.location, search.date, search.level, newParticipants)
    
    await BuddySearchService.add(updatedSearch)
  }

  boulder (location) {
    console.log(this.name + ' boulders ' + location.name)
    this.boulderSessions += 1
    if (!location.boulderers.includes(this)) {
      location.boulderers.push(this)
    }
  }

  printName () {
    return console.log(this.name)
  }

  static create ({ name, level, boulderSessions, id }) {
    return new Boulderer(name, level, boulderSessions, id)
  }
}
