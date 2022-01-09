const productLifeCircleController = require('../controllers/productLifeCircleController')
const express = require('express')
const router = express.Router()

router
  .route('/')
  .get(productLifeCircleController.acceptBuyInNextMonth)



module.exports = router
