module.exports = class BuddySearch {
    constructor(location, date, level) {
        this.location = location;
        this.date = date;
        this.level = level;
        this.summary = this.summarizeSearch(location, date, level);
    };

    summarizeSearch(location, date, level) {
        return location.name + "-" + date.getYear() + "/" + date.getMonth() + "/" + date.getDay() + "-" + level;
    }
};