const { ObjectId } = require('mongodb');
const express = require('express');
const router = express.Router();
const isAuthenticated = require('../../utils/users/authenticationCheck');

module.exports = function (comments) {
    router.delete('/:productId/:commentId', isAuthenticated, async (req, res) => {
        try {

            const { productId, commentId } = req.params;
            const user = req.user._id;

            // Validate the product ID
            if (!ObjectId.isValid(productId)) {
                return res.status(400).send({ error: 'Invalid product ID' });
            }
            if (!ObjectId.isValid(commentId)) {
                return res.status(400).send({ error: 'Invalid comment ID' });
            }

            // if the comment excites and the user own it delete from database
            const existingComment = await comments.findOne({  _id: ObjectId(commentId) });
            if (existingComment && existingComment.user._id.equals(ObjectId(user))) {
                await comments.deleteOne({ _id: existingComment._id });
                return res.send({ message: 'comment removed successfully' });
            }
            return res.status(400).send({ error: 'Failed to remove comment' });
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    });

    return router;
};
// 6479e1726980ac06aa2dcecc