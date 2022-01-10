const statisticsController = require('../controllers/statisticsController')
const express = require('express')
const router = express.Router()

router
  .route('/')
  .post(statisticsController.addStatistic)
  .get(statisticsController.getStatistics)

router
  .route('/:id')
  .delete(statisticsController.removeStatistics)
  .put(statisticsController.updateStatistics)

module.exports = router
