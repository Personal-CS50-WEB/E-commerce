async function CheckUpdatedData(updatedFields) {
    const errors = [];

    for (const key in updatedFields) {
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

        if (key === 'price') {
            if (updatedFields[key] && isNaN(Number(updatedFields[key]))) {
                errors.push({
                    field: key,
                    error: 'type',
                    message: 'Price must be a number',
                });
            }
        }

        if (key === 'category') {
            if (!updatedFields[key] || typeof updatedFields[key] !== 'object') {
                errors.push({
                    field: key,
                    error: 'type',
                    message: 'Category must be an object',
                });
            } else {
                if (updatedFields[key].gender && typeof updatedFields[key].gender !== 'string') {
                    errors.push({
                        field: `${key}.gender`,
                        error: 'type',
                        message: 'Gender must be a string',
                    });
                }


            }
        }
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

        if (key === 'onSale') {
            if (isNaN(Number(updatedFields[key]))) {
                errors.push({
                    field: key,
                    error: 'type',
                    message: 'OnSale must be a number',
                });
            }
        }

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

    return errors;
}

module.exports = CheckUpdatedData;
