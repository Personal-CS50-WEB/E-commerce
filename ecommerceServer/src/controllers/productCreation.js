const express = require('express');
const router = express.Router();
const CheckProductData = require('../utils/checkProductData');

module.exports = function (products) {
    router.post('/', async (req, res) => {
        try {
            const newProducts = req.body;

            if (!Array.isArray(newProducts)) {
                res.status(400).send({ error: 'Invalid data format. Expected an array of products.' });
                return;
            }
            let errors;
            errors = await CheckProductData(products, newProducts);

            if (errors.length) {
                res.status(422).send(errors);
            } else {
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
