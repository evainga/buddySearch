const BuddySearch = require('./buddy-search')
const BuddySearchService = require('../services/buddy-search-service')
const moment = require('moment')

module.exports = class Boulderer {
  constructor (name, level, boulderSessions = 0, id) {
    this.name = name
    this.level = level
    this.boulderSessions = boulderSessions
    this.id = id
  }

  async searchBuddy (location, date) {
    var dateFormatted = moment(date).format('D/M/YYYY')
    const buddySearch = new BuddySearch(this.name, location, dateFormatted, this.level)

    console.log(this.name + ' is searching for a boulder buddy')

    await BuddySearchService.add(buddySearch)
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
