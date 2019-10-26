module.exports = class Surfer {
    constructor(name) {
        this.name = name;
        this.surfboards = [];
        this.surfSessions = 0;
    }

    surf(surfspot) {
        if (surfspot.swell === 0 || this.surfboards.length === 0) {
            if (surfspot.swell === 0) {
                console.log(this.name + " can't surf " + surfspot.name + " because currently there is no swell!");
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

    buy(surfboard) {
        console.log(this.name + " buys " + surfboard.modelName);
        this.surfboards.push(surfboard);
    }
};