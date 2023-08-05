const express = require("express")
const app = express()
const morgan = require("morgan")
const cors = require("cors")
const Person = require('./models/person')
require('dotenv').config()

app.use(express.json())
app.use(express.static("build"))
app.use(cors())

morgan.token('body', (req) => JSON.stringify(req.body) )

app.use(morgan(':method :url :status - :response-time ms :body'))

let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get("/api/persons", (req, res) => {
Person.find({})
.then(person => {res.json(person)})
})

app.get("/api/persons/:id", (req, res) => {
Person.findById(req.params.id).then(person => {
    res.json(person)
})
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    notes = persons.filter(person => person.id !== id)
    res.status(204).end()
})

app.get("/info", (req, res) => {
    let numberOfPeople = persons.length
    let date = new Date
    res.send(`<p>The phonebook has information about ${numberOfPeople} people</p>
<p>${date}</p>
`)
})

app.post('/api/persons', (req, res) => {

    const body = req.body
    console.log(body)
    
    if (!body.name || !body.number) {
        return res.status(400).json({
            error: 'name or number missing'
        })
    }
    if (persons.find(p => body.name === p.name)) {
        return res.status(400).json({
            error: 'name already in the phonebook'
        })
    }

    const person = new Person ({
        name: body.name,
        number: body.number
    })

    person.save().then(savedPerson => {
        res.json(savedPerson)
    })
})

const PORT = process.env.PORT || 8000
app.listen(PORT)
console.log(`App is running on port ${PORT}`)