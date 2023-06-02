let express = require("express");
let router = express.Router();

const insertCommentRouter = require('../controllers/comments/comment');
const getCommentsRouter = require('../controllers/comments/getComments');
const deleteCommentRouter = require('../controllers/comments/deleteComment');

module.exports = function (db) {
    const comments = db.collection('comments');

    return router
        .use(insertCommentRouter(comments))
        .use(deleteCommentRouter(comments))
        .use(getCommentsRouter(comments))
};