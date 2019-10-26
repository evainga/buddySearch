module.exports = class Location {
    constructor(name) {
        this.name = name;
        this.boulderers = [];
    }

    printBouldererNames() {
        if (this.boulderers.length === 0) {
            console.log("Nobody has bouldered " + this.name + ".");
        } else {
            console.log("Boulderers who have bouldered " + this.name + ":");
            this.boulderers.forEach(printName);
        }
    }
};