const Product = require('../models/ProductModel')
let productMap = {}

exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find()
    return res.status(200).send(products)
  } catch (err) {
    return res.status(500).json({ status: 'server error', message: err })
  }
}

exports.getAProduct = async (req, res, next) => {
  try {
    const id = req.params.id

    const productObj = productMap[id]

    if (productObj) {
      return res.status(200).send(productObj)
    }

    const product = await Product.findById(id)
    productMap[product.id] = product

    return res.status(200).send(product)
  } catch (err) {
    return res.status(500).json({ status: 'server error', message: err })
  }
}

exports.addProduct = async (req, res, next) => {
  try {
    const { name, quantity } = req.body

    const productVal = new Product({
      name: name,
      quantity: quantity
    })

    const product = new Inventory(productVal)

    const newProduct = await product.save((err, productCollection) => {
      productMap[productCollection._id] = productVal // save to map
    })

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
