const express = require('express');
const router = express.Router();
/**
 * Retrieves a list of products.
 * @param {Object} products - MongoDB collection for products.
 * @returns {Object} Express router.
 */
module.exports = function (products) {
    router
        .get('/', async (req, res) => {
            try {
                const projection = { id: 1, name: 1, price: 1, "photos.url": 1 };
                const params = { "availableItems": { $elemMatch: { "numberOfAvailableItems": { $gt: 0 } } } }

                // Find products based on provided projection and filter criteria
                const data = await products.find(params).project(projection).toArray();
                res.send(data);
            } catch (error) {
                res.status(500).send({ error: error.message });
            }
        })
    return router;
}
