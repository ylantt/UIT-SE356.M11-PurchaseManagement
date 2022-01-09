const mongoose = require('mongoose')
const schema = mongoose.Schema

const notiSchema = new mongoose.Schema({
  _id: Number,
  message: String,
  desc: String,
  read: Boolean,
  createdDate: { type: Date, default: Date.now() },
})

const Notification = mongoose.model('Notification', notiSchema)
module.exports = Notification
