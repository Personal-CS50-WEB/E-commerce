const { ObjectId } = require('mongodb');
let express = require("express");
let router = express.Router();
const qs = require("qs");
const CheckProductData = require('../utils/checkProductData');
const CheckUpdatedData = require('../utils/CheckUpdatedData');

module.exports = function (db) {
    const products = db.collection('products');
    router
        .route("/products")
        .get(async (req, res) => {
            try {
                const projection = { id: 1, name: 1, price: 1, "photos.url": 1 };
                const data = await products.find({}).project(projection).toArray();
                res.send(data);
            } catch (error) {
                res.status(500).send({ error: error.message });
            }
        })
        .post(async (req, res) => {
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

    router.route("/products/detailSearch").get(async (req, res) => {
        try {
            const query = qs.parse(req.query);

            const filters = Object.keys(query).map(key => {
                const obj = query[key];
                switch (obj.op) {
                    case 'lt':
                        return { [key]: { $lt: parseFloat(obj.val) } };
                    case 'eq':
                        return { [key]: parseFloat(obj.val) };
                    default:
                        return { [key]: { $regex: obj.val, $options: 'i' } };
                }
            });

            const projection = { id: 1, name: 1, price: 1, "photos.url": 1 };
            const results = await products.find({ $and: filters }).project(projection).toArray();
            res.send(results);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    });

    router
        .route("/products/:id")
        .patch(async (req, res) => {
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
        .delete(async (req, res) => {
            try {
                const { id } = req.params;
                await products.deleteOne({ _id: ObjectId(id) });
                res.status(204).send();
            } catch (error) {
                res.status(500).send({ error: error.message });
            }
        })
        .get(async (req, res) => {
            try {
                const { id } = req.params;
                const result = await products.findOne({ _id: ObjectId(id) });
                if (result) {
                    res.send(result);
                } else {
                    res.status(404).send();
                }
            } catch (error) {
                res.status(500).send({ error: error.message });
            }
        });
    return router;
};