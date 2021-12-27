const providerController = require("../controllers/providerController");
const express = require("express");
const router = express.Router();

router
    .route("/")
    .post(providerController.addProvider)
    .get(providerController.getAllProviders)

module.exports = router ;