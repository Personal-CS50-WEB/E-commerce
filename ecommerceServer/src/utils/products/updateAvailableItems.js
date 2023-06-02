const { ObjectId } = require('mongodb');

/**
 * Updates the availableItems array in the database based on the provided updatedFields.
 * If the size already exists, it updates the numberOfAvailableItems.
 * If the size does not exist, it adds a new object to the availableItems array.
 * @param {Object} updatedFields - The updated fields containing the availableItems array.
 * @param {Object} products - The MongoDB collection instance for products.
 * @param {string} id - The ID of the product.
 * @returns {Object} - The updated fields after processing the availableItems.
 */
async function updatedAvailable(updatedFields, products, id) {
    const updatedAvailableItems = updatedFields.availableItems;
    if (updatedAvailableItems && Array.isArray(updatedAvailableItems)) {
        const updatePromises = [];

        // Update existing availableItems
        updatedAvailableItems.forEach(item => {
            const filter = { _id: ObjectId(id), 'availableItems.size': item.size };
            const update = { $set: { 'availableItems.$.numberOfAvailableItems': item.numberOfAvailableItems } };
            updatePromises.push(products.updateOne(filter, update));
        });

        // Add new availableItems
        updatedAvailableItems.forEach(item => {
            const filter = { _id: ObjectId(id), 'availableItems.size': { $ne: item.size } };
            const update = { $addToSet: { availableItems: item } };
            updatePromises.push(products.updateOne(filter, update));
        });
        await Promise.all(updatePromises);
    }
    // Remove availableItems from updatedFields
    await delete updatedFields.availableItems;

    return updatedFields

}

module.exports = updatedAvailable;