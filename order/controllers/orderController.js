const Order = require('../models/orderModel')
var session;

exports.getAllOrders = async (req, res, next) => {
    try{
        return res.status(200).send(req.session.Order);    
    } catch {
        return res.status(500).json({ status: "fail", message: err });
    }
    

}

exports.getAnOrder = async(req,res, next) => {
    try {
        const order = await Order.findOne({_id: req.params.id}).exec();
        return res.status(200).send(order);
    } catch (error) {
        return res.status(404).json({  status:"fail", message: err });
    }
}

exports.createAnOrder = async(req, res, next) => {
    let order
    try {
        order = await Order.findById(req.params.id,"status");
        if(!order){
            session = req.session;
            session.orderID = req.body.orderID;
            await order.save()
            return res.send("success");
        }
    } catch (error) {
        return res.send(error);
    }
}
exports.findOrder = async(req, res, next) => {
    try {
        return res.status(200).send(Order);
      } catch (err) {
        return res.status(404).json({ status: "fail", message: err });
      }
}