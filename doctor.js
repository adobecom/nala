/**
 * Check and debug a profile.
 * Usage:
 *   node doctor <site> -p <profile>
 * Example:
 *   node doctor dc -p dev-author
 */
'use strict';

const yargs = require('yargs');
const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');
const urljoin = require('url-join');
const axios = require('axios');

async function main() {
  let yargsOpts = yargs
    .parserConfiguration({ 'strip-aliased': true });

  // command line arguments
  let argv = yargsOpts.argv;

  // A site must be specified
  let site = argv._[0];
  if (!site) {
    console.log('Please specify a site directory. e.g. acom');
    process.exit(1);
  }

  // Read profile.yml from the specified site directory
  let profilesPath = path.join(site, 'profiles.yml');
  if (!fs.existsSync(profilesPath)) {
    console.log(`Can't find the file: ${profilesPath}`);
    process.exit(1);
  }

  let fileContents = fs.readFileSync(profilesPath, 'utf8');
  let profiles = yaml.safeLoad(fileContents);
}

main();
