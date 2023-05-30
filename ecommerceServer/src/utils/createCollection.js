/**
 * Creates a collection in the database if it doesn't already exist.
 * @param {Object} db - MongoDB database object.
 * @param {string} collectionName - Name of the collection to create.
 */
async function createCollectionIfNotExists(db, collectionName) {

    const collections = await db.listCollections({ name: collectionName }).toArray();
    if (collections.length === 0) {
        await db.createCollection(collectionName);
        console.log(`Collection '${collectionName}' created`);
    } else {
        console.log(`Collection '${collectionName}' already exists`);
    }
}
module.exports = createCollectionIfNotExists;