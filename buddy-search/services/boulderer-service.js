const BaseService = require('./base-service')
const BouldererModel = require('../models/boulderer')
const BuddySearchModel = require('../models/buddy-search')
const BuddySearchService = require('./buddy-search-service')

class BouldererService extends BaseService {
  constructor () {
    super(BouldererModel)
  }

  async searchBuddy (bouldererId, locationId, date) {
    const buddySearch = new BuddySearchModel()
    buddySearch.boulderer = bouldererId
    buddySearch.location = locationId
    buddySearch.date = date.toLocaleDateString('de-DE')
    buddySearch.participants = []

    await BuddySearchService.add(buddySearch)
  }

  async joinBuddy (bouldererId, searchId) {
    const search = await BuddySearchService.find(searchId)
    search.participants.push(bouldererId)
    await search.save()
  }
}

module.exports = new BouldererService()
