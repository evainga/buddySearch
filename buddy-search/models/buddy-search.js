module.exports = class BuddySearch {
  constructor (name, location, date, level, summary = this.summarizeSearch(name, location, date, level), id) {
    this.name = name
    this.location = location
    this.date = date
    this.level = level
    this.summary = summary
    this.id = id
  };

  summarizeSearch (name, location, date, level) {
    return name + '-' + location.name + '-' + date + '-' + level
  }

  static create ({ name, location, date, level, summary, id }) {
    return new BuddySearch(name, location, date, level, summary, id)
  }
}
