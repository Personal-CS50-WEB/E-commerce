let express = require("express");
let router = express.Router();

const productsListRouter = require('../controllers/products/productsList');
const productSearchRouter = require('../controllers/products/productSearch');
const productCreationRouter = require('../controllers/products/productCreation');
const productDetailRouter = require('../controllers/products/productDetail');
const productUpdateRouter = require('../controllers/products/productUpdate');
const productDeletionRouter = require('../controllers/products/productDeletion');

module.exports = function (db) {
    const products = db.collection('products');

    return router
        .use(productsListRouter(products))
        .use(productCreationRouter(products))
        .use(productSearchRouter(products))
        .use(productDetailRouter(products))
        .use(productUpdateRouter(products))
        .use(productDeletionRouter(products));
};