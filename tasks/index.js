Surfer = class {
    constructor(name) {
        this.name = name;
        this.surfboards = [];
        this.surfSessions = 0;
    }

    surfs(surfspot) {
        console.log(this.name + " surfs " + surfspot.name);
        this.surfSessions += 1;
        if (!surfspot.surfers.includes(this)) {
            surfspot.surfers.push(this);
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
    }

    printSurferNames() {
        console.log("Surfers who have surfed " + this.name + ":");
        this.surfers.forEach(printName);
    }
};

Surfboard = class {
    constructor(modelName) {
        this.modelName = modelName;
    }
};

printName = surfer => console.log(surfer.name);

eva = new Surfer("Eva");
mike = new Surfer("Mike");

shark = new Surfboard("Shark");
dipper = new Surfboard("Dipper");
loonie = new Surfboard("Loonie");

uluwatu = new Surfspot("Uluwatu");
muizenberg = new Surfspot("Muizenberg");

eva.buys(loonie);
eva.surfs(uluwatu);
eva.surfs(muizenberg);
eva.surfs(muizenberg);

mike.buys(dipper);
mike.surfs(muizenberg);

muizenberg.printSurferNames();
