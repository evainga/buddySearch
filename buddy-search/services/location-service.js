const BaseService = require('./base-service')
const LocationModel = require('../models/location')

class LocationService extends BaseService {
  model = LocationModel
}

module.exports = new LocationService()