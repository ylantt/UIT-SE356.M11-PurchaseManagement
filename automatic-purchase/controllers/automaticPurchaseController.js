const axios = require('axios')
const dotenv = require('dotenv')

dotenv.config({ path: '../../config.env' })

exports.autoPurchase = async (req, res) => {
  try {
    const { type, data } = req.body

    if (type === 'ProductRemoved') {
      const { id } = data

      // call create new order with the product id
      await axios.post(`${process.env.DOMAIN}:5006`, {
        id,
      })
    }
  } catch (err) {
    return res.status(500).json({ status: 'server error', message: err })
  }
}
