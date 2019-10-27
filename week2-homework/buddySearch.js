module.exports = class BuddySearch {
  constructor (name, location, date, level) {
    this.name = name
    this.location = location
    this.date = date
    this.level = level
    this.summary = this.summarizeSearch(name, location, date, level)
  };

  summarizeSearch (name, location, date, level) {
    return name + '-' + location.name + '-' + date + '-' + level
  }
}
