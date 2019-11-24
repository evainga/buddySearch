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

    const buddySearch = new BuddySearchModel()
    buddySearch.boulderer = boulderer
    buddySearch.location = location
    buddySearch.date = date.toLocaleDateString('de-DE')
    buddySearch.participants = []

    boulderer.buddySearches.push(buddySearch)

    await boulderer.save()
    const savedBuddySearch = await this.add(buddySearch)
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
