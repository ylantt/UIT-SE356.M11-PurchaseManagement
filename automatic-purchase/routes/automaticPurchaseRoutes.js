const automaticPurchaseController = require('../controllers/automaticPurchaseController')
const express = require('express')
const router = express.Router()

router.route('/events').post(automaticPurchaseController.autoPurchase)

module.exports = router
