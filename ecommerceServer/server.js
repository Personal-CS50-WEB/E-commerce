require('dotenv').config();

const { MongoClient } = require('mongodb');
const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');

const { connectAndCreateCollections } = require('./src/models/createCollections.js');

const PORT = process.env.PORT || 4001;
const app = express();

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/')));

app.get('/', (req, res) => {
    res.send('Hello from my app');
});

app.listen(PORT, () => {
    debug(`listening on port ${chalk.green(PORT)}`);
});
