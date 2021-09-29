const { Order , CartItem } = require("../models/orderSchema")


exports.create = (req, res) => {
    req.body.order.user = req.profile
    const order = new Order(req.body.order)
    order.save((error, data) => {
        if(error) {
            return res.status(400).json({
                error: "something wrong happened."
            })
        }
        res.json(data)
    })
}