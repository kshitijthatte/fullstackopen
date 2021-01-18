const mongoose = require('mongoose')

const password = process.argv[2]

const url = `mongodb+srv://kshitij:${password}@cluster0.amsub.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

if (process.argv.length < 3) {
  console.log(
    'Please provide the password as an argument: node mongo.js <password>'
  )
  process.exit(1)
}

if (process.argv.length === 3) {
  const Person = mongoose.model('Person', personSchema)
  console.log('phonebook:')
  Person.find({}).then((result) => {
    result.forEach((note) => {
      console.log(note.name, note.number)
    })
    mongoose.connection.close()
  })
}

if (process.argv.length === 5) {
  const Person = mongoose.model('Person', personSchema)

  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  })
  person.save().then(() => {
    console.log(`added ${person.name} number ${person.number} to phonebook`)
    mongoose.connection.close()
  })
}
