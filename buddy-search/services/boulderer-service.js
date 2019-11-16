const BaseService = require('./base-service')
const BouldererModel = require('../models/boulderer')

class BouldererService extends BaseService {
  model = BouldererModel

  async searchBuddy (location, date) {
    const formattedDate = date.toLocaleDateString('de-DE')
    const participants = []
    const buddySearch = new BuddySearch(this.name, location, formattedDate, this.level, participants)

    await BuddySearchService.add(buddySearch)
  }

  async joinBuddy (buddySearchId) {
    const search = await BuddySearchService.find(buddySearchId)
    const newParticipant = await BuddySearchService.find(this.id)
    const oldParticipants = await search.participants
    const newParticipants = oldParticipants.push(newParticipant)
    await BuddySearchService.del(buddySearchId)
    
    const updatedSearch = new BuddySearch(search.name, search.location, search.date, search.level, newParticipants)
    
    await buddySearch.save(updatedSearch)
  }
}

module.exports = new BouldererService()
