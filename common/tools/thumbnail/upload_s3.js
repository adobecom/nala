const fs = require('fs');
const yargs = require('yargs');
const path = require('path');
const { uploadFile } = require('../../../tools/s3_upload_file');

function main() {
  let argv = yargs
    .options({
      dir: {
        alias: 'd',
        demandOption: true,
        default: 'screenshots'
      },
      bucket: {
        alias: 'b',
        demandOption: true,
      },
      path: {
        alias: 'p',
        demandOption: true,
      }   
    })
    .parserConfiguration({ 'strip-aliased': true }).argv;

  let resultsPath = path.join(argv.dir, 'results.json');
  let entries = JSON.parse(fs.readFileSync(resultsPath));

  console.log(entries);

  let creds = {
    s3accesskey: process.env.s3accesskey,
    s3secretkey: process.env.s3secretkey
  }

  let mimeType = 'image/png';

  for (let entry of entries) {
    let key = entry.url.replace('https://', '') + '.png';
    uploadFile(entry.thumbnail, argv.bucket, argv.path, creds, key, mimeType);
  }
}

main();