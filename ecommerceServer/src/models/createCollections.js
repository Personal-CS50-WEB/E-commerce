const con = require('../configs/connect-db'); // Assuming the module is saved as db.js
const createCollectionIfNotExists = require('../utils/createCollection');
// Connect to the MongoDB server
async function connectAndCreateCollections() {
    try {
        await con.connect();
        // Use the connection
        const client = con.getClient();
        const db = client.db();
        // Perform operations on the collection
        const collectionsToCreate = ['users', 'products', 'likes', 'comments'];
        // Create collections if they don't exist
        for (const collectionName of collectionsToCreate) {
            await createCollectionIfNotExists(db, collectionName);
        }
    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
    } finally {
        // Close the connection
        if (con.getClient()) {
            con.close();
        }
    }
}

connectAndCreateCollections();