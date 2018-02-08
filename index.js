const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

app.use(bodyParser.json())
app.use(morgan('tiny'))
app.use(cors())


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



app.get('/api/persons', (req, res) => {
    res.json(persons)
}) 

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => {
        console.log(person.id, typeof person.id, id, typeof id, person.id === id)
        return person.id === id
    })
    
    console.log(person)
    if (person) {
      console.log(person)
      res.json(person)
    } else {
      console.log("Mennään elseen")  
      res.status(404).end()
    }
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
        return res.status(400).json({error: 'content missing'})
    }

    if (persons.find(person => person.name === body.name)) {
        return res.status(400).json({error: 'name must be unique'})
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generatedId()
    }

    persons = persons.concat(person)
    res.json(person)
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)
    res.status(204).end()
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

