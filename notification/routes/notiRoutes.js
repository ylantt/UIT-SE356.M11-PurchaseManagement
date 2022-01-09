const notificationController = require('../controllers/notiController')
const express = require('express')
const router = express.Router()

router.route('/noti').post(notificationController.sendNotification);

module.exports = router