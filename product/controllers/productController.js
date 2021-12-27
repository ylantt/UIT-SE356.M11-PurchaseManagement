const Product = require('../models/ProductModel')

exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find()
    return res.status(200).send(products)
  } catch (err) {
    return res.status(500).json({ status: 'server error', message: err })
  }
}

exports.addProduct = async (req, res, next) => {
  try {
    const { name, quantity } = req.body

    const product = new Product({
      name: name,
      quantity: quantity
    })

    const newProduct = await product.save()
    return res.status(201).send(newProduct)
  } catch (err) {
    return res.status(500).json({ status: 'server error', message: err })
  }
}

exports.updateProduct = async (req, res, next) => {
  try {
    const { name, quantity, } = req.body

    const updatedProduct = {
      name: name,
      quantity: quantity,
    }

    await Product.findByIdAndUpdate(req.params.id, updatedProduct)
    return res.status(200)
  } catch (err) {
    return res.status(500).json({ status: 'server error', message: err })
  }
}

exports.removeProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)
    await product.remove()

    return res.status(200)
  } catch (err) {
    return res.status(500).json({ status: 'server error', message: err })
  }
}
