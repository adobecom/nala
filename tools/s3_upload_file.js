const AWS = require('aws-sdk');
const mime = require('mime-types');
const path = require('path');
const fs = require('fs');

const s3Upload = (s3, ...args) => {
  return new Promise((resolve, reject) => {
    s3.upload(...args, (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
};

async function uploadFile(fileName, s3Bucket, s3Path, credentials, s3Key, mimeType) {
  credentials = credentials || {};

  let s3 = new AWS.S3({
    endpoint: 's3-sj3.corp.adobe.com',
    secretAccessKey: credentials.s3secretkey,
    accessKeyId: credentials.s3accesskey,
    s3ForcePathStyle: true
  });

  let baseName = path.basename(fileName);
  let key = path.join(s3Path, s3Key || baseName).replace(/\\/g, '/');
  mimeType = mimeType || mime.lookup(fileName);

  const fileContent = fs.readFileSync(fileName);

  const params = {
    Bucket: s3Bucket,
    Key: key,
    Body: fileContent,
    ContentType: mimeType,
    ACL: 'public-read'
  };

  return await s3Upload(s3, params).catch(err => {
    console.log(err);
  });
}

exports.uploadFile = uploadFile;