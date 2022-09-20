const AWS = require('aws-sdk');
const mime = require('mime-types');
const path = require('path');
const fs = require('fs');
const yargs = require('yargs');
const util = require('util');

async function* listObjects(s3, params) {
  let isTruncated = false;
  let token;
  do {
    const response = await s3
      .listObjectsV2({
        ...params,
        ContinuationToken: token
      })
      .promise();

    // One could also yield each item separately
    yield response.Contents;

    ({ IsTruncated: isTruncated, NextContinuationToken: token } = response);
  } while (isTruncated);
}

async function main() {
  let args = yargs
    .options('s3key', {
      alias: 'k',
      required: true,
      description: 'S3 Key'
    })
    .options('s3secret', {
      alias: 's',
      required: true,
      description: 'S3 Secret'
    })
    .options('bucket', {
      alias: 'b',
      required: true,
      description: 'bucket'
    })
    .options('path', {
      alias: 'p',
      required: true,
      description: 'Folder to clean'
    })
    .options('days', {
      alias: 'd',
      description: 'File age in days. Older one will be deleted.'
    })
    .options('build', {
      alias: 'u',
      description: 'Older build will be deleted.'
    })
    .parserConfiguration({ 'strip-aliased': true }).argv;

  let s3key = args.s3key || process.env.s3accesskey;
  let s3secret = args.s3secret || process.env.s3secretkey;

  let s3 = new AWS.S3({
    endpoint: 's3-sj3.corp.adobe.com',
    secretAccessKey: s3secret,
    accessKeyId: s3key,
    s3ForcePathStyle: true
  });

  const deleteObjects = util.promisify(s3.deleteObjects).bind(s3);

  let cutDate = new Date();
  let cutBuild = null;

  if (args.days) {
    cutDate.setDate(cutDate.getDate() - parseInt(args.days));
  } else if (args.build) {
    cutBuild = parseInt(args.build);
  }

  let params = { Bucket: args.bucket, Prefix: args.path, MaxKeys: 1000 };

  let totalSize = 0;
  let toBeDeleted = {
    Bucket: args.bucket, 
    Delete: {
     Objects: [], 
     Quiet: false
    }    
  }

  for await (const contents of listObjects(s3, params)) {
    for (let obj of contents) {
      if (args.days) {
        if (obj.LastModified < cutDate) {
          totalSize += obj.Size;
          console.log(`${obj.Key}, ${obj.LastModified}, ${obj.Size}`);
        }
      } else if (args.build) {
        let regex = new RegExp(`^${args.path.replace(/\//g, '\/')}\/(\\d+)\/`);
        let m = obj.Key.match(regex);
        if (m) {
          let buildNumber = parseInt(m[1]);
          if (buildNumber < cutBuild) {
            totalSize += obj.Size;
            console.log(`${obj.Key}, ${obj.LastModified}, ${obj.Size}`);
            toBeDeleted.Delete.Objects.push({Key: obj.Key});
            if (toBeDeleted.Delete.Objects.length >= 100) {
              let res = await deleteObjects(toBeDeleted);
              toBeDeleted.Delete.Objects = [];
            }
          }
        }
      }
    }
  }

  if (toBeDeleted.Delete.Objects.length > 0) {
    let res = await deleteObjects(toBeDeleted);
    toBeDeleted.Delete.Objects = [];
  }  

  console.log(`Total Size: ${totalSize}`);
}

main();
