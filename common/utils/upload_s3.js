/*
 * Upload files to Adobe S3
 * It needs 2 environment variables, 's3accesskey' and 's3secretkey', to access S3
 * Two command args 'bucket' and 'path', to store files
 */
const AWS = require('aws-sdk');
const mime = require('mime-types');
const yargs = require('yargs');
const fs = require('fs');
const path = require('path');
const glob = require('glob');

let args = yargs.options({
  bucket: {
    alias: 'b',
    describe: 'S3 bucket',
    demandOption: true
  },
  path: {
    alias: 'p',
    describe: 'S3 key prefix',
    demandOption: true
  }
}).argv;

const uploadFile = fileName => {
  let s3 = new AWS.S3({
    endpoint: 's3-sj3.corp.adobe.com',
    secretAccessKey: process.env.s3secretkey,
    accessKeyId: process.env.s3accesskey,
    s3ForcePathStyle: true
  });

  let baseName = path.basename(fileName);
  let key = path.join(args.path, baseName).replace(/\\/g, '/');
  let mimeType = mime.lookup(fileName);

  const fileContent = fs.readFileSync(fileName);

  const params = {
    Bucket: args.bucket,
    Key: key,
    Body: fileContent,
    ContentType: mimeType,
    ACL: 'public-read'
  };

  s3.upload(params, function(err, data) {
    if (err) {
      throw err;
    }
    console.log(`File uploaded successfully. ${data.Location}`);
  });
};

const uploadFiles = fileSets => {
  for (let set of fileSets) {
    let items = set.split(',');
    for (let item of items) {
      console.log(`Looking for '${item}' to upload to S3...`);
      let files = glob.sync(item);
      for (let file of files) {
        uploadFile(file);
      }
    }
  }
};

uploadFiles(args._);
