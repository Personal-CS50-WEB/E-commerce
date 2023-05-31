const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

module.exports = function (users) {
    router.get('/logout', (req, res) => {
        req.logout(function(err) {
            if (err) { return next(err); }
            res.redirect('/');})
        // Return a success message
    });
    return router;
}
