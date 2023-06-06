const { ObjectId } = require('mongodb');
const express = require('express');
const router = express.Router();
const isAuthenticated = require('../../utils/users/authenticationCheck');
const findItem = require('../../utils/cart/findItem');

module.exports = function (cart, products) {
    router
        .post('/', isAuthenticated, async (req, res) => {

            try {
                const user = req.user._id;
                const item = req.body;

                // Find the cart item in the "products" collection
                const cartItem = await findItem(products, ObjectId(item.product_id), item.size);

                if (cartItem) {
                    
                    // Insert the new cart item into the "cart" collection
                    const newCartItem = await cart.insertOne({ user_id: ObjectId(user), product_id: ObjectId(item.product_id), size: item.size });

                    // Send the response with the new cart item and cart item details
                    res.send({ newCartItem: newCartItem, cartItem: cartItem });
                } else {
                    return res.status(400).send("Not found");
                }
            } catch (error) {
                res.status(500).send({ error: error.message });
            }
        })
    return router;
}