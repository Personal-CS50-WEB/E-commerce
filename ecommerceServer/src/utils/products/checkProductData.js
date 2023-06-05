const getProductFromDatabase = require('./checkIfExists');
const checkForInvalidKeys = require('./checkKey');

async function CheckProductData(products, newProduct) {
    const errors = [];

    const allowedKeys = ['name', 'description', 'photos', 'availableItems', 'onSale', 'color', 'price', 'category'];
    const invalidKeys = await checkForInvalidKeys(newProduct, allowedKeys)
    if (invalidKeys.length > 0) {
        invalidKeys.forEach(key => {
            errors.push({
                field: key,
                error: 'invalid',
                message: `Invalid field: ${key}`,
            });
        });
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
    if (!newProduct.price) {
        errors.push({
            field: 'price',
            error: 'required',
            message: 'Price is required',
        });
    }
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
        if (newProduct.category && !newProduct.category.gender) {
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
        const allowedCategoryKeys = ['type', 'gender'];
        const categoryInavlidKeys = checkForInvalidKeys(newProduct.category, allowedCategoryKeys);
        if (categoryInavlidKeys.length > 0) {
            categoryInavlidKeys.forEach(key => {
                errors.push({
                    field: key,
                    error: 'invalid',
                    message: `Invalid field: ${key}`,
                });
            });
        }
    }
    // Validate the onSale field
    if (newProduct.onSale && (isNaN(Number(newProduct.onSale)) || newProduct.onSale < 0 || newProduct.onSale > 1)) {
        errors.push({
            field: 'onSale',
            error: 'range',
            message: 'onSale must be a number between 0 and 1',
        });
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
            if (!item.numberOfAvailableItems) {
                errors.push({
                    itemIndex: itemIndex,
                    field: 'availableItems.numberOfAvailableItems',
                    error: 'required',
                    message: 'numberOfAvailableItems is required in availableItems',
                });
            }
            else if (isNaN(Number(item.numberOfAvailableItems))) {
                errors.push({
                    itemIndex: itemIndex,
                    field: 'availableItems.numberOfAvailableItems',
                    error: 'type',
                    message: 'numberOfAvailableItems must be a number',
                });
            }
            const allowedItemKeys = ['numberOfAvailableItems', 'size'];
            const itemInavlidKeys = checkForInvalidKeys(item, allowedItemKeys);
            if (itemInavlidKeys.length > 0) {
                itemInavlidKeys.forEach(key => {
                    errors.push({
                        field: key,
                        error: 'invalid',
                        message: `Invalid field: ${key}`,
                    });
                });
            }
        });

    }
    if (errors.length < 0) {
        // Check if the product already exists in the database
        const query = {
            name: newProduct.name,
            color: newProduct.color,
            'category.gender': newProduct.category.gender,
            'category.type': newProduct.category.type
        }
        const existingProduct = await getProductFromDatabase(products, query);

        if (await existingProduct) {
            errors.push({
                field: 'product',
                error: 'duplicate',
                message: 'Product already exists in the database',
            });
        }
    }

    return errors;
}

module.exports = CheckProductData;
