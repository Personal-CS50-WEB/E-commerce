const { ObjectId } = require('mongodb');
const express = require('express');
const router = express.Router();

module.exports = function (products) {
    router.get("/:id",async (req, res) => {
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
}
