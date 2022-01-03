const orderController = require('../controllers/orderController')
const express = require('express')
const router = express.Router()

router
  .route('/')
  .get(orderController.getAllOrders)
  .post(orderController.createAnOrder)

router
  .route('/:id')
  .get(orderController.getAnOrder)

module.exports = router