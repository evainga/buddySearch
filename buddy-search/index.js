const Boulderer = require('./models/boulderer')
const Location = require('./models/location')

const BuddySearchService = require('./services/buddy-search-service')
const BouldererService = require('./services/boulderer-service')
const LocationService = require('./services/location-service')

async function main () {
  const eva = new Boulderer('Eva', 'ADVANCED')
  const mike = new Boulderer('Mike', 'BEGINNER')

  const brightSite = new Location('Bright Site')
  const boulderGarten = new Location('Bouldergarten')

  await BouldererService.add(eva)
  await BouldererService.add(mike)
  await LocationService.add(brightSite)
  await LocationService.add(boulderGarten)

  boulderGarten.printBouldererNames()
  brightSite.printBouldererNames()

  eva.boulder(boulderGarten)
  eva.boulder(boulderGarten)
  mike.boulder(boulderGarten)
  mike.boulder(brightSite)

  boulderGarten.printBouldererNames()
  brightSite.printBouldererNames()

  const date = new Date(2019, 11, 1)
  await eva.searchBuddy(brightSite, new Date(2019, 10, 30))
  await mike.searchBuddy(boulderGarten, date)
  await mike.searchBuddy(boulderGarten, date)

  let allSearches = await BuddySearchService.findAll()
  console.log(allSearches.length)

  await mike.deleteBuddySearch(boulderGarten.name, date)

  allSearches = await BuddySearchService.findAll()
  console.log(allSearches.length)
  allSearches.forEach(search => {
    console.log(search.summary)
  })
}

main()
