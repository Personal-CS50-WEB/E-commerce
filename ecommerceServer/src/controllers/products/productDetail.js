const { ObjectId } = require('mongodb');
const express = require('express');
const router = express.Router();
/**
 * Retrieves a single product by ID.
 * @param {Object} products - MongoDB collection for products.
 * @returns {Object} Express router.
 */
module.exports = function (products) {
    router.get("/:id", async (req, res) => {
        try {

            const { id } = req.params;
            // Validate the product ID
            if (!ObjectId.isValid(id)) {
                return res.status(400).send({ error: 'Invalid product ID' });
            }

            // Find the product with the provided ID
            const result = await products.findOne({ _id: ObjectId(id) });
            if (result) {
                res.send(result);
            } else {
                res.status(404).send("Not found");
            }
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    });
    return router;
}
