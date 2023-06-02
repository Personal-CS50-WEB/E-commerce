const { ObjectId } = require('mongodb');
const express = require('express');
const router = express.Router();
const deleteFromBucket = require('../../utils/products/deleteFromBucket');
const adminCheck = require('../../utils/users/adminCheck');

module.exports = function (products) {
    router.delete("/:id", adminCheck, async (req, res) => {
        try {

            const { id } = req.params;
            // Validate the product ID
            if (!ObjectId.isValid(id)) {
                return res.status(400).send({ error: 'Invalid product ID' });
            }
            // Retrieve the photos URLs from the database
            const product = await products.findOne({ _id: ObjectId(id) });
            const photoUrls = product.photos.map(photo => photo.url);

            await deleteFromBucket(photoUrls);

            // Delete the record from the database
            await products.deleteOne({ _id: ObjectId(id) });

            res.status(204).send();
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    });

    return router;
};
