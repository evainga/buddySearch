const Boulderer = require('./boulderer')
const Location = require('./location')
const BuddySearchDB = require('./buddySearchDB')

const eva = new Boulderer('Eva', 'ADVANCED')
const mike = new Boulderer('Mike', 'BEGINNER')

const brightSite = new Location('Bright Site')
const boulderGarten = new Location('Bouldergarten')

boulderGarten.printBouldererNames()
brightSite.printBouldererNames()

eva.boulder(boulderGarten)
eva.boulder(boulderGarten)
mike.boulder(boulderGarten)
mike.boulder(brightSite)

boulderGarten.printBouldererNames()
brightSite.printBouldererNames()

eva.searchBuddy(brightSite, new Date(2019, 10, 30))
mike.searchBuddy(boulderGarten, new Date(2019, 11, 1))

const buddySearches = BuddySearchDB.load('buddySearch.json')

buddySearches.forEach(buddySearch => {
  console.log(buddySearch)
})
