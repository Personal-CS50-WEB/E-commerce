const { AWS, s3, bucketName } = require('../configs/aws.config');
/**
 * Deletes photos from the S3 bucket.
 * @param {string[]} photoUrls - Array of photo URLs to delete.
 */
async function deleteFromBucket(photoUrls) {
    try {
        await Promise.all(
            await Promise.all(
                photoUrls.map(async (url) => {
                    try {
                        const photoKey = url.replace(`https://${bucketName}.s3.amazonaws.com/`, '');
                        const params = {
                            Bucket: bucketName,
                            Key: photoKey,
                        };
                        console.log(params);
                        await s3.deleteObject(params).promise();
                    } catch (error) {
                        console.error('Error deleting object:', error);
                    }
                })
            )
        );
    } catch (error) {
        console.error('Error deleting objects:', error);
    }
}

module.exports = deleteFromBucket;
