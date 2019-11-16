const BaseService = require('./base-service')
const BuddySearchModel = require('../models/buddy-search')

class BuddySearchService extends BaseService {
  constructor () {
    super(BuddySearchModel)
  }

  async createSearch (bouldererId, locationId, date) {
    const buddySearch = new BuddySearchModel()
    buddySearch.boulderer = bouldererId
    buddySearch.location = locationId
    buddySearch.date = date.toLocaleDateString('de-DE')
    buddySearch.participants = []

    await this.add(buddySearch)
  }

  async addParticipant (bouldererId, searchId) {
    const search = await this.find(searchId)
    search.participants.push(bouldererId)
    await search.save()
  }
}

module.exports = new BuddySearchService()
