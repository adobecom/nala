'use strict';

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const { spawnSync } = require('child_process');
const yargs = require('yargs');

function main() {
  let argv = yargs
    .options({
      config: {
        alias: 'c',
        describe: 'screenshots result collection',
        demandOption: true,
        default: 'results.json'
      },
      envA: {
        alias: 'a',
        describe: 'Environment A',
        demandOption: true,
        default: 'dev02'
      },
      envB: {
        alias: 'b',
        describe: 'Environment B',
        demandOption: true,
        default: 'qa01'
      }
    })
    .parserConfiguration({ 'strip-aliased': true }).argv;

  let entries = JSON.parse(fs.readFileSync(argv.config));

  for (let i = 0; i < entries.length; i++) {
    let entry = entries[i];
    console.log(entry);

    entry.a = "screenshots/" + argv.envA + entry.a.substring(entry.a.indexOf("-"));
    entry.b = "screenshots/" + argv.envB + entry.b.substring(entry.b.indexOf("-"));

    let location = [];
    location.push(entry.location.substring(0, entry.location.indexOf(".") + 1) + argv.envA + entry.location.substring(entry.location.indexOf(".", 13)));
    location.push(entry.location.substring(0, entry.location.indexOf(".") + 1) + argv.envB + entry.location.substring(entry.location.indexOf(".", 13)));

    entry.location = location.join('|');
  }

  fs.writeFileSync('results.json', JSON.stringify(entries, null, 2));
}

main();