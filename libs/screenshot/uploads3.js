// eslint-disable-next-line import/no-extraneous-dependencies
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const fs = require('fs');
const path = require('path');
const { validatePath } = require('./utils.js');

const S3REGION = 'us-west-1';
const S3ENDPOINT = 'https://s3-sj3.corp.adobe.com';
const S3BUCKET = 'milo';

const s3Upload = async (s3, params) => {
  try {
    const command = new PutObjectCommand(params);
    const response = await s3.send(command);
    return response;
  } catch (err) {
    console.error('Upload error:', err);
    throw err;
  }
};

async function uploadFile(fileName, s3Bucket, s3Path, credentials, s3Key, mimeType) {
  const s3 = new S3Client({
    region: S3REGION,
    endpoint: S3ENDPOINT,
    credentials: {
      accessKeyId: credentials.s3accesskey,
      secretAccessKey: credentials.s3secretkey,
    },
    forcePathStyle: true,
  });

  const baseName = path.basename(fileName);
  const key = path.join(s3Path, s3Key || baseName).replace(/\\/g, '/');

  const fileContent = fs.readFileSync(validatePath(fileName));

  const params = {
    Bucket: s3Bucket,
    Key: key,
    Body: fileContent,
    ContentType: mimeType,
    ACL: 'public-read',
  };

  await s3Upload(s3, params);
}

async function main() {
  const dir = process.argv[2] || 'screenshots/milo';
  const bucket = S3BUCKET;
  const s3Path = '.';

  if (!bucket || !s3Path) {
    console.log('Usage: node uploads3.js <localPath>');
    process.exit(1);
  }

  const resultsPath = path.join(dir, 'results.json');
  const entries = JSON.parse(fs.readFileSync(validatePath(resultsPath)));

  console.log(entries);

  const creds = {
    s3accesskey: process.env.s3accesskey,
    s3secretkey: process.env.s3secretkey,
  };

  const mimeType = 'image/png';

  Object.keys(entries).forEach(async (key) => {
    const entry = entries[key];
    if (Array.isArray(entry)) {
      entry.forEach(async (item) => {
        if (item.a) {
          console.log(item.a);
          await uploadFile(item.a, bucket, s3Path, creds, item.a, mimeType);
        }

        if (item.b) {
          console.log(item.b);
          await uploadFile(item.b, bucket, s3Path, creds, item.b, mimeType);
        }

        if (item.diff) {
          console.log(item.diff);
          await uploadFile(item.diff, bucket, s3Path, creds, item.diff, mimeType);
        }
      });
    } else {
      if (entry.a) {
        console.log(entry.a);
        await uploadFile(entry.a, bucket, s3Path, creds, entry.a, mimeType);
      }

      if (entry.b) {
        console.log(entry.b);
        await uploadFile(entry.b, bucket, s3Path, creds, entry.b, mimeType);
      }

      if (entry.diff) {
        console.log(entry.diff);
        await uploadFile(entry.diff, bucket, s3Path, creds, entry.diff, mimeType);
      }
    }
  });

  console.log('Upload results.json');
  await uploadFile(resultsPath, bucket, s3Path, creds, resultsPath, 'application/json');

  const timestampPath = path.join(dir, 'timestamp.json');

  fs.writeFileSync(
    validatePath(timestampPath, { forWriting: true }),
    JSON.stringify([(new Date()).toLocaleString()], null, 2),
  );

  console.log('Upload timestamp.json');
  await uploadFile(timestampPath, bucket, s3Path, creds, timestampPath, 'application/json');
}

main();
