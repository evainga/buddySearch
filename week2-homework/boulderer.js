const BuddySearch = require("./buddySearch")
const BuddySearchDatabase = require("./buddySearchDatabase")

module.exports = class Boulderer {
    constructor(name, level) {
        this.name = name;
        this.boulderSessions = 0;
        this.level = level;
    }

    searchBuddy(location, date) {
        const buddySearch = new BuddySearch(location, date, this.level);
        console.log(this.name + " is searching for a boulder buddy with search " + buddySearch.summary);

        BuddySearchDatabase.save("buddySearch.json", buddySearch)
    }

    boulder(location) {
        console.log(this.name + " boulders " + location.name);
        this.boulderSessions += 1;
        if (!location.boulderers.includes(this)) {
            location.boulderers.push(this);
        }
    }
}