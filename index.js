const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(bodyParser.json())
app.use(morgan('tiny'))
app.use(cors())
app.use(express.static('build'))


let persons = [
    {
      name: "Arto Hellas",
      number: "040-123456",  
      id: 1,
    },
    {
      name: "Martti Tienari",
      number: "040-123456",  
      id: 2,
    },
    {
      name: "Arto Järvinen",
      number: "040-123456",  
      id: 3,
    },
    {
      name: "Lea Kutvonen",
      number: "040-123456",  
      id: 4,
    }
]

const formatPerson = (person) => {
    return {
      name: person.name,
      number: person.number,
      id: person._id
    }
  }

app.get('/api/persons', (req, res) => {
    Person
    .find({}, {__v: 0})
    .then(persons => {
      res.json(persons.map(formatPerson))
    })
}) 

app.get('/api/persons/:id', (req, res) => {
    console.log(req.params.id)
    Person
    .findById(req.params.id)
    .then(person => {
      res.json(formatPerson(person))
    })
    .catch(error => {
        res.status(404).end()
    }) 
})

app.get('/info', (req, res) => { 
    res.send(`
        <p> puhelinluettelossa ${persons.length}:n henkilön tiedot </p>
        <p> ${new Date().toUTCString()} </p>
        `)
})

const generatedId = () => {
    const maxId = persons.length > 0 ? persons.map(n => n.id).sort().reverse()[0] : 1
    return maxId + 1
}


app.post('/api/persons', (req, res) => {
    const body = req.body
    console.log(body)

    if (body.name === undefined || body.number === undefined) {
        return res.status(400).json({error: 'name or number is missing'})
    }

    if (persons.find(person => person.name === body.name)) {
        return res.status(400).json({error: 'name must be unique'})
    }

    const person = new Person ({
        name: body.name,
        number: body.number,
    })

    person
        .save()
        .then(savedPerson => {
            res.json(formatPerson(savedPerson))
    })
})

app.delete('/api/persons/:id', (req, res) => { 
    Person
    .findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => {
      res.status(400).send({ error: 'malformatted id' })
    })
})



const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

