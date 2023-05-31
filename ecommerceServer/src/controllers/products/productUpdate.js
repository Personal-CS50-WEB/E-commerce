const { ObjectId } = require('mongodb');
const express = require('express');
const router = express.Router();
const CheckUpdatedData = require('../../utils/CheckUpdatedData');
const addToBucket = require('../../utils/addToBucket');
const deleteFromBucket = require('../../utils/deleteFromBucket');
const updateCategory = require('../../utils/updateCategory');
const updatedAvailable = require('../../utils/updateAvailableItems');
const { storage, upload } = require('../../configs/multer.config')
const adminCheck = require('../../utils/users/adminCheck');

module.exports = function (products) {
    router
        .patch('/:id', adminCheck, upload.array("photos[]"), async (req, res) => {
            try {
                
                const { id } = req.params;
                const updateQuery = { _id: ObjectId(id) };
                let updatedFields = req.body;
                const uploadedPhotos = req.files;
                let deletePhotos = true;

                // Call the validation function to check the updatedFields data
                await CheckUpdatedData(updatedFields, res);

                // Update the category fields without deleting other fields
                updatedFields = await updateCategory(updatedFields);


                // Update the availableItems without deleting other items
                updatedFields = await updatedAvailable(updatedFields, products, id);

                // Handle photo uploads
                if (uploadedPhotos && uploadedPhotos.length > 0) {
                    const photoUrls = await addToBucket(uploadedPhotos)
                    deletePhotos = false;
                    // Update the photo URL in the updatedObject
                    updatedFields = {
                        $addToSet: { photos: { $each: photoUrls } }
                    };
                    await products.updateOne(updateQuery, updatedFields);
                }
                // Handle photo deletions
                else if (updatedFields.photos && deletePhotos) {
                    const photoUrls = updatedFields.photos.map(photo => photo.url);

                    // Delete the photos from the S3 bucket
                    await deleteFromBucket(photoUrls);
                    updatedFields = {
                        $pull: { photos: { url: { $in: photoUrls } } }
                    };
                    await products.updateOne(updateQuery, updatedFields);
                } else {
                    await products.updateOne(updateQuery, { $set: updatedFields });
                }

                // Retrieve the updated object from the database
                const updatedObject = await products.findOne(updateQuery);
                res.send(updatedObject);
            } catch (error) {
                res.status(500).send({ error: error.message });
            }
        })
    return router;
}