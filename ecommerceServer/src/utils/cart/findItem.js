async function findItem(products, product_id, size, id) {

    const params = {
        _id: product_id,
        availableItems: {
            $elemMatch: {
                numberOfAvailableItems: { $gt: 0 },
                size: size
            }
        }
    }
    const projection = {
        _id: 1, name: 1, price: 1, color: 1, availableItems: 1, photos: 1
    }

    // Find the cart item in the "products" collection
    const cartItem = await products.findOne(params, projection);
    if (cartItem) {
        cartItem.size = size;
        cartItem.cartId = id;
    }
    return cartItem;
}
module.exports = findItem;
