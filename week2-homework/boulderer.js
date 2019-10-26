module.exports = class Boulderer {
    constructor(name) {
        this.name = name;
        this.boulderShoes = [];
        this.boulderSessions = 0;
    }

    boulder(location) {
        if (this.boulderShoes.length === 0) {
            if (this.boulderShoes.length === 0) {
                console.log(this.name + " can't boulder because " + this.name + " has no boulder shoes!");
            }
        } else {
            console.log(this.name + " boulders " + location.name);
            this.boulderSessions += 1;
            if (!location.boulderers.includes(this)) {
                location.boulderers.push(this);
            }
        }
    }

    buy(boulderShoes) {
        console.log(this.name + " buys " + boulderShoes.modelName);
        this.boulderShoes.push(boulderShoes);
    }
};