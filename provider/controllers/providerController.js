const Provider = require('../models/providerModel');
let providerMap = {};

const provider = {};

// --- Lấy mọi thông tin nhà cung cấp
exports.getAllProviders = async (req, res, next) => {
    try{
        const providers = await Provider.find();
        return res.status(200).send(providers);
    } catch (err) {
        return res.status(500).json({ status: 'server error', message: err })
      }
}

// --- Lấy thông tin một nhà cung cấp
exports.getAProvider = async(req,res, next) => {
  try {
      const provider = await Provider.findOne({_id: req.params.id}).exec();
      return res.status(200).send(provider);
  } catch (error) {
      return res.status(404).json({  status:"fail", message: err });
  }
}

// --- Thêm nhà cung cấp
exports.addProvider = async (req, res, next) => {
    try {
      const { email, name, phoneNumber, description } = req.body;

      provider[email] = { email, name, phoneNumber, description };
      await axios.post(`${process.env.DOMAIN}:5011/events`, {
        type: 'ProviderCreated',
        data: {
          id: id,
        },
      })
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
      await axios.post(`${process.env.DOMAIN}:5011/events`, {
        type: 'ProviderRemoved',
        data: {
          id: id,
        },
      })
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
      await axios.post(`${process.env.DOMAIN}:5011/events`, {
        type: 'ProviderUpdated',
        data: {
          id: id,
        },
      })
      return res.status(200)
    } catch (err) {
      return res.status(500).json({ status: 'server error', message: err })
    }
  }

// --- Tìm nhà cung cấp
exports.findProvider = async(req, res, next) => {
  try {
      var provider = await Provider.find(providerName);
      return res.status(200).send(provider);
    } catch (err) {
      return res.status(404).json({ status: "fail", message: err });
    }
}