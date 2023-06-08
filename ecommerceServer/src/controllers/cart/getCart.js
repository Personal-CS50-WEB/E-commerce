const { ObjectId } = require('mongodb');
const express = require('express');
const router = express.Router();
const isAuthenticated = require('../../utils/users/authenticationCheck');
const findItem = require('../../utils/cart/findItem');

module.exports = function (cart, products) {
    router
        .get('/', isAuthenticated, async (req, res) => {
            try {
                const user = req.user._id;

                // Find products in the user's cart
                const cartData = await cart.find({ user_id: ObjectId(user) }).toArray();
                if (cartData.length > 0) {

                    let productsData = [];
                    for (const item of cartData) {

                        // Find products with matching IDs in the "products" collection
                        const cartItem = await findItem(products, item.product_id, item.size, ObjectId(item._id));
                        if (cartItem) {
                            productsData.push(cartItem);
                        }
                    }
                    res.send(productsData);
                } else {
                    res.send([]);
                }
            } catch (error) {
                res.status(500).send({ error: error.message });
            }
        })
    return router;
}