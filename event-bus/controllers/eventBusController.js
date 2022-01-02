const dotenv = require('dotenv')

dotenv.config({ path: '../../config.env' })

let events = []

exports.distributeEvents = async (req, res) => {
  try {
    const event = req.body

    events.push(event)

    axios.post(`${process.env.DOMAIN}:5000/events`, event)
    axios.post(`${process.env.DOMAIN}:5001/events`, event)
    axios.post(`${process.env.DOMAIN}:5002/events`, event)
    axios.post(`${process.env.DOMAIN}:5003/events`, event)
    axios.post(`${process.env.DOMAIN}:5004/events`, event)
    axios.post(`${process.env.DOMAIN}:5005/events`, event)
    axios.post(`${process.env.DOMAIN}:5006/events`, event)
    axios.post(`${process.env.DOMAIN}:5007/events`, event)
    axios.post(`${process.env.DOMAIN}:5008/events`, event)
    axios.post(`${process.env.DOMAIN}:5009/events`, event)
    axios.post(`${process.env.DOMAIN}:5010/events`, event)

    res.send({ status: 'OK ' })
  } catch (err) {
    return res.status(500).json({ status: 'server error', message: err })
  }
}

exports.getEvents = async (req, res) => {
  try {
    res.send(events)
  } catch (err) {
    return res.status(500).json({ status: 'server error', message: err })
  }
}
