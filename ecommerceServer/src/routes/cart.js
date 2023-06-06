let express = require("express");
let router = express.Router();

const getCartRouter = require('../controllers/cart/getCart');
const insertIntoCartRouter = require('../controllers/cart/insertIntoCart');
const deleteFromCartRouter = require('../controllers/cart/deleteFromCart');

module.exports = function (db) {
    const cart = db.collection('cart');
    const products = db.collection('products');

    return router
        .use(getCartRouter(cart, products))
        .use(insertIntoCartRouter(cart, products))
        .use(deleteFromCartRouter(cart))
};