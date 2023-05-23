let express = require("express");
let router = express.Router();

const productsListRouter = require('../controllers/productsList');
const productSearchRouter = require('../controllers/productSearch');
const productCreationRouter = require('../controllers/productCreation');
const productDetailRouter = require('../controllers/productDetail');
const productUpdateRouter = require('../controllers/productUpdate');
const productDeletionRouter = require('../controllers/productDeletion');

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