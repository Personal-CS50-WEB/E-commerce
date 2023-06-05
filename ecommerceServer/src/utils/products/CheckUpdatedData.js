const getProductFromDatabase = require('./checkIfExists');
const { ObjectId } = require('mongodb');
const checkForInvalidKeys = require('./checkKey');

async function CheckUpdatedData(updatedFields, res, products, id) {

    const query = { _id: ObjectId(id) };
    const existingProduct = await getProductFromDatabase(products, query);
    if (!existingProduct) {
        res.status(400).send({ error: "No product found" });
    }
    const errors = [];

    // check for invalid keys in fields
    const allowedKeys = ['name', 'description', 'photos', 'availableItems', 'onSale', 'color', 'price', 'category'];
    const invalidKeys = checkForInvalidKeys(updatedFields, allowedKeys)
    if (invalidKeys.length > 0) {
        invalidKeys.forEach(key => {
            errors.push({
                field: key,
                error: 'invalid',
                message: `Invalid field: ${key}`,
            });
        });
    }

    for (const key in updatedFields) {

        // Check for name field
        if (key === 'name') {
            if (!updatedFields[key]) {
                errors.push({
                    field: key,
                    error: 'required',
                    message: 'Name is required',
                });
            } else if (typeof updatedFields[key] !== 'string') {
                errors.push({
                    field: key,
                    error: 'type',
                    message: 'Name must be a string',
                });
            } else if (updatedFields[key].length > 35) {
                errors.push({
                    field: key,
                    error: 'length',
                    message: 'Name cannot be longer than 35 characters',
                });
            }
        }

        // Check for price field
        if (key === 'price') {
            if (updatedFields[key] && isNaN(Number(updatedFields[key]))) {
                errors.push({
                    field: key,
                    error: 'type',
                    message: 'Price must be a number',
                });
            }
        }
        // Validate the onSale field
        if (key === "onSale") {
            if (!updatedFields[key]) {
                errors.push({
                    field: key,
                    error: 'required',
                    message: 'Field required',
                });
            }
            else if (isNaN(Number(updatedFields.onSale)) || updatedFields.onSale < 0 || updatedFields.onSale > 1) {
                errors.push({
                    field: key,
                    error: 'range',
                    message: 'onSale must be a number between 0 and 1',
                });
            }
        }

        // Check for category field
        if (key === 'category') {
            if (!updatedFields[key]) {
                errors.push({
                    field: key,
                    error: 'required',
                    message: 'Category missing',
                });
            } else {
                //check for invalid keys in category 
                const allowedCategoryKeys = ['type', 'gender'];
                const invalidCategoryKeys = await checkForInvalidKeys(updatedFields.category, allowedCategoryKeys)
                if (invalidCategoryKeys.length > 0) {
                    invalidCategoryKeys.forEach(key => {
                        errors.push({
                            field: key,
                            error: 'invalid',
                            message: `Invalid field: ${key}`,
                        });
                    });
                }
                // Check for gender field within category
                if (updatedFields[key].gender && updatedFields[key].gender !== 'male' && updatedFields[key].gender !== 'female') {
                    errors.push({
                        field: `${key}.gender`,
                        error: 'type',
                        message: 'Gender missing',
                    });
                }
            }
        }

        // Check for color field
        if (key === 'color') {
            if (!updatedFields[key]) {
                errors.push({
                    field: key,
                    error: 'required',
                    message: 'Color is required',
                });
            } else if (typeof updatedFields[key] !== 'string') {
                errors.push({
                    field: key,
                    error: 'type',
                    message: 'Color must be a string',
                });
            }
        }

        // Check for onSale field
        if (key === 'onSale') {
            if (isNaN(Number(updatedFields[key]))) {
                errors.push({
                    field: key,
                    error: 'type',
                    message: 'OnSale must be a number',
                });
            }
        }

        // Check for availableItems field
        if (key === 'availableItems') {
            if (!Array.isArray(updatedFields[key])) {
                errors.push({
                    field: key,
                    error: 'type',
                    message: 'AvailableItems must be an array',
                });
            } else {
                updatedFields[key].forEach((item, index) => {
                    if (!item.size) {
                        errors.push({
                            field: `${key}[${index}].size`,
                            error: 'required',
                            message: 'Size required',
                        });
                    }
                    if (!item.numberOfAvailableItems) {
                        errors.push({
                            field: 'availableItems.numberOfAvailableItems',
                            error: 'required',
                            message: 'numberOfAvailableItems is required in availableItems',
                        });
                    }
                    else if (isNaN(Number(item.numberOfAvailableItems)) || item.numberOfAvailableItems < 0) {
                        errors.push({
                            field: `${key}[${index}].numberOfAvailableItems`,
                            error: 'type',
                            message: 'NumberOfAvailableItems must be a number',
                        });
                    }
                    //check for invalid keys in AvailableItems 
                    const allowedItemKeys = ['numberOfAvailableItems', 'size'];
                    const invalidItemKeys = checkForInvalidKeys(item, allowedItemKeys)
                    if (invalidItemKeys.length > 0) {
                        invalidItemKeys.forEach(key => {
                            errors.push({
                                field: key,
                                error: 'invalid',
                                message: `Invalid field: ${key}`,
                            });
                        });
                    }
                });
            }
        }
    }
    return errors;
}

module.exports = CheckUpdatedData;
