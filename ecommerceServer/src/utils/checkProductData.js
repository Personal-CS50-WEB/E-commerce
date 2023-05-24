const getProductFromDatabase = require('./checkIfExists');

async function CheckProductData(products, newProducts) {
    const errors = [];

    for (const [index, newProduct] of newProducts.entries()) {
        const existingProduct = await getProductFromDatabase(products, newProduct);
        if (await existingProduct) {
            errors.push({
                index: index,
                field: 'product',
                error: 'duplicate',
                message: 'Product already exists in the database',
            });
            console.log(errors)
        }

        if (!newProduct.name) {
            errors.push({
                index: index,
                field: 'name',
                error: 'required',
                message: 'Name is required',
            });
        }

        if (newProduct.price && isNaN(Number(newProduct.price))) {
            errors.push({
                index: index,
                field: 'price',
                error: 'type',
                message: 'Price must be a number',
            });
        }

        if (newProduct.name && newProduct.name.length > 35) {
            errors.push({
                index: index,
                field: 'name',
                error: 'length',
                message: 'Name cannot be longer than 35 characters',
            });
        }

        if (!newProduct.category) {
            errors.push({
                index: index,
                field: 'category',
                error: 'type',
                message: 'Category must be an object',
            });
        } else {
            if (!newProduct.category.gender) {
                errors.push({
                    index: index,
                    field: 'category.gender',
                    error: 'required',
                    message: 'Gender is required in the category',
                });
            }

            if (!newProduct.category.type) {
                errors.push({
                    index: index,
                    field: 'category.type',
                    error: 'required',
                    message: 'Type is required in the category',
                });
            }
        }

        if (!Array.isArray(newProduct.availableItems) || newProduct.availableItems.length === 0) {
            errors.push({
                index: index,
                field: 'availableItems',
                error: 'type',
                message: 'AvailableItems must be a non-empty array',
            });
        } else {
            newProduct.availableItems.forEach((item, itemIndex) => {
                if (!item.size) {
                    errors.push({
                        index: index,
                        itemIndex: itemIndex,
                        field: 'availableItems.size',
                        error: 'required',
                        message: 'Size is required in availableItems',
                    });
                }

                if (item.numberOfAvailableItems && isNaN(Number(item.numberOfAvailableItems))) {
                    errors.push({
                        index: index,
                        itemIndex: itemIndex,
                        field: 'availableItems.numberOfAvailableItems',
                        error: 'type',
                        message: 'numberOfAvailableItems must be a number',
                    });
                }
            });
        }

        // if (!Array.isArray(newProduct.photos) || newProduct.photos.length === 0) {
        //     errors.push({
        //         index: index,
        //         field: 'photos',
        //         error: 'type',
        //         message: 'Photos must be a non-empty array',
        //     });
        // } else {
        //     newProduct.photos.forEach((photo, photoIndex) => {
        //         if (!photo.url) {
        //             errors.push({
        //                 index: index,
        //                 photoIndex: photoIndex,
        //                 field: 'photos.url',
        //                 error: 'required',
        //                 message: 'URL is required in photos',
        //             });
        //         }
        //     });
        // }
    };
    return errors;
}

module.exports = CheckProductData;
