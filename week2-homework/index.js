const Boulderer = require("./boulderer")
const BoulderShoe = require("./boulderShoe")
const Location = require("./location")


printName = Boulderer => console.log(Boulderer.name);

eva = new Boulderer("Eva");
mike = new Boulderer("Mike");

brightSite = new Location("Bright Site");
boulderGarten = new Location("Bouldergarten");

boulderGarten.printBouldererNames();
brightSite.printBouldererNames();

eva.boulder(boulderGarten);

dipper = new BoulderShoe("Dipper");
loonie = new BoulderShoe("Loonie");

eva.buy(loonie);
eva.boulder(brightSite);
eva.boulder(boulderGarten);
eva.boulder(boulderGarten);
mike.buy(dipper);
mike.boulder(boulderGarten);

mike.boulder(boulderGarten);

boulderGarten.printBouldererNames();
brightSite.printBouldererNames();
