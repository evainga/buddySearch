const BaseService = require('./base-service')
const BuddySearchModel = require('../models/buddy-search')
const BouldererService = require('../services/boulderer-service')
const LocationService = require('../services/location-service')

class BuddySearchService extends BaseService {
  constructor () {
    super(BuddySearchModel)
  }

  async createSearch (bouldererId, locationId, date) {
    const boulderer = await BouldererService.find(bouldererId)
    const location = await LocationService.find(locationId)

    const buddySearchData = {
      boulderer,
      location,
      date: date.toLocaleDateString('de-DE'),
      participants: []
    }

    const savedBuddySearch = await this.add(buddySearchData)
    await boulderer.buddySearches.push(savedBuddySearch)
    await boulderer.save()
    return savedBuddySearch
  }

  async addParticipant (bouldererId, searchId) {
    const search = await this.find(searchId)
    const boulderer = await BouldererService.find(bouldererId)
    if (!search.participants.includes(boulderer)) {
      search.participants.push(boulderer)
      await search.save()
      return search
    } else throw new Error('participant already takes part at session!')
  }
}

module.exports = new BuddySearchService()
