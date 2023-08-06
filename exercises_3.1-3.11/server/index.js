const express = require("express")
const app = express()
const morgan = require("morgan")
const cors = require("cors")
const Person = require('./models/person')
require('dotenv').config()

//middleware



app.use(express.json())
app.use(express.static("build"))
app.use(cors())

morgan.token('body', (req) => JSON.stringify(req.body))

app.use(morgan(':method :url :status - :response-time ms :body'))

app.get("/api/persons", (req, res) => {
    Person.find({})
        .then(person => { res.json(person) })
})

app.get("/api/persons/:id", (req, res, next) => {
    Person.findById(req.params.id).then(person => {
        if (person) {
            res.json(person)
        } else {
            res.status(404).end()
        }
    }).catch(error => next(error)
    )
})

app.delete('/api/persons/:id', (req, res) => {
    Person.findByIdAndRemove(req.params.id)
        .then(result => {
            res.status(204).end()
        })
        .catch(error => next(error))
})

app.get("/info", (req, res) => {
    let numberOfPeople
    let date = new Date
    Person.find({}).then(person => {res.send(`<p>The phonebook has information about ${person.length} people</p>
<p>${date}</p>
`)})
})

app.post('/api/persons', (req, res) => {

    const body = req.body
    console.log(body)

    if (!body.name || !body.number) {
        return res.status(400).json({
            error: 'name or number missing'
        })
    }
    // if (persons.find(p => body.name === p.name)) {
    // return res.status(400).json({
    // error: 'name already in the phonebook'
    // })
    // }

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save().then(savedPerson => {
        res.json(savedPerson)
    })
})

app.put('/api/persons/:id', (req, res) => {
    const body = req.body

    const person = {
        name: body.name,
        number: body.number
    }

    Person.findByIdAndUpdate(req.params.id, person, { new: true })
        .then(updateNote => {
            res.json(updateNote)
        })
        .catch(error => next(error))
})

const errorHandler = (error, req, res, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return res.status(400).send({ error: "malformated id" })
    }

    next(error)
}
app.use(errorHandler)


const PORT = process.env.PORT || 8000
app.listen(PORT)
console.log(`App is running on port ${PORT}`)