const Boulderer = require('./models/boulderer')
const Location = require('./models/location')

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

  await eva.searchBuddy(brightSite, new Date(2019, 10, 30))
  await mike.searchBuddy(boulderGarten, new Date(2019, 11, 1))
  await mike.searchBuddy(boulderGarten, new Date(2019, 11, 1))
}

main()
