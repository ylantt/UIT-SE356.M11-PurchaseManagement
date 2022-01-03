const ProductCategory = require('../models/productCategoryModel')
const axios = require('axios')
const dotenv = require('dotenv')

dotenv.config({ path: '../../config.env' })
let inventoryMap = {}

exports.getAllProductCategory = async (req, res, next) => {
  try {
    const productCategory = await ProductCategory.find()
    return res.status(200).send(productCategory)
  } catch (err) {
    return res.status(500).json({ status: 'server error', message: err })
  }
}

exports.addProductCategory = async (req, res, next) => {
  try {
    const { name } = req.body

    const productCategoryVal = {
      name: name,
    }

    const productCategory = new ProductCategory(productCategoryVal)

    const newproductCategory = await productCategory.save(
      async (err, productCategoryCollection) => {
        console.log(productCategoryCollection._id)
        await axios.post(`${process.env.DOMAIN}:5011/events`, {
          type: 'productCategoryCreated',
          data: {
            id: productCategoryCollection._id,
            ...productCategoryVal,
          },
        })
      }
    )
    return res.status(201).send(newproductCategory)
  } catch (err) {
    return res.status(500).json({ status: 'server error', message: err })
  }
}

exports.getAnProductCategory = async (req, res, next) => {
  try {
    const id = req.params.id
    const productCategory = await ProductCategory.findById(id)
    return res.status(200).send(productCategory)
  } catch (err) {
    return res.status(500).json({ status: 'server error', message: err })
  }
}

exports.updatedProductCategory = async (req, res, next) => {
  try {
    const { name} = req.body
    const id = req.params.id

    const updatedProductCategory = {
      name: name,
      
    }

    await ProductCategory.findByIdAndUpdate(id, updatedProductCategory)

    await axios.post(`${process.env.DOMAIN}:5011/events`, {
      type: 'ProductCategoryUpdated',
      data: {
        id: id,
        ...updatedProductCategory,
      },
    })
    return res.status(200)
  } catch (err) {
    return res.status(500).json({ status: 'server error', message: err })
  }
}

exports.removeProductCategory = async (req, res) => {
  try {
    const id = req.params.id

    await ProductCategory.findByIdAndDelete(id)

    await axios.post(`${process.env.DOMAIN}:5011/events`, {
      type: 'ProductCategoryRemoved',
      data: {
        id: id,
      },
    })
    return res.status(200)
  } catch (err) {
    return res.status(500).json({ status: 'server error', message: err })
  }
}
