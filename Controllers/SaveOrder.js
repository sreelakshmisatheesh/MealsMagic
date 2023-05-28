const { response } = require('express');
const Orders = require('../Models/SaveOrder');

exports.getOrdersByUserId = (req, res) => {
    const userVarId = req.params.userId;

    Orders.find({ placedByUserId: userVarId })
        .then(response => {
            res.status(200).json(
                {
                    message: "Orders seen Succesfully",
                    orders: response
                })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}

exports.toSaveOrderDetails = (req, res) => {
    const { placedBy, placedByUserId, address, placedOn, items, Amount, resId } = req.body;
  //save() = insert syntax
    let orderObj = new SaveOrder({
        placedBy,
        placedByUserId,
        placedOn,
        items,
        Amount,
        restaurantId: resId,
        address
    })

    orderObj.save()
        .then(response => {
            res.status(200).json(
                {
                    message: "Orders Added Succesfully to the cart or db",
                    order: response
                })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}

