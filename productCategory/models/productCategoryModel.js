const mongoose = require('mongoose')
const schema = mongoose.Schema

const productCategorySchema = new mongoose.Schema({
  name: String,
})

const ProductCategory = mongoose.model('Inventory', productCategorySchema)
module.exports = ProductCategory
