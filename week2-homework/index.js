const Boulderer = require("./boulderer")
const Location = require("./location")

printName = Boulderer => console.log(Boulderer.name)

eva = new Boulderer("Eva", "ADVANCED")
mike = new Boulderer("Mike", "BEGINNER")

brightSite = new Location("Bright Site");
boulderGarten = new Location("Bouldergarten")

boulderGarten.printBouldererNames()
brightSite.printBouldererNames()

eva.boulder(boulderGarten)
eva.boulder(boulderGarten)
mike.boulder(boulderGarten)
mike.boulder(brightSite)

boulderGarten.printBouldererNames()
brightSite.printBouldererNames()

eva.searchBuddy(brightSite, new Date(2019, 10, 30))
mike.searchBuddy(boulderGarten, new Date(2019, 11, 01))