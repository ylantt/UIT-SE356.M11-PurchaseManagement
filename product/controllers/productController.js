const Product = require('../models/ProductModel')
let productMap = {}

exports.getAllProducts = async (req, res, next) => {
  try {
    const offset = req.params.offset;
    const limit = req.params.limit;

    const products = await Product.find().skip(offset).limit(limit);
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

    const newProduct = await product.save( async (err, productCollection) => {
      productMap[productCollection._id] = productVal // save to map

      await axios.post(`${process.env.DOMAIN}:5011/events`, {
        type: 'ProductAdded',
        data: {
          id: id,
          ...productVal,
        },
      })
    })

    return res.status(201).send(newProduct)
  } catch (err) {
    return res.status(500).json({ status: 'server error', message: err })
  }
}

exports.updateProduct = async (req, res, next) => {
  try {
    const { name, quantity, __v} = req.body

    const updatedProduct = {
      name: name,
      quantity: quantity,
      __v: (parseInt(__v) + 1).toString(),
    }

    const result = await Product.updateOne({_id: req.params.id, versionKey: versionKey}, updatedProduct)
    if (result == null) {
      return res.status(409).json({ status: 'conflict', message: "conflict" })
    }

    await axios.post(`${process.env.DOMAIN}:5011/events`, {
      type: 'ProductUpdated',
      data: {
        id: id,
        ...updatedProduct,
      },
    })
    return res.status(200)
  } catch (err) {
    return res.status(500).json({ status: 'server error', message: err })
  }
}

exports.removeProduct = async (req, res) => {
  try {
    const id = req.params.id
    delete productMap[id]
    await Product.findByIdAndDelete(id)

    await axios.post(`${process.env.DOMAIN}:5011/events`, {
      type: 'ProductRemoved',
      data: {
        id: id,
      },
    })
    return res.status(200)
  } catch (err) {
    return res.status(500).json({ status: 'server error', message: err })
  }
}
