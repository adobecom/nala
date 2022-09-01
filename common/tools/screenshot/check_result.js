'use strict';

const fs = require('fs');
const yargs = require('yargs');

async function main() {
  let argv = yargs
    .options({
      config: {
        alias: 'j',
        demandOption: true,
        default: 'results.json'
      }
    })
    .parserConfiguration({ 'strip-aliased': true }).argv;

  let entries = JSON.parse(fs.readFileSync(argv.config));
  let exitCode = 0;
  for (let i = 0; i < entries.length; i++) {
    let entry = entries[i];
    console.log(entry);

    if (entry.result == 'FAIL') {
      exitCode = 1;
    }
  }
  console.log('Value of exit code: ' + exitCode);
  process.exit(exitCode);
}

main().catch(error => {
  console.log(error);
  process.exit(1);
});
