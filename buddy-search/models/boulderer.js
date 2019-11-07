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
    const buddySearch = new BuddySearch(this.name, location, formattedDate, this.level)

    console.log(this.name + ' is searching for a boulder buddy with search ' + buddySearch.summary)

    await BuddySearchService.add(buddySearch)
  }

  async deleteBuddySearch (locationName, date) {
    const formattedDate = date.toLocaleDateString('de-DE')
    const allSearches = await BuddySearchService.findAll()
    const buddySearches = allSearches.filter(buddySearch =>
      buddySearch.location.name === locationName && buddySearch.date === formattedDate)

    await buddySearches.forEach(async (buddySearch) =>
      await BuddySearchService.del(buddySearch.id)
    )
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
