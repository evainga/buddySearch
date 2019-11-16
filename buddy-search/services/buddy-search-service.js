const BaseService = require('./base-service')
const BuddySearchModel = require('../models/buddy-search')

class BuddySearchService extends BaseService {
  constructor () {
    super(BuddySearchModel)
  }
}

module.exports = new BuddySearchService()
