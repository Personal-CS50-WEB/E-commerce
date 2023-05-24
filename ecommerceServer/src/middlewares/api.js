const express = require("express");
const router = express.Router();
const productsRouter = require("../routes/products");
const usersRouter = require("../routes/users");

module.exports = function (db) {
    router.use('/products', productsRouter(db));
    router.use('/users', usersRouter(db));
    return router;
};