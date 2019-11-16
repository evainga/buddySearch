const BaseService = require('./base-service')
const BouldererModel = require('../models/boulderer')

class BouldererService extends BaseService {
  constructor () {
    super(BouldererModel)
  }
}

module.exports = new BouldererService()
