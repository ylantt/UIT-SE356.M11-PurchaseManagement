const Quotation = require('../models/quotationModel');
const axios = require('axios')
const dotenv = require('dotenv')

dotenv.config({ path: '../../config.env' })

const quotationVal = new Quotation({
  
})
const quotationVal = {
  name: "Báo giá ngày 1/1/2022",
  products: [
    {
      name: "Bánh gạo nhật",
      price: 10000,
      quantity: 10,
      provider: {
        name: "Công ty bán lẻ Quang Trung",
        phoneNumber: 0988598252,
        description: "Công ty cung cấp hàng tiêu dung"
      }
    }

  ]
}
exports.getQuotation = async (req, res, next) => {
  try {
    req.session.Quotation = new Quotation(quotationVal)
    return res.status(201).send(req.session.Quotation)
  } catch (err) {
    return res.status(500).json({ status: 'server error', message: err })
  }
}
