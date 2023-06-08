async function getProductFromDatabase(collection, query) {
    try {
        // Query the database for an existing product with the same data
        const existingProduct = await collection.findOne(query);
        return existingProduct;
    } catch (error) {
        console.log(error)

    }
}
module.exports = getProductFromDatabase;
