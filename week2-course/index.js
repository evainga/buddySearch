const Person = require("./person")
const Meetup = require("./meetup")
const Chalk = require("chalk")
const Database = require("./database")

printName = person => console.log(person.name)

const mert = new Person("Mert", 34)
const armagan = new Person("Armagan", 35)

mert.greet(armagan)

const wtmb = new Meetup("WTM Berlin")
armagan.attend(wtmb)

wtmb.printAttendeeNames()

console.log(Chalk.blue.bgRed.bold("hello world", "afds"))

Database.save("meetup.json", wtmb)
const loadedFile = Database.load("meetup.json")
console.log(loadedFile)