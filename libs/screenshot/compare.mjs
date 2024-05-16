// eslint-disable-next-line import/no-extraneous-dependencies, import/extensions
import { getComparator } from 'playwright-core/lib/utils';
import fs from 'fs';
import axios from 'axios';
import path from 'path';

const S3URL = 'https://s3-sj3.corp.adobe.com/milo';

async function downloadImage(url, localPath) {
  const writer = fs.createWriteStream(localPath);

  const res = await axios.get(url, { responseType: 'stream' });

  res.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
}

async function getSavedImages(s3Url, curEntries) {
  const response = await axios.get(`${s3Url}/results.json`);
  const preEntries = response.data;

  if (Object.keys(curEntries).length !== Object.keys(preEntries).length) {
    throw new Error(`Previous one has ${Object.keys(preEntries).length} items, 
    but the current one has ${Object.keys(curEntries).length}`);
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of Object.entries(curEntries)) {
    const entry = value[0];
    if (!entry.b) {
      entry.b = entry.a;
    }

    const basename = path.basename(preEntries[key][0].a);
    entry.a = `${preEntries[key][0].a}`.replace('.png', '-a.png');
    console.log(`Downloading ${s3Url}/${basename}`);
    // eslint-disable-next-line no-await-in-loop
    await downloadImage(`${s3Url}/${basename}`, entry.a);
  }
}

async function main() {
  const localPath = process.argv[2];
  const s3Url = `${S3URL}/${localPath}`;

  if (!localPath || !s3Url) {
    console.log('Usage: node compare.js <localPath>');
    process.exit(1);
  }

  const curEntries = JSON.parse(fs.readFileSync(`${localPath}/results.json`));

  if (s3Url) {
    await getSavedImages(s3Url, curEntries);
  }

  const results = {};

  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of Object.entries(curEntries)) {
    const result = {};
    const entry = value[0];
    console.log(entry);

    const baseImage = fs.readFileSync(entry.a);
    const currImage = fs.readFileSync(entry.b);
    result.order = 1;
    result.a = entry.a;
    result.b = entry.b;
    result.urls = entry.urls;

    const comparator = getComparator('image/png');
    const diffImage = comparator(baseImage, currImage);

    if (diffImage) {
      const diffName = `${entry.b}`.replace('.png', '-diff.png');
      fs.writeFileSync(diffName, diffImage.diff);
      result.diff = diffName;
      console.info('Differences found');
    }
    results[key] = [result];
  }

  fs.writeFileSync(`${localPath}/results.json`, JSON.stringify(results, null, 2));
}

main();
