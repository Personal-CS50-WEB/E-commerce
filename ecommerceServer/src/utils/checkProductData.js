const getProductFromDatabase = require('./checkIfExists');

async function CheckProductData(products, newProduct) {
    const errors = [];

    // Check if the product already exists in the database
    const existingProduct = await getProductFromDatabase(products, newProduct);

    if (await existingProduct) {
        errors.push({
            field: 'product',
            error: 'duplicate',
            message: 'Product already exists in the database',
        });
        console.log(errors)
    }

    // Validate the name field
    if (!newProduct.name) {
        errors.push({
            field: 'name',
            error: 'required',
            message: 'Name is required',
        });
    }
    if (newProduct.name && newProduct.name.length > 35) {
        errors.push({
            field: 'name',
            error: 'length',
            message: 'Name cannot be longer than 35 characters',
        });
    }

    // Validate the price field
    if (newProduct.price && isNaN(Number(newProduct.price))) {
        errors.push({
            field: 'price',
            error: 'type',
            message: 'Price must be a number',
        });
    }

    // Validate the category field
    if (!newProduct.category) {
        errors.push({
            field: 'category',
            error: 'type',
            message: 'Category must be an object',
        });
    } else {
        if (!newProduct.category.gender) {
            errors.push({
                field: 'category.gender',
                error: 'required',
                message: 'Gender is required in the category',
            });
        } else {
            // Validate the gender field in category
            if (newProduct.category.gender && newProduct.category.gender !== 'male' && newProduct.category.gender !== 'female') {
                errors.push({
                    field: `newProduct.category.gender`,
                    error: 'type',
                    message: 'Gender missing',
                });
            }
        }

        if (!newProduct.category.type) {
            errors.push({
                field: 'category.type',
                error: 'required',
                message: 'Type is required in the category',
            });
        }
    }

    // Validate the availableItems field
    if (!Array.isArray(newProduct.availableItems) || newProduct.availableItems.length === 0) {
        errors.push({
            field: 'availableItems',
            error: 'type',
            message: 'AvailableItems must be a non-empty array',
        });
    } else {
        newProduct.availableItems.forEach((item, itemIndex) => {
            // Validate the size field in each available item
            if (!item.size) {
                errors.push({
                    itemIndex: itemIndex,
                    field: 'availableItems.size',
                    error: 'required',
                    message: 'Size is required in availableItems',
                });
            }

            // Validate the numberOfAvailableItems field in each available item
            if (item.numberOfAvailableItems && isNaN(Number(item.numberOfAvailableItems))) {
                errors.push({
                    itemIndex: itemIndex,
                    field: 'availableItems.numberOfAvailableItems',
                    error: 'type',
                    message: 'numberOfAvailableItems must be a number',
                });
            }
        });
    }
    return errors;
}

module.exports = CheckProductData;
