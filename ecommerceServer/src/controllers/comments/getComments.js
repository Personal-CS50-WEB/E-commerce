const { ObjectId } = require('mongodb');
const express = require('express');
const router = express.Router();

module.exports = function (comments) {
    router.get('/:productId', async (req, res) => {
        try {

            const { productId } = req.params;

            // Validate the product ID
            if (!ObjectId.isValid(productId)) {
                return res.status(400).send({ error: 'Invalid product ID' });
            }
            
            const projection = { id: 1, commentText: 1, user: 1 };

            // Find all likes for the given product ID
            const productComments = await comments.find({ product: ObjectId(productId) }).project(projection).toArray();

            res.send({ productComments: productComments });
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    });

    return router;
};
