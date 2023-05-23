async function getProductFromDatabase(collection, newProduct) {
    try {
        // Query the database for an existing product with the same data
        const existingProduct = await collection.findOne({
            name: newProduct.name,
            color:newProduct.color,
            'category.gender': newProduct.category.gender,
            'category.type': newProduct.category.type
        });

        return existingProduct;
    } catch (error) {
        console.log(error) 
    
    }
}
module.exports = getProductFromDatabase;
