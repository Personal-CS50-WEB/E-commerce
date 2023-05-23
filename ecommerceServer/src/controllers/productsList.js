const express = require('express');
const router = express.Router();

module.exports = function (products) {
    router
        .get('/', async (req, res) => {
            try {
                const projection = { id: 1, name: 1, price: 1, "photos.url": 1 };
                const data = await products.find({}).project(projection).toArray();
                res.send(data);
            } catch (error) {
                res.status(500).send({ error: error.message });
            }
        })
        return router;
}
