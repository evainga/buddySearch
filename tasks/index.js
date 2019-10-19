Surfer = class {
    constructor(name) {
        this.name = name;
        this.surfboards = [];
        this.surfSessions = 0;
    }

    surfs(surfspot) {
        if (surfspot.swell === 0 || this.surfboards.length === 0) {
            if (surfspot.swell === 0) {
                console.log(this.name + " can't surf " + surfspot.name + " because currently there is no Swell!");
            }
            if (this.surfboards.length === 0) {
                console.log(this.name + " can't surf because " + this.name + " has no surf board!");
            }
        } else {
            console.log(this.name + " surfs " + surfspot.name);
            this.surfSessions += 1;
            if (!surfspot.surfers.includes(this)) {
                surfspot.surfers.push(this);
            }
        }
    }

    buys(surfboard) {
        console.log(this.name + " buys " + surfboard.modelName);
        this.surfboards.push(surfboard);
    }
};

Surfspot = class {
    constructor(name) {
        this.name = name;
        this.surfers = [];
        this.swell = 0;
    }

    printSurferNames() {
        if (this.surfers.length === 0) {
            console.log("Nobody has surfed " + this.name + ".");
        } else {
            console.log("Surfers who have surfed " + this.name + ":");
            this.surfers.forEach(printName);
        }
    }
};

Surfboard = class {
    constructor(modelName) {
        this.modelName = modelName;
    }
};

Swell = class {
    constructor(power) {
        this.power = power;
    }

    arrivesAt(surfspot) {
        if (this.power > 0) {
            console.log("Swell arrives at " + surfspot.name);
            surfspot.swell = surfspot.swell + this.power;
            getCurrentSwell(surfspot);
        }
    }

    leavesFrom(surfspot) {
        if (surfspot.swell >= this.power) {
            surfspot.swell = surfspot.swell - this.power;

            console.log("Swell leaves from " + surfspot.name);
            getCurrentSwell(surfspot);
        } else {
            console.log("Error: " + surfspot.name + " currently doesn't have enough swell, so it can't leave!");
        }
    }
};

printName = surfer => console.log(surfer.name);
getCurrentSwell = surfspot => console.log("Swell at " + surfspot.name + " is now " + surfspot.swell);

eva = new Surfer("Eva");
mike = new Surfer("Mike");

uluwatu = new Surfspot("Uluwatu");
muizenberg = new Surfspot("Muizenberg");

muizenberg.printSurferNames();
uluwatu.printSurferNames();

eva.surfs(muizenberg);

strongSwell = new Swell(5);
weakSwell = new Swell(1);

weakSwell.arrivesAt(muizenberg);
strongSwell.arrivesAt(uluwatu);

sharkie = new Surfboard("Sharkie");
dipper = new Surfboard("Dipper");
loonie = new Surfboard("Loonie");

eva.buys(loonie);
eva.surfs(uluwatu);
eva.surfs(muizenberg);
eva.surfs(muizenberg);
mike.buys(dipper);
mike.surfs(muizenberg);

weakSwell.leavesFrom(muizenberg);
weakSwell.leavesFrom(muizenberg);
mike.surfs(muizenberg);

muizenberg.printSurferNames();
uluwatu.printSurferNames();
