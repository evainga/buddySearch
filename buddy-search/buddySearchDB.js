const fs = require('fs')

const save = function (filename, buddySearch) {
  fs.writeFileSync(filename, JSON.stringify(buddySearch, null, 2))
}

const load = function (filename) {
  return JSON.parse(fs.readFileSync(filename, 'utf8'))
}

const saveSearch = function (buddySearch) {
  const dataStorage = 'buddySearch.json'

  if (fs.existsSync(dataStorage)) {
    const buddySearches = this.load(dataStorage)
    const buddySearchSummaries = []
    buddySearches.forEach(buddySearch => {
      const summary = buddySearch.summary
      buddySearchSummaries.push(summary)
    })
    if (buddySearchSummaries.includes(buddySearch.summary)) {
      console.log('Could not save ' + buddySearch.summary + ' because it was already saved!')
    } else {
      buddySearches.push(buddySearch)
      this.save(dataStorage, buddySearches)
    }
  } else {
    const initialArray = [buddySearch]
    this.save(dataStorage, initialArray)
  }
}

module.exports = { save, load, saveSearch }
