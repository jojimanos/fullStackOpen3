require('dotenv').config()
const mongoose = require("mongoose")

const url = process.env.MONGODB_URI

console.log(url)

mongoose.set('strictQuery', false)
mongoose.connect(url)
.then(resutlt => {
    console.log('connected to MongoDB')
})
.catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
})

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

personSchema.set('toJSON', {
transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
}
})

const Person = mongoose.model("Person", personSchema)

module.exports = mongoose.model('Person', personSchema)