const mongoose = require('mongoose')

async function main () {
  await mongoose.connect('mongodb://localhost/buddy-searchNew1', { useUnifiedTopology: true, useNewUrlParser: true })
  console.log('connected')
}

main()
