const { ObjectId } = require('mongodb');
const express = require('express');
const router = express.Router();
const isAuthenticated = require('../../utils/users/authenticationCheck');

module.exports = function (likes) {
    router.post('/:productId', isAuthenticated, async (req, res) => {
        try {

            const {productId} = req.params;
            const user = req.user._id;

            // Validate the product ID
            if (!ObjectId.isValid(productId)) {
                return res.status(400).send({ error: 'Invalid product ID' });
            }

            // Check if the user has already liked the product: delete the like record (unlike)
            const existingLike = await likes.findOne({ user: ObjectId(user), product: ObjectId(productId) });
            if (existingLike) {
                await likes.deleteOne({ _id: existingLike._id });
            }
            else {// Insert the like record into the "likes" collection
                const result = await likes.insertOne({
                    user: ObjectId(user),
                    product: ObjectId(productId)
                });
            }

            res.redirect(`${productId}`);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    });

    return router;
};
