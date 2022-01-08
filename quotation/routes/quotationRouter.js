const quotationController = require("../controllers/quotationController");
const express = require("express");
const router = express.Router();

router
    .route("/")
    .get(quotationController.getQuotation)
    
router
    .route("/:id")
    .post(quotationController.addProductToQuotation)
module.exports = router ;