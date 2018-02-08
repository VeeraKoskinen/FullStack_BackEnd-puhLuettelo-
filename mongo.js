const mongoose = require('mongoose')
const url = ---

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
  })
  
const Person = mongoose.model('Person', personSchema);

console.log(process.argv)

if (!process.argv[3]) {
    Person
        .find({})
        .then(result => {
            console.log('Puhelinluettelo:')  
            result.forEach(person => {
                console.log(`${person.name}  ${person.number}`)
            })
            mongoose.connection.close()
        })
} else {
    const person = new Person({
        name: process.argv[2],
        number: process.argv[3]
    })
    
    person
      .save()
      .then(response => {
        console.log(`lisätään henkilö ${response.name} numero ${response.number} luetteloon`)
        mongoose.connection.close()
    })
}









