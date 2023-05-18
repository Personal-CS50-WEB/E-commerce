const con = require('../configs/connect-db'); 
const createCollectionIfNotExists = require('../utils/createCollection');

// Connect to the MongoDB server
module.exports = async function () {
    let db = null;
    try {
        // Use the connection
        db = await con.connect();
        // Perform operations on the collection
        const collectionsToCreate = ['users', 'products', 'likes', 'comments', 'orders'];
        // Create collections if they don't exist
        for (const collectionName of collectionsToCreate) {
            await createCollectionIfNotExists(db, collectionName);
        }
    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
    }  
    return db;
}

