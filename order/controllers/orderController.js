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
            await order.save(
                async(err, orderCollection) => {
                    await axios.post(`${process.env.DOMAIN}:5011/events`, {
                        type: 'OrderCreated',
                        data: {
                          id: orderCollection._id,
                          ...order,
                        },
                    })
                }
            )
            return res.send("success");
        }
    } catch (error) {
        return res.send(error);
    }
}

exports.updateAnOrder = async(req, res, next) => {
    try{
        order = await Order.findById(req.params.id,"status");
        if(!order){
            session = req.session;
            session.orderID = req.body.orderID;
            await Order.findByIdAndUpdate(session.orderID, order)
            await axios.post(`${process.env.DOMAIN}:5011/events`, {
                type: 'OrderUpdated',
                data: {
                    id: orderCollection._id,
                    ...order,
                },
            })
        }
                return res.send("success");
    } catch(error) {
        return res.send(error);
    }
}

exports.removeAnOrder = async(req, res, next) => {
    try {
        const id = req.params.id
        await Order.findByIdAndDelete(id)
    
        await axios.post(`${process.env.DOMAIN}:5011/events`, {
          type: 'OrderRemoved',
          data: {
            id: id,
          },
        })
        return res.status(200)
      } catch (err) {
        return res.status(500).json({ status: 'server error', message: err })
      }
}

exports.findOrder = async(req, res, next) => {
    try {
        var order = await Order.find(orderName);
        return res.status(200).send(order);
      } catch (err) {
        return res.status(404).json({ status: "fail", message: err });
      }
}