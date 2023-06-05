const express = require('express');
const router = express.Router();
const isAuthenticated = require('../../utils/users/authenticationCheck');

module.exports = function (cart) {
    router
        .get('/', isAuthenticated, async (req, res) => {
            try {
                const user = req.user._id;
                const params = { "availableItems": { $elemMatch: { "numberOfAvailableItems": { $gt: 0 } } } }

                // Find products based on provided projection and filter criteria
                const data = await cart.find(params).toArray();
                res.send(data);
            } catch (error) {
                res.status(500).send({ error: error.message });
            }
        })
    return router;
}
