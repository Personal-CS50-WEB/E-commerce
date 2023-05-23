
const express = require('express');
const router = express.Router();
const qs = require("qs");

module.exports = function (products) {
    router.get("/search", async (req, res) => {
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
        return router;
}
