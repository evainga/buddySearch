module.exports = class Surfspot {
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