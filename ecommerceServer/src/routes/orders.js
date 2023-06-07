let express = require("express");
let router = express.Router();

const getOrderRouter = require('../controllers/orders/getOrder');
const addOrderRouter = require('../controllers/orders/addOrder');
const getUserOrdersRouter = require('../controllers/orders/getOrders');

module.exports = function (db) {
    const orders = db.collection('orders');
    const products = db.collection('products');
    const cart = db.collection('cart');

    return router
        .use(getUserOrdersRouter(orders))
        .use(addOrderRouter(orders, products, cart))
        .use(getOrderRouter(orders))
};