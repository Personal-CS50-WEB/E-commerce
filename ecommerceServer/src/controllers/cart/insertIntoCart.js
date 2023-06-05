const express = require('express');
const router = express.Router();

module.exports = function (cart) {
    router
        .get('/', async (req, res) => {
            try {
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
