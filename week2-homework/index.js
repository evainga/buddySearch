const Surfer = require("./surfer")
const Surfboard = require("./surfboard")
const Swell = require("./swell")
const Surfspot = require("./surfspot")


printName = surfer => console.log(surfer.name);
getCurrentSwell = surfspot => console.log("Swell at " + surfspot.name + " is now " + surfspot.swell);

eva = new Surfer("Eva");
mike = new Surfer("Mike");

uluwatu = new Surfspot("Uluwatu");
muizenberg = new Surfspot("Muizenberg");

muizenberg.printSurferNames();
uluwatu.printSurferNames();

eva.surf(muizenberg);

strongSwell = new Swell(5);
weakSwell = new Swell(1);

weakSwell.arrive(muizenberg);
strongSwell.arrive(uluwatu);

sharkie = new Surfboard("Sharkie");
dipper = new Surfboard("Dipper");
loonie = new Surfboard("Loonie");

eva.buy(loonie);
eva.surf(uluwatu);
eva.surf(muizenberg);
eva.surf(muizenberg);
mike.buy(dipper);
mike.surf(muizenberg);

weakSwell.leave(muizenberg);
weakSwell.leave(muizenberg);
mike.surf(muizenberg);

muizenberg.printSurferNames();
uluwatu.printSurferNames();
