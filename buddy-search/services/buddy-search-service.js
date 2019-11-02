const BaseService = require('./base-service')
const BuddySearchModel = require('../models/buddy-search')

class BuddySearchService extends BaseService {
  constructor () {
    super(BuddySearchModel, `${__dirname}/../buddy-search.json`)
  }
}

module.exports = new BuddySearchService()
