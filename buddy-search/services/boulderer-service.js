const BaseService = require('./base-service')
const BouldererModel = require('../models/boulderer')
const BuddySearchModel = require('../models/buddy-search')
const BuddySearchService = require('./buddy-search-service')

class BouldererService extends BaseService {
  constructor () {
    super(BouldererModel)
  }

  async searchBuddy (boulderer, location, date) {
    const buddySearch = new BuddySearchModel()
    buddySearch.boulderer = boulderer
    buddySearch.location = location
    buddySearch.date = date.toLocaleDateString('de-DE')
    buddySearch.participants = []

    await BuddySearchService.add(buddySearch)
  }

  // async joinBuddy (buddySearchId) {
  //   const search = await BuddySearchService.find(buddySearchId)
  //   const newParticipant = await BuddySearchService.find(this.id)
  //   const oldParticipants = await search.participants
  //   const newParticipants = oldParticipants.push(newParticipant)
  //   await BuddySearchService.del(buddySearchId)

  //   const updatedSearch = new BuddySearchModel(search.name, search.location, search.date, search.level, newParticipants)

  //   await buddySearch.save(updatedSearch)
  // }
}

module.exports = new BouldererService()
