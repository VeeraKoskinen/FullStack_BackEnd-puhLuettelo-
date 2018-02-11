const mongoose = require('mongoose')

if ( process.env.NODE_ENV !== 'production' ) {
    require('dotenv').config()
}
  
const url = process.env.MONGO_URL

mongoose.connect(url)

const Person = mongoose.model('Person', {
  name: String,
  number: String
})

/*
const format = new mongoose.Schema({
    name: String,
    number: String,
})


const Person = mongoose.model('Person', format);
*/

module.exports = Person