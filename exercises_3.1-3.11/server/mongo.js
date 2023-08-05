const mongoose = require("mongoose")

if (process.argv.length < 3) {
    console.log("Give password as arguement");
    process.exit(1)
}

const password = process.argv[2]

const url =
    `mongodb+srv://jojimanos:${password}@cluster0.7ir8hon.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model("Person", personSchema)

const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
})

if (process.argv.length === 3) {
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person)
        })
        mongoose.connection.close()
    })
}

person.save().then(result => {
    console.log("person saved")
    mongoose.connection.close()
})