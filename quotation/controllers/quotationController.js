const Quotation = require('../models/quotationModel');
const axios = require('axios')
const dotenv = require('dotenv')

dotenv.config({ path: '../../config.env' })

exports.addProductToQuotation = async (req,res,next) => {
  var product = await axios.get(`/${process.env.PRODUCT_PORT}/${req.params.id}`)
  var quotaion = new Quotation(req.session.quotaion)
  quotaion.addProductToQuotation(product)
  req.session.quotaion = quotation
  req.session.save()
}
exports.getQuotation = async (req, res, next) => {
  try {
    return res.status(201).send(req.session.Quotation)
  } catch (err) {
    return res.status(500).json({ status: 'server error', message: err })
  }
}
