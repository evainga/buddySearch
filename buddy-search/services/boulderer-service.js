const BaseService = require('./base-service')
const BouldererModel = require('../models/boulderer')

class BouldererService extends BaseService {
  constructor () {
    super(BouldererModel, `${__dirname}/../boulderer.json`)
  }
}

module.exports = new BouldererService()
