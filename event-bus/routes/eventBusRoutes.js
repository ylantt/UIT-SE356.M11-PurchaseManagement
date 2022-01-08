const eventBusController = require('../controllers/eventBusController')
const express = require('express')
const router = express.Router()

router
  .route('/')
  .post(eventBusController.distributeEvents)
  .get(eventBusController.getEvents)

module.exports = router
