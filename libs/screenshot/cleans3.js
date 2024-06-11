/* eslint-disable no-restricted-syntax */
const readline = require('readline');
// eslint-disable-next-line import/no-extraneous-dependencies
const { S3Client, ListObjectsV2Command, DeleteObjectsCommand } = require('@aws-sdk/client-s3');

const S3REGION = 'us-west-1';
const S3ENDPOINT = 'https://s3-sj3.corp.adobe.com';

async function* listObjects(s3, params) {
  let isTruncated = false;
  let token;
  do {
    const command = new ListObjectsV2Command({ ...params, ContinuationToken: token });
    // eslint-disable-next-line no-await-in-loop
    const response = await s3.send(command);
    yield response.Contents;
    ({ IsTruncated: isTruncated, NextContinuationToken: token } = response);
  } while (isTruncated);
}

function askQuestion(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(query, (ans) => {
      rl.close();
      resolve(ans);
    });
  });
}

async function main() {
  const bucket = process.argv[2];
  const s3Path = process.argv[3];

  if (!bucket || !s3Path) {
    console.log('Usage: node cleans3.js <bucket> <path>');
    process.exit(1);
  }

  const s3key = process.env.s3accesskey;
  const s3secret = process.env.s3secretkey;

  const s3 = new S3Client({
    region: S3REGION,
    endpoint: S3ENDPOINT,
    credentials: {
      accessKeyId: s3key,
      secretAccessKey: s3secret,
    },
    forcePathStyle: true,
  });

  const params = { Bucket: bucket, Prefix: s3Path, MaxKeys: 1000 };

  let totalSize = 0;
  const toBeDeleted = {
    Bucket: bucket,
    Delete: {
      Objects: [],
      Quiet: false,
    },
  };

  for await (const contents of listObjects(s3, params)) {
    if (contents === undefined || contents.length === 0) {
      console.log('No objects to delete.');
      return; // Skip to next iteration if current is empty
    }

    for (const obj of contents) {
      totalSize += obj.Size;
      console.log(`${obj.Key}, ${obj.LastModified}, ${obj.Size}`);
      toBeDeleted.Delete.Objects.push({ Key: obj.Key });
    }
  }

  if (toBeDeleted.Delete.Objects.length > 0) {
    const answer = await askQuestion('Are you sure you want to delete these files? (yes/no): ');
    if (answer.toLowerCase() === 'yes') {
      const deleteCommand = new DeleteObjectsCommand(toBeDeleted);
      await s3.send(deleteCommand);
      toBeDeleted.Delete.Objects = [];
      console.log('Files deleted successfully.');
    } else {
      console.log('Deletion canceled.');
    }
  } else {
    console.log('No files to delete.');
  }

  console.log(`Total Size: ${totalSize}`);
}

main();
