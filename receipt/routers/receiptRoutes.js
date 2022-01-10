const receiptController = require('../controllers/receiptController')
const express = require('express')
const router = express.Router()

router
  .route('/')
  .get(receiptController.getAllReceipts)
  .post(receiptController.findReceipt)
  .post(receiptController.createAReceipt)

router
  .route('/:id')
  .get(receiptController.getAReceipt)

module.exports = router