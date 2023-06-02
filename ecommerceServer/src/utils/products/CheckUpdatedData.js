const getProductFromDatabase = require('./checkIfExists');
const { ObjectId } = require('mongodb');

async function CheckUpdatedData(updatedFields, res, products, id) {
    const query = { _id: ObjectId(id) };
    const existingProduct = await getProductFromDatabase(products, query);
    if (!existingProduct) {
        res.status(400).send({ error: "No product found" });
    }
    const errors = [];

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

        // Check for category field
        if (key === 'category') {
            if (!updatedFields[key]) {
                errors.push({
                    field: key,
                    error: 'type',
                    message: 'Category missing',
                });
            } else {
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
                            error: 'type',
                            message: 'Size required',
                        });
                    }

                    if (item.numberOfAvailableItems && isNaN(Number(item.numberOfAvailableItems))) {
                        errors.push({
                            field: `${key}[${index}].numberOfAvailableItems`,
                            error: 'type',
                            message: 'NumberOfAvailableItems must be a number',
                        });
                    }
                });
            }
        }
    }
    if (errors.length > 0) {
        // If there are validation errors, return an error response
        return res.status(400).send({ errors: errors });
    }
}

module.exports = CheckUpdatedData;
