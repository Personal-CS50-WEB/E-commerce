let express = require("express");
let router = express.Router();

const signUptRouter = require('../controllers/users/signup');
const logInRouter = require('../controllers/users/login');
const logOutRouter =  require('../controllers/users/logout');

module.exports = function (db) {
    const users = db.collection('users');

    return router
        .use(signUptRouter(users))
        .use(logInRouter(users))
        .use(logOutRouter(users))
        
};