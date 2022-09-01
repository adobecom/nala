'use strict';

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const yargs = require('yargs');

function main() {
  let argv = yargs
    .options({
      config: {
        alias: 'c',
        demandOption: true,
        default: 'results.json'
      }
    })
    .parserConfiguration({ 'strip-aliased': true }).argv;

  let entries = JSON.parse(fs.readFileSync(argv.config));
  let uploadFolder = null;

  for (let i = 0; i < entries.length; i++) {
    let entry = entries[i];

    uploadFolder = path.dirname(entry.a);
    entry.a = path.basename(entry.a);
    if (entry.b) {
      entry.b = path.basename(entry.b);
    }
    if (entry.diff) {
      entry.diff = path.basename(entry.diff);
    }
  }

  fs.writeFileSync(
    path.join(uploadFolder, 'results.json'),
    JSON.stringify(entries, null, 2)
  );
  fs.writeFileSync(
    path.join(uploadFolder, 'results.js'),
    `results='${JSON.stringify(entries)}';`
  );
  fs.copyFileSync(
    path.join(__dirname, 'index.html'),
    path.join(uploadFolder, 'index.html')
  );
  fs.copyFileSync(
    path.join(__dirname, 'index2.html'),
    path.join(uploadFolder, 'index2.html')
  );
}

main();