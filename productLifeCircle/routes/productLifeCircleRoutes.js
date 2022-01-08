const productLifeCircleController = require('../controllers/productLifeCircleController')
const express = require('express')
const router = express.Router()

router
  .route('/')
  .get(productLifeCircleController.getAllInventories)

router
  .route('/:id')
  .delete(productLifeCircleController.removeInventory)
  .put(productLifeCircleController.updateInventory)

module.exports = router
