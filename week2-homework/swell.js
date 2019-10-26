module.exports = class Swell {
    constructor(power) {
        this.power = power;
    }

    arrive(surfspot) {
        if (this.power > 0) {
            console.log("Swell arrives at " + surfspot.name);
            surfspot.swell = surfspot.swell + this.power;
            getCurrentSwell(surfspot);
        }
    }

    leave(surfspot) {
        if (surfspot.swell >= this.power) {
            surfspot.swell = surfspot.swell - this.power;

            console.log("Swell leaves from " + surfspot.name);
            getCurrentSwell(surfspot);
        } else {
            console.log("Error: " + surfspot.name + " currently doesn't have enough swell, so it can't leave!");
        }
    }
};