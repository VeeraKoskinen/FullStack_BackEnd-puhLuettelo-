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
 

const port = 3001
app.listen(port)
console.log(`Server running on port ${port}`)