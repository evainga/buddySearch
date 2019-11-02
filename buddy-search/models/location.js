module.exports = class Location {
  constructor (name, boulderers = [], id) {
    this.name = name
    this.boulderers = boulderers
    this.id = id
  }

  printBouldererNames () {
    if (this.boulderers.length === 0) {
      console.log('Nobody has bouldered ' + this.name + '.')
    } else {
      console.log('Boulderers who have bouldered ' + this.name + ':')
      this.boulderers.forEach(boulderer => boulderer.printName())
    }
  }

  static create ({ name, boulderers, id }) {
    return new Location(name, boulderers, id)
  }
}
