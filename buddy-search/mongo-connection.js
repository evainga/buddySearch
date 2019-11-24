const mongoose = require('mongoose')
const dbName = process.env.MONGO_DBNAME || 'BBSearchMongo'

async function main () {
  await mongoose.connect(`mongodb://localhost/${dbName}`, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  console.log('connected to ' + dbName)
}

main()
