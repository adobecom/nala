/* eslint-disable no-restricted-syntax */
const readline = require('readline');
// eslint-disable-next-line import/no-extraneous-dependencies
const { S3Client, ListObjectsV2Command, DeleteObjectsCommand } = require('@aws-sdk/client-s3');
const { STSClient, GetSessionTokenCommand } = require('@aws-sdk/client-sts');

const S3REGION = 'us-west-2';
const ROLE_ARN = process.env.AWS_ROLE_ARN;
const ROLE_SESSION_NAME = 'S3CleanupSession';

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

async function getTemporaryCredentials() {
  const stsClient = new STSClient({ region: S3REGION });

  const params = {
    RoleArn: ROLE_ARN,
    RoleSessionName: ROLE_SESSION_NAME,
    DurationSeconds: 3600,
  };

  try {
    const command = new GetSessionTokenCommand(params);
    const response = await stsClient.send(command);
    return response.Credentials;
  } catch (err) {
    console.error('Error assuming role:', err);
    throw err;
  }
}

async function main() {
  const bucket = process.argv[2];
  const s3Path = process.argv[3];

  if (!bucket || !s3Path) {
    console.log('Usage: node cleans3.js <bucket> <path>');
    process.exit(1);
  }

  const tempCredentials = await getTemporaryCredentials();

  const s3 = new S3Client({
    region: S3REGION,
    credentials: {
      accessKeyId: tempCredentials.AccessKeyId,
      secretAccessKey: tempCredentials.SecretAccessKey,
      sessionToken: tempCredentials.SessionToken,
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
