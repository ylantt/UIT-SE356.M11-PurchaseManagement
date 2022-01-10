const Receipt = require('../models/receiptModel')
const axios = require('axios')
const dotenv = require('dotenv')

dotenv.config({ path: '../../config.env' })
let receiptMap = {}


exports.getAllReceipts = async (req, res, next) => {
    try{
        const receipts = await Receipt.find()
        return res.status(200).send(receipts);    
    } catch {
        return res.status(500).json({ status: "fail", message: err });
    }
}

exports.getAReceipt = async(req,res, next) => {
    try {
        const id = req.params.id;
        const receiptObj = receiptMap[id]
        if (receiptObj) {
            return res.status(200).send(receiptObj);
        }
        
        const receipt = await Receipt.findById(id)
        return res.status(200).send(receipt);
    } catch (error) {
        return res.status(404).json({  status:"fail", message: err });
    }
}

exports.createAReceipt = async(req, res, next) => {
    let order
    try {
        const {type, data} = req.body;
        const receipt = await axios.post(`${process.env.DOMAIN}:5006`, {
            data,
        })
        const receiptVal = new Receipt(receipt)
        if(type === 'orderCreated') {
            const newReceipt = await receipt.save(
                async (err, receiptCollection) => {
                    console.log(receiptCollection._id)
                    receiptMap[receiptCollection._id] = receiptVal // save to map
            
                    await axios.post(`${process.env.DOMAIN}:5011/events`, {
                      type: 'ReceiptCreacted',
                      data: {
                        id: receiptCollection._id,
                        ...receiptVal,
                      },
                    })
                  }
            )
            return res.send(200).send(newReceipt);
        }
    } catch (error) {
        return res.send(error);
    }
}


exports.findReceipt = async(req, res, next) => {
    try {
        const receiptResult = Receipt.find(name)
        return res.status(200).send(receiptResult);
      } catch (err) {
        return res.status(404).json({ status: "fail", message: err });
      }
}