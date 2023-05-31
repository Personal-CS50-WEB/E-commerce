const express = require('express');
const router = express.Router();
const CheckProductData = require('../../utils/checkProductData');
const addToBucket = require('../../utils/addToBucket')
const { storage, upload } = require('../../configs/multer.config')
const adminCheck = require('../../utils/users/adminCheck');

module.exports = function (products) {
    router.post('/', adminCheck, upload.array("photos[]"), async (req, res) => {
        try {
            // const { user } = req;
            // adminCheck(user, res)

            const newProduct = req.body;
            const uploadedPhotos = req.files;

            if (uploadedPhotos && uploadedPhotos.length < 1) {
                res.status(422).send("Photos required");
                return
            }
            let errors = [];
            errors = await CheckProductData(products, newProduct);

            if (errors.length) {
                res.status(422).send(errors);
            } else {
                // Add the photo to s3 bucket
                const photoUrls = await addToBucket(uploadedPhotos);

                // Add the photoUrls to the newProduct
                newProduct.photos = photoUrls;

                const result = await products.insertOne(newProduct);
                const insertedId = result.insertedId;

                // Retrieve the inserted data by querying the collection
                const insertedData = await products.findOne({ _id: insertedId });
                res.send(insertedData);
            }
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    });
    return router;
}
