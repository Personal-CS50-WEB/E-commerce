function checkForInvalidKeys(obj, allowedKeys) {

    // Check for additional keys in newProduct
    const objKeys = Object.keys(obj);
    const invalidKeys = objKeys.filter(key => !allowedKeys.includes(key));
    const keys = [];

    if (invalidKeys.length > 0) {
        console.log(invalidKeys)
        invalidKeys.forEach(key => {
            keys.push(key)
        });
    }
    return keys;
}

module.exports = checkForInvalidKeys;