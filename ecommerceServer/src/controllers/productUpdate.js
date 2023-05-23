const { ObjectId } = require('mongodb');
const express = require('express');
const router = express.Router();
const CheckUpdatedData = require('../utils/CheckUpdatedData');

module.exports = function (products) {
    router
    .patch('/:id', async (req, res) => {
        try {
            const { id } = req.params;
            const updatedFields = req.body;

            // Call the validation function to check the updatedFields data
            let validationErrors;
            validationErrors = await CheckUpdatedData(updatedFields);

            if (validationErrors.length > 0) {
                // If there are validation errors, return an error response
                return res.status(400).send({ errors: validationErrors });
            }

            const result = await products.updateOne({ _id: ObjectId(id) }, { $set: updatedFields });
            const updatedObject = await products.findOne({ _id: ObjectId(id) });

            res.send(updatedObject);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    })
        return router;
}
