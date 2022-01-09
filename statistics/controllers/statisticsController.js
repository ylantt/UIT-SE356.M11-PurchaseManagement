const Statistic = require('../models/StatisticModel')

exports.getStatistics = async (req, res, next) => {
  try {
    const statistics = await Statistic.find()
    return res.status(200).send(statistics)
  } catch (err) {
    return res.status(500).json({ status: 'server error', message: err })
  }
}

exports.addStatistic = async (req, res, next) => {
  try {
    const { name, money, date } = req.body

    const statisticVal = new Product({
      name: name,
      money: money,
      date: date
    })

    const statistic = new Inventory(statisticVal)

    const newStatistic = await statistic.save( async (err, statisticCollection) => {

      await axios.post(`${process.env.DOMAIN}:5011/events`, {
        type: 'StatisticAdded',
        data: {
          id: id,
          ...statisticVal,
        },
      })
    })

    return res.status(201).send(newStatistic)
  } catch (err) {
    return res.status(500).json({ status: 'server error', message: err })
  }
}

exports.updateStatistics = async (req, res, next) => {
  try {
    const { name, money, date} = req.body

    const updatedStatistic = {
      name: name,
      money: money,
      date: date
    }
    // logic
    await Statistic.updateOne(req.params.id, updatedStatistic)

    return res.status(200)
  } catch (err) {
    return res.status(500).json({ status: 'server error', message: err })
  }
}

exports.removeStatistics = async (req, res) => {
  try {
    const id = req.params.id

    await Statistic.findByIdAndDelete(id)

    return res.status(200)
  } catch (err) {
    return res.status(500).json({ status: 'server error', message: err })
  }
}
