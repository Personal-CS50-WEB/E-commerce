const { AWS, s3, bucketName } = require('../configs/aws.config');
/**
 * Uploads photos to the S3 bucket and returns their URLs.
 * @param {Object[]} uploadedPhotos - Array of uploaded photos.
 * @returns {Promise<Object[]>} - Array of photo URLs.
 */
async function addToBucket(uploadedPhotos) {
    const photoUrls = await Promise.all(
        uploadedPhotos.map(async (file) => {
            // Create a unique filename for the photo
            const filename = Date.now().toString() + "_" + file.originalname;
            const params = {
                Bucket: bucketName,
                Key: filename,
                Body: file.buffer
            };

            // Upload the photo file to S3
            await s3.upload(params).promise();

            // Generate the S3 URL for the uploaded photo
            const photoUrl = `https://${bucketName}.s3.amazonaws.com/${filename}`;

            return { url: photoUrl };
        })
    );   
    return photoUrls;
}
module.exports = addToBucket;
