const mongoose = require('mongoose')

const url = process.env.MONGO_URL
console.log(url)
mongoose.connect(url)
/*
const Person = mongoose.model('Person', {
  name: String,
  number: String
})
*/
const format = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', format);

module.exports = Person