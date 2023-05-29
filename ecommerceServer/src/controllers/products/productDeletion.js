const { ObjectId } = require('mongodb');
const express = require('express');
const router = express.Router();
const { AWS, s3, bucketName } = require('../../configs/aws.config');
const deleteFromBucket = require('../../utils/deleteFromBucket');

module.exports = function (products) {
    router.delete("/:id", async (req, res) => {
        try {
            const { id } = req.params;

            // Retrieve the photos URLs from the database
            const product = await products.findOne({ _id: ObjectId(id) });
            const photoUrls = product.photos.map(photo => photo.url);

            console.log(photoUrls)  // Delete the photos from the S3 bucket
            await deleteFromBucket(photoUrls);
console.log(photoUrls)
            // Delete the record from the database
            // await products.deleteOne({ _id: ObjectId(id) });

            res.status(204).send();
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    });

    return router;
};
