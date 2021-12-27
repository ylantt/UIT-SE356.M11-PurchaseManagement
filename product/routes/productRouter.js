const productController = require('../controllers/productController')
const express = require('express')
const router = express.Router()

router
  .route('/')
  .post(productController.addProduct)
  .get(productController.getAllProducts)

router
  .route('/:id')
  .delete(productController.removeProduct)
  .put(productController.updateProduct)

module.exports = router
