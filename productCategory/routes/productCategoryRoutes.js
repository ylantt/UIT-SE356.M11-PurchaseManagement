const productCategoryController = require('../controllers/productCategoryController')
const express = require('express')
const router = express.Router()

router
  .route('/')
  .post(productCategoryController.addProductCategory)
  .get(productCategoryController.getAllProductCategory)

router
  .route('/:id')
  .delete(productCategoryController.removeProductCategory)
  .put(productCategoryController.updatedProductCategory)
  .get(productCategoryController.getAnProductCategory)

module.exports = router
