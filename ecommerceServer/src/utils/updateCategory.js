function updateCategory(updatedFields) {
    
    // Extract the updated category fields
    const updatedCategory = updatedFields.category;
    if (updatedCategory) {
        // Update the `category.gender` without modifying `category.type`
        if (updatedCategory.gender) {
            updatedFields = {
                ...updatedFields,
                'category.gender': updatedCategory.gender
            };
        }

        // Update the `category.type` without modifying `category.gender`
        if (updatedCategory.type) {
            updatedFields = {
                ...updatedFields,
                'category.type': updatedCategory.type
            };
        }
        delete updatedFields.category;
    }
return updatedFields
}
module.exports = updateCategory;
