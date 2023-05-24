require('dotenv').config();
const session = require('express-session');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const express = require('express');
const app = express();

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.secret
}));
app.use(
    cors(),
    bodyParser.urlencoded({ extended: true }),
    bodyParser.json(),
    passport.initialize(),
    passport.session()
);