const orderController = require('../controllers/orderController')
const express = require('express')
const router = express.Router()

router
  .route('/')
  .get(orderController.getAllOrders)
  .post(orderController.findOrder)
  .post(orderController.createAnOrder)

router
  .route('/:id')
  .get(orderController.getAnOrder)
  .put(orderController.updateAnOrder)
  .delete(orderController.removeAnOrder)

module.exports = router