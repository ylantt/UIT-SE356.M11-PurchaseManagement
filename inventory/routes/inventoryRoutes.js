const inventoryController = require('../controllers/inventoryController')
const express = require('express')
const router = express.Router()

router
  .route('/')
  .post(inventoryController.addInventory)
  .get(inventoryController.getAllInventories)

router
  .route('/:id')
  .delete(inventoryController.removeInventory)
  .put(inventoryController.updateInventory)
  .get(inventoryController.getAnInventory)

module.exports = router
