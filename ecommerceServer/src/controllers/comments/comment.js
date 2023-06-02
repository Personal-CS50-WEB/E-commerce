const { ObjectId } = require('mongodb');
const express = require('express');
const router = express.Router();
const isAuthenticated = require('../../utils/users/authenticationCheck');

module.exports = function (comments) {
    router.post('/:productId', isAuthenticated, async (req, res) => {
        try {
            
            const { productId } = req.params;
        
            // Validate the product ID
            if (!ObjectId.isValid(productId)) {
                return res.status(400).send({ error: 'Invalid product ID' });
            }
            if (!req.body.text) {
                return res.status(400).send({ error: 'Comment Missing' });
            }

            // Create the comment record
            const comment = {
                user: {
                    _id: ObjectId(req.user._id),
                    username: req.user.username
                },
                product: ObjectId(productId),
                commentText: req.body.text
            };

            // Insert the comment record into the "comments" collection
            const result = await comments.insertOne(comment);
            const insertedId = result.insertedId;

            // Retrieve the inserted data by querying the collection
            const insertedData = await comments.findOne({ _id: insertedId });
            res.send(insertedData);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    });

    return router;
};
