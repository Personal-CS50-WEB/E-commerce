const { ObjectId } = require('mongodb');
const express = require('express');
const router = express.Router();
const isAuthenticated = require('../../utils/users/authenticationCheck');

module.exports = function (cart) {
    router
        .delete('/', isAuthenticated, async (req, res) => {
            try {
                console.log(req.user._id)
                const user = req.user._id;
                const item = req.body
                // if the comment excites and the user own it delete from database
                const existingProduct = await cart.findOne({_id: ObjectId(item.id)});
            
                //check if item in cart and the authenticated user'id in the record
                if (existingProduct && existingProduct.user_id.equals(ObjectId(user))) {
                    await cart.deleteOne({ _id: existingProduct._id });
                    return res.send({ message: 'Item removed successfully' });
                }
                return res.status(400).send({ error: 'Item not found' });
            } catch (error) {
                res.status(500).send({ error: error.message });
            }
        })
    return router;
}
