const express = require('express');
const router = express.Router();
const CheckProductData = require('../../utils/checkProductData');
const { AWS, s3, bucketName } = require('../../configs/aws.config');

const multer = require('multer');

// Set up Multer storage configuration
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

module.exports = function (products) {
    router.post('/', upload.array("photos[]"), async (req, res) => {
        try {
            const newProducts = [req.body];
            
            const uploadedPhotos = req.files;

            if (!Array.isArray(newProducts)) {
                res.status(400).send({ error: 'Invalid data format. Expected an array of products.' });
                return;
            }
            let errors = [];
            // errors = await CheckProductData(products, newProducts);

            if (errors.length) {
                res.status(422).send(errors);
            } else {
                const photoUrls = await Promise.all(
                    uploadedPhotos.map(async (file) => {
                        // Create a unique filename for the photo
                        const filename = Date.now().toString() + "_" + file.originalname;
                        const params = {
                            Bucket: bucketName,
                            Key: filename,
                            Body: file.buffer, // The photo file buffer
                        };

                        // Upload the photo file to S3
                        await s3.upload(params).promise();

                        // Generate the S3 URL for the uploaded photo
                        const photoUrl = `https://${bucketName}.s3.amazonaws.com/${filename}`;
                        return { url: photoUrl };
                    })
                );
                // Add the photoUrls to the newProducts or modify the product schema to include the photoUrls field
                newProducts.forEach((product, index) => {
                    product.photos = photoUrls[index];
                });
                console.log
                (newProducts)
                const result = await products.insertMany(newProducts);
                const insertedIds = result.insertedIds;

                // Retrieve the inserted data by querying the collection
                const insertedData = await products.find({ _id: { $in: Object.values(insertedIds) } }).toArray();

                res.send(insertedData);
            }
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    });
    return router;
}
