const { ObjectId } = require('mongodb');
let express = require("express");
let router = express.Router();
const qs = require("qs");

module.exports = function (db) {
    const products = db.collection(`products`);
    router
        .route("/products")
        .get(async (req, res) => {
            try {
                const data = await products.find({}).toArray();
                res.send(data);
            } catch (error) {
                res.status(500).send({ error: error.message });
            }
        })
        .post(async (req, res) => {
            try {
                const newProduct = req.body;

                const errors = [];

                if (!newProduct.name) {
                    errors.push({
                        field: "name",
                        error: "required",
                        message: "Name is required",
                    });
                }

                if (newProduct.price && isNaN(Number(newProduct.price))) {
                    errors.push({
                        field: "price",
                        error: "type",
                        message: "Price must be a number",
                    });
                }

                if (newProduct.name > 25) {
                    errors.push({
                        field: "name",
                        error: "length",
                        message: "Name cannot be longer than 25 characters",
                    });
                }

                if (errors.length) {
                    res.status(422).send(errors);
                } else {
                    const result = await products.insertOne(newProduct);
                    res.send(result);
                }
            } catch (error) {
                res.status(500).send({ error: error.message });
            }
        });

    router.route("/products/search").get(async (req, res) => {
        try {
            const query = qs.parse(req.query);

            const filters = Object.keys(query).map(key => {
                const obj = query[key];
                switch (obj.op) {
                    case 'lt':
                        return { [key]: { $lt: obj.val } };
                    case 'eq':
                        return { [key]: obj.val };
                    default:
                        return { [key]: { $regex: obj.val, $options: 'i' } };
                }
            });
            
            const results = await products.find({ $and: filters }).toArray();

            res.send(results);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    });

    router.route("/products/detailSearch").get(async (req, res) => {
        try {
            const query = qs.parse(req.query);

            const results = await products.find((_) => {
                return Object.keys(query).reduce((found, key) => {
                    const obj = query[key];
                    switch (obj.op) {
                        case "lt":
                            found = found && _[key] < obj.val;
                            break;
                        case "eq":
                            found = found && _[key] == obj.val;
                            break;
                        default:
                            found = found && _[key].indexOf(obj.val) !== -1;
                            break;
                    }
                    return found;
                }, true);
            }).toArray();

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
            const result = await products.updateOne({ _id: ObjectId(id) }, { $set: updatedFields });
            res.send(result);
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