let express = require("express");
let router = express.Router();

const insertLikeRouter = require('../controllers/likes/Like');
const getLikesRouter = require('../controllers/likes/getLikes');

module.exports = function (db) {
    const likes = db.collection('likes');

    return router
        .use(insertLikeRouter(likes))
        .use(getLikesRouter(likes))
};