const mongoose = require('mongoose')
const schema = mongoose.Schema

const quotationSchema = new mongoose.Schema({
  name: String,
  products: [
    productSchema
  ],
})

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  quantity: Number,
  provider: providerSchema
})

const providerSchema = new mongoose.Schema({
  name: String,
  phoneNumber: String,
  description: String,
})
const Quotation = mongoose.model('Quotation', quotationSchema)
module.exports = Quotation
