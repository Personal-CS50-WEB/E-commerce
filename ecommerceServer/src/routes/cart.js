let express = require("express");
let router = express.Router();

const getCartRouter = require('../controllers/cart/getCart');
const insertIntoCartRouter = require('../controllers/cart/insertIntoCart');
const deleteFromCartRouter = require('../controllers/cart/deleteFromCart');

module.exports = function (db) {
    const cart = db.collection('cart');

    return router
        .use(getCartRouter(cart))
        .use(insertIntoCartRouter(cart))
        .use(deleteFromCartRouter(cart))
};