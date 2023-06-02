const { ObjectId } = require('mongodb');
const express = require('express');
const router = express.Router();

module.exports = function (likes) {
    router.get('/:productId', async (req, res) => {
        try {
            const { productId } = req.params;

            // Validate the product ID
            if (!ObjectId.isValid(productId)) {
                return res.status(400).send({ error: 'Invalid product ID' });
            }

            // Find all likes for the given product ID
            const productLikes = await likes.find({ product: ObjectId(productId) }).toArray();
            
            res.send({numLikes:productLikes.length});
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    });

    return router;
};

