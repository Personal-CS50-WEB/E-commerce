const { ObjectId } = require('mongodb');
const express = require('express');
const router = express.Router();
const isAuthenticated = require('../../utils/users/authenticationCheck');

module.exports = function (cart, products) {
    router
        .get('/', isAuthenticated, async (req, res) => {
            try {
                const user = req.user._id;

                // Find products in the user's cart
                const cartData = await cart.find({ user_id: ObjectId(user) }).toArray();

                if (cartData.length > 0) {
                    // Get product IDs and sizes from cart data
                    // Find products with matching IDs in the "products" collection

                    let productsData = [];
                    for (const item of cartData) {

                        const cartItem = await products.findOne({
                            _id: item.product_id,
                            availableItems: {
                                $elemMatch: {
                                    numberOfAvailableItems: { $gt: 0 },
                                    size: item.size
                                }
                            }
                        },
                            {
                                projection: {
                                    _id: 1,
                                    name: 1,
                                    price: 1,
                                    color: 1,
                                    availableItems:1,
                                    photos:1
                                }
                            });
                        if (cartItem) {
                            const size = cartData.find((cartItem) => cartItem.product_id === item.product_id).size;
                            cartItem.size = size;
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
