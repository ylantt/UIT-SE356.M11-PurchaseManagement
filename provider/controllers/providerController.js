const Provider = require('../models/providerModel');
let providerMap = {};

// Có lấy toàn bộ thông tin về nhà cung cấp, thêm xóa sửa, tìm kiếm
const provider = {};

// --- Lấy mọi thông tin nhà cung cấp
exports.getAllProviders = async (req, res, next) => {
    try{
        // const providers = Provider.find();
        const { email, name, phoneNumber, description } = req.body;

        const providerVal = {
            email: email,
            name: name,
            phoneNumber: phoneNumber,
            description: description
        }
    
        const provider = new Provider(providerVal)
        // Ứng dụng identity map
        const newProvider = await provider.save((err, providerCollection) => {
          providerMap[providerCollection._id] = providerVal // save to map
        })
    
    
        return res.status(200).send(newProvider);
    } catch (err) {
        return res.status(500).json({ status: 'server error', message: err })
      }
}

// --- Thêm nhà cung cấp
exports.addProvider = async (req, res, next) => {
    try {
      const { email, name, phoneNumber, description } = req.body;
  
      // const provider = new Provider({
      //   email: email,
      //   name: name,
      //   phoneNumber: phoneNumber,
      //   description: description
      // })
      // const newProvider = await provider.save()

      provider[email] = { email, name, phoneNumber, description };
      return res.status(201).send(provider[email]);
    } catch (err) {
      return res.status(500).json({ status: 'server error', message: err })
    }
  }

//--- Xóa nhà cung cấp
exports.deleteProvider = async (req, res) => {
    try {
      const provider = await Product.findByIdAndDelete(req.params.id)
      await provider.remove()
  
      return res.status(200)
    } catch (err) {
      return res.status(500).json({ status: 'server error', message: err })
    }
  }

// --- Chỉnh sửa thông tin nhà cung cấp
exports.updateProvider = async (req, res, next) => {
    try {
        const { email, name, phoneNumber, description } = req.body
  
      const updatedProvider = {
        email: email,
        name: name,
        phoneNumber: phoneNumber,
        description: description
      }
  
      await Provider.findByIdAndUpdate(req.params.id, updatedProvider)
      return res.status(200)
    } catch (err) {
      return res.status(500).json({ status: 'server error', message: err })
    }
  }

// --- Tìm kiếm nhà cung cấp