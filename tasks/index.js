Surfer = class {
    constructor(name) {
        this.name = name;
        this.surfboards = [];
        this.surfSessions = 0;
    }

    surfs(surfspot) {
        if (surfspot.hasSwell === false || this.surfboards.length === 0) {
            if (surfspot.hasSwell === false) {
                console.log(this.name + " can't surf " + surfspot.name + " because currently there are no waves!");
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
        this.hasSwell = false;
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

Waves = class {
    constructor(power) {
        this.power = power;
    }

    arriveAt(surfspot) {
        if (this.power > 0) {
            console.log("Waves arrive at " + surfspot.name);
            surfspot.hasSwell = true;
        }
    }

    leaveFrom(surfspot) {
        if (surfspot.hasSwell === true) {
            console.log("Waves leave from " + surfspot.name);
            surfspot.hasSwell = false;
        } else {
            console.log("Error: " + surfspot.name + " currently doesn't have waves, so they can't leave!");
        }
    }
};

printName = surfer => console.log(surfer.name);

eva = new Surfer("Eva");
mike = new Surfer("Mike");

uluwatu = new Surfspot("Uluwatu");
muizenberg = new Surfspot("Muizenberg");

muizenberg.printSurferNames();
uluwatu.printSurferNames();

eva.surfs(muizenberg);

strongWaves = new Waves(5);
weakWaves = new Waves(1);

weakWaves.arriveAt(muizenberg);
strongWaves.arriveAt(uluwatu);

sharkie = new Surfboard("Sharkie");
dipper = new Surfboard("Dipper");
loonie = new Surfboard("Loonie");

eva.buys(loonie);
eva.surfs(uluwatu);
eva.surfs(muizenberg);
eva.surfs(muizenberg);
mike.buys(dipper);
mike.surfs(muizenberg);

weakWaves.leaveFrom(muizenberg);
weakWaves.leaveFrom(muizenberg);
mike.surfs(muizenberg);

muizenberg.printSurferNames();
uluwatu.printSurferNames();
