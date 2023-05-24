require('dotenv').config();

const express = require('express');
const session = require('express-session');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');

const connectDB = require('./src/configs/connect-db')

const connectAndCreateCollections = require('./src/models/createCollections.js');
const app = express();
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.secret
}), cors(),
bodyParser.urlencoded({ extended: true }),
bodyParser.json(),
passport.initialize(),
passport.session());

async function startServer() {
    try {
        const db = await connectAndCreateCollections();
        let apiRouter = require("./src/middlewares/api")(db);
        require('./src/configs/local-strategy')(db);
        require('./src/configs/auth.config')(db);
        // Mount the API router
        app.use('/api', apiRouter);

        // Start the server
        const PORT = process.env.PORT || 4001;

        app.use(morgan('tiny'));
        app.use(express.static(path.join(__dirname, '/public/')));

        app.get('/', (req, res) => {
            res.send('Hello from my app');
        });
        app.listen(PORT, () => {
            debug(`listening on port ${chalk.green(PORT)}`);
        });
    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
    }
}

// Close the MongoDB connection when the app is terminated
process.on('SIGINT', async () => {
    await connectDB.close();
    process.exit();
});

// Start the server
startServer();