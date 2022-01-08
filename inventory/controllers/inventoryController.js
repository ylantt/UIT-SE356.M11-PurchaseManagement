const Inventory = require('../models/InventoryModel')
const axios = require('axios')
const dotenv = require('dotenv')

dotenv.config({ path: '../../config.env' })
let inventoryMap = {}

exports.getAllInventories = async (req, res, next) => {
  try {
    const inventories = await Inventory.find()
    return res.status(200).send(inventories)
  } catch (err) {
    return res.status(500).json({ status: 'server error', message: err })
  }
}

exports.addInventory = async (req, res, next) => {
  try {
    const { name, country, city, district, street } = req.body

    const inventoryVal = {
      name: name,
      location: {
        country: country,
        city: city,
        district: district,
        street: street,
      },
    }

    const inventory = new Inventory(inventoryVal)

    const newInventory = await inventory.save(
      async (err, inventoryCollection) => {
        console.log(inventoryCollection._id)
        inventoryMap[inventoryCollection._id] = inventoryVal // save to map

        await axios.post(`${process.env.DOMAIN}:5011/events`, {
          type: 'InventoryCreated',
          data: {
            id: inventoryCollection._id,
            ...inventoryVal,
          },
        })
      }
    )
    return res.status(201).send(newInventory)
  } catch (err) {
    return res.status(500).json({ status: 'server error', message: err })
  }
}

exports.getAnInventory = async (req, res, next) => {
  try {
    const id = req.params.id

    const inventoryObj = inventoryMap[id]

    if (inventoryObj) {
      return res.status(200).send(inventoryObj)
    }

    const inventory = await Inventory.findById(id)
    return res.status(200).send(inventory)
  } catch (err) {
    return res.status(500).json({ status: 'server error', message: err })
  }
}

exports.updateInventory = async (req, res, next) => {
  try {
    const { name, country, city, district, street } = req.body
    const id = req.params.id

    const updatedInventory = {
      name: name,
      location: {
        country: country,
        city: city,
        district: district,
        street: street,
      },
    }

    inventoryMap[id] = updatedInventory

    await Inventory.findByIdAndUpdate(id, updatedInventory)

    await axios.post(`${process.env.DOMAIN}:5011/events`, {
      type: 'InventoryUpdated',
      data: {
        id: id,
        ...updatedInventory,
      },
    })
    return res.status(200)
  } catch (err) {
    return res.status(500).json({ status: 'server error', message: err })
  }
}

exports.removeInventory = async (req, res) => {
  try {
    const id = req.params.id
    delete inventoryMap[id]
    await Inventory.findByIdAndDelete(id)

    await axios.post(`${process.env.DOMAIN}:5011/events`, {
      type: 'InventoryRemoved',
      data: {
        id: id,
      },
    })
    return res.status(200)
  } catch (err) {
    return res.status(500).json({ status: 'server error', message: err })
  }
}
