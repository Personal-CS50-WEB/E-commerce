const express = require("express");
const router = express.Router();
const productsRouter = require("../routes/products");

module.exports =  function (db) {
    router.use('/products',productsRouter(db));

    return router;
};