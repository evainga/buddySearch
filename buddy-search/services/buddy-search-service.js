const BaseService = require('./base-service')
const BuddySearchModel = require('../models/buddy-search')

class BuddySearchService extends BaseService {
  model = BuddySearchModel
}

module.exports = new BuddySearchService()
