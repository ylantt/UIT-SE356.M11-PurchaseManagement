const suggestionController = require('../controllers/suggestionController')
const express = require('express')
const router = express.Router()

router
  .route('/')
  .get(suggestionController.getSuggestion)

// router
//   .route('/:id')
//   .delete(statisticsController.removeStatistics)
//   .put(statisticsController.updateStatistics)

module.exports = router
