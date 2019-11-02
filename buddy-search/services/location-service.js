const BaseService = require('./base-service')
const LocationModel = require('../models/location')

class LocationService extends BaseService {
  constructor () {
    super(LocationModel, `${__dirname}/../location.json`)
  }
}

module.exports = new LocationService()
