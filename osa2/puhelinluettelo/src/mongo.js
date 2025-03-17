import mongoose from 'mongoose'

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster123.or5ta.mongodb.net/?retryWrites=true&w=majority&appName=Cluster123`
mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  id: Number,
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  id: 1,
  name: process.argv[3],
  number: process.argv[4],
})

if (process.argv.length == 3) {
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log('phonebook:')
      console.log(person)
    })
    mongoose.connection.close()
  })
}

if (process.argv.length == 5) {
  person.save().then(result => {
    console.log(`added ${process.argv[3]} number ${process.argv[4]}to phonebook`)
    mongoose.connection.close()
  })
}
