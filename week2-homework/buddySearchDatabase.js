const fs = require('fs')

buddySearches = [];

const save = function (filename, buddySearch) {
   
    buddySearches.push(buddySearch)
    fs.writeFileSync(filename, JSON.stringify(buddySearches))
}

const load = function(filename){
   return JSON.parse(fs.readFileSync(filename, "utf8"))
}

module.exports = { save, load }
