const mongoose = require('mongoose')

if ( process.env.NODE_ENV !== 'production' ) {
    require('dotenv').config()
}
  
const url = process.env.MONGO_URL

mongoose.connect(url)

/*
const Person = mongoose.model('Person', {
  name: String,
  number: String
})
*/

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

personSchema.statics.format = (person) => {
    return {
        name: person.name,
        number: person.number,
        id: person._id
    }
}

const Person = mongoose.model('Person', personSchema);



module.exports = Person