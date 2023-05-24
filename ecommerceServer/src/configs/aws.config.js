require('dotenv').config();
const AWS = require("aws-sdk");

AWS.config.update({
    accessKeyId: process.env.Access_key_ID,
    secretAccessKey: process.env.Secret_access_key,
    region: "us-east-1",
});
const s3 = new AWS.S3();
const bucketName = process.env.AWS_S3_BUCKET_NAME;
module.exports = {AWS, s3 , bucketName}