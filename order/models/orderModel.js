const mongoose = require('mongoose')
const schema = mongoose.Schema

const orderSchema = new mongoose.Schema({
  _id: Number,
  status: Boolean,
  product: [{
    info: {type: schema.ObjectId, ref: 'Product', required: true},
    qty: {type: Number}
    }],
  createdDate: { type: Date, default: Date.now() },
})

const Order = mongoose.model('Order', orderSchema)
module.exports = Order