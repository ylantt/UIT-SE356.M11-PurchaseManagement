const mongoose = require('mongoose')
const schema = mongoose.Schema

const productSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  remain: Number,
},{versionKey: "1"})

const Product = mongoose.model('Product', productSchema)
module.exports = Product
