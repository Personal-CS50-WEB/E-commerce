const { ObjectId } = require('mongodb');
const express = require('express');
const router = express.Router();
const isAuthenticated = require('../../utils/users/authenticationCheck');

module.exports = function (orders) {
    router
        .get('/:orderId', isAuthenticated, async (req, res) => {
            try {
                let user = req.user;
                const { orderId } = req.params;

                // if the user's role is admin, she can view other users orders
                if (user.role == "admin") {
                    user = req.body;
                }

                // Find products in the user's orders
                const ordersData = await orders.find({ user_id: ObjectId(user._id) ,_id: ObjectId(orderId)}).toArray();

                if (ordersData.length > 0) {
                    res.send(ordersData);
                } else {
                    res.send([]);
                }
            } catch (error) {
                res.status(500).send({ error: error.message });
            }
        })
    return router;
}