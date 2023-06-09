const express = require("express");
const router = express.Router();
const productsRouter = require("../routes/products");
const usersRouter = require("../routes/users");
const likesRouter = require("../routes/likes");
const commentsRouter = require("../routes/comments");
const cartRouter = require("../routes/cart");
const ordersRouter = require("../routes/orders");

module.exports = function (db) {
    router.use('/products', productsRouter(db));
    router.use('/users', usersRouter(db));
    router.use('/likes', likesRouter(db));
    router.use('/comments', commentsRouter(db));
    router.use('/cart', cartRouter(db));
    router.use('/orders', ordersRouter(db));
    return router;
};