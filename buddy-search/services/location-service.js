const BaseService = require('./base-service')
const LocationModel = require('../models/location')

class LocationService extends BaseService {
  constructor() {
    super(LocationModel)
  } 
}

module.exports = new LocationService()