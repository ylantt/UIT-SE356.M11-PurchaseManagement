const mongoose = require('mongoose')
const schema = mongoose.Schema

const inventorySchema = new mongoose.Schema({
  name: String,
  location: {
    country: Number,
    city: Number,
    district: Number,
    street: String,
  },
})

const Inventory = mongoose.model('Inventory', inventorySchema)
module.exports = Inventory
