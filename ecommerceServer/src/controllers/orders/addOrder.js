const { ObjectId } = require('mongodb');
const express = require('express');
const router = express.Router();
const isAuthenticated = require('../../utils/users/authenticationCheck');
const reduceAvailableItems = require('../../utils/orders/reduceAvailableItems');

module.exports = function (orders, products, cart) {
    router
        .post('/', isAuthenticated, async (req, res) => {
            try {
                const user = req.user._id;

                // Find products in the user's cart
                const cartData = await cart.find({ user_id: ObjectId(user) }).toArray();
                if (cartData.length > 0) {

                    // Reduce available items in the cart
                    let orderItems = [];
                    orderItems = await reduceAvailableItems(cartData, products);
                    
                    // Insert new order
                    const newOrder = await orders.insertOne({
                        user_id: ObjectId(user),
                        products: orderItems
                    })
                    // Clear the user's cart
                    await cart.deleteMany({ user_id: ObjectId(user) });
                    res.send(newOrder);
                }
            } catch (error) {
                res.status(500).send({ error: error.message });
            }
        })
    return router;
}