const providerController = require("../controllers/providerController");
const express = require("express");
const router = express.Router();

router
    .route("/")
    .post(providerController.addProvider)
    .post(providerController.findProvider)
    .get(providerController.getAllProviders)

router
    .route("/:id")
    .delete(providerController.deleteProvider)
    .put(providerController.updateProvider)
    .get(providerController.getAProvider)
module.exports = router ;