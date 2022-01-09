const mongoose = require('mongoose')
const schema = mongoose.Schema

const statisticSchema = new mongoose.Schema({
  name: String,
  money: Number,
  date: Date,
},{versionKey: "1"})

const Statistic = mongoose.model('Statistic', statisticSchema)
module.exports = Statistic
