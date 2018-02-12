const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(bodyParser.json())

morgan.token('type',  (req, res) => { 
    return JSON.stringify({name: req.body.name, phone: req.body.number})    
})

app.use(morgan(':method :url :type :status :response-time ms'))
app.use(cors())
app.use(express.static('build'))

app.get('/info', (req, res) => { 
    
    Person
    .find({}, {__v: 0})
    .then(persons => {
        res.send(`
            <p> puhelinluettelossa ${persons.length}:n henkilön tiedot </p>
            <p> ${new Date().toUTCString()} </p>
        `)
    })  
})

app.get('/api/persons', (req, res) => {
    Person
    .find({}, {__v: 0})
    .then(persons => {
      res.json(persons.map(Person.format)) 
    })
}) 

app.get('/api/persons/:id', (req, res) => {
    console.log(req.params.id)
    Person
        .findById(req.params.id)
        .then(person => {
            if (person) {
                res.json(Person.format(person))
            } else {
                res.status(404).end()
            }                
        })
        .catch(error => {
            console.log(error)
            res.status(400).end()
        }) 
})

app.post('/api/persons', (req, res) => {
    const body = req.body

    if (body.name === undefined || body.number === undefined) {
        return res.status(400).json({error: 'name or number is missing'})
    }

    Person
        .find({name: body.name})
        .then(result => {
            if (result.length > 0) {
                return res.status(400).send({error: 'Henkilöllä on jo yksi puhelinnumero!'})
            } else {
                const person = new Person ({
                    name: body.name,
                    number: body.number,
                })
            
                person
                    .save()
                    .then(savedPerson => {
                        res.json(Person.format(savedPerson))
                })
            }
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

app.put('/api/persons/:id', (req, res)=> {
    const body = req.body
    const person = {
        name: body.name,
        number: body.number
    }

    Person
    .findByIdAndUpdate(req.params.id, person, {new: true})
    .then(updatedPerson => {
        res.json(Person.format(updatedPerson))
    })
    .catch(error => {
        console.log(error)
        res.status(400).send({error: 'malformatted id'})
    })
})



const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

