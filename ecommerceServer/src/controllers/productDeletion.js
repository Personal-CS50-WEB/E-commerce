const { ObjectId } = require('mongodb');
const express = require('express');
const router = express.Router();

module.exports = function (products) {
    router.delete("/:id", async (req, res) => {
        try {
            const { id } = req.params;
            await products.deleteOne({ _id: ObjectId(id) });
            res.status(204).send();
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    })
    const { ObjectId } = require('mongodb');
        return router;
}
