const express = require('express')
const app = express()

let persons = [
    {
      name: "Arto Hellas",
      numero: "040-123456",  
      id: 1,
    },
    {
      name: "Martti Tienari",
      numero: "040-123456",  
      id: 2,
    },
    {
      name: "Arto Järvinen",
      numero: "040-123456",  
      id: 3,
    },
    {
      name: "Lea Kutvonen",
      numero: "040-123456",  
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


const port = 3001
app.listen(port)
console.log(`Server running on port ${port}`)