const util = require('util');
const readline = require('readline');
const fs = require('fs');
const yargs = require('yargs');
const yaml = require('js-yaml');
const { AdobeWiki } = require('./adobe_wiki');

async function main() {
  let argv = yargs.options({
    title: {
      alias: 't',
      describe: 'Page title'
    },
    index: {
      alias: 'n',
      describe: 'Index of JSON Table macro'
    },    
    input: {
      alias: 'i',
      describe: 'Input JSON file'
    }
  }).argv;

  // verify it's an integer
  argv.index = parseInt(argv.index);

  // open the json as text string
  let jsonRaw = fs.readFileSync(argv.input, 'utf8');

  let wiki = new AdobeWiki('webauto');

  let page = await wiki.getPageByTitle(argv.title);
  let body = wiki.getBody(page);
  let macro = wiki.getElements(body, { macroName: 'json-table' })[argv.index];
  wiki.setMacroTextBody(macro, jsonRaw);

  await wiki.updatePage(page, body);
}

main();