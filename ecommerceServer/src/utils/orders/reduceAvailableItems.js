const { ObjectId } = require('mongodb');
const findItem = require('../cart/findItem');

// Function to reduce the available items in the cart
async function reduceAvailableItems(cartData, products) {
    let orderItems = [];

    // Iterate through each item in the cart
    for (const item of cartData) {
        // Find products with matching IDs and size in the "products" collection
        const cartItem = await findItem(products, item.product_id, item.size);
        if (cartItem) {

            // Reduce the number of available items for the selected size
            const updatedAvailableItems = await cartItem.availableItems.map((availableItem) => {
                if (availableItem.size === cartItem.size) {
                    return {
                        ...availableItem,
                        numberOfAvailableItems: availableItem.numberOfAvailableItems - 1
                    };
                }

                return availableItem;
            });
            // Update the availableItems field in the "products" collection
            const updated = { $set: { "availableItems": updatedAvailableItems } }
            await products.updateOne({ _id: ObjectId(cartItem._id) }, updated);

            // Remove unwanted keys and add the photo field
            const { cartId, category, color, description, photos, availableItems, onSale, ...updatedCartItem } = cartItem;
            updatedCartItem.photo = photos[0].url;
            
            // Add the updated cart item to the order items array
            orderItems.push(updatedCartItem);

        }
    }
    return orderItems;
}
module.exports = reduceAvailableItems;
