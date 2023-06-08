const { MongoClient } = require('mongodb');

// MongoDB connection parameters
const url = process.env.url;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

// Create a reusable connection
let client = null;
let db = null;
// Connect to MongoDB
async function connect() {
    try {
        if (!client) {
            client = new MongoClient(url, options);
            await client.connect();
            db = await client.db(process.env.dbname)
            console.log('Connected to MongoDB');
        }
    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
    }
    return db;
}

// close the connected client
function close() {
    if (client) {
        client.close();
        console.log('MongoDB connection closed');
    }
}

// Export the connect and close functions
module.exports = {
    connect,
    close,
};
