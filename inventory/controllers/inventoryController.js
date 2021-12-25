const Inventory = require('../models/InventoryModel')

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

    const inventory = new Inventory({
      name: name,
      location: {
        country: country,
        city: city,
        district: district,
        street: street,
      },
    })

    const newInventory = await inventory.save()
    return res.status(201).send(newInventory)
  } catch (err) {
    return res.status(500).json({ status: 'server error', message: err })
  }
}

exports.updateInventory = async (req, res, next) => {
  try {
    const { name, country, city, district, street } = req.body

    const updatedInventory = {
      name: name,
      location: {
        country: country,
        city: city,
        district: district,
        street: street,
      },
    }

    await Inventory.findByIdAndUpdate(req.params.id, updatedInventory)
    return res.status(200)
  } catch (err) {
    return res.status(500).json({ status: 'server error', message: err })
  }
}

exports.removeInventory = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)
    await product.remove()

    return res.status(200)
  } catch (err) {
    return res.status(500).json({ status: 'server error', message: err })
  }
}
