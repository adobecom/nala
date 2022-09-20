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
      describe: 'Index of CSV Table macro'
    },
    input: {
      alias: 'i',
      describe: 'Input CSV file'
    },
    body: {
      alias: 'b',
      describe: 'Input text'
    }
  }).argv;

  // verify it's an integer
  argv.index = parseInt(argv.index);

  let textBody = '';
  if (argv.input) {
    textBody = fs.readFileSync(argv.input, 'utf8');
  } else if (argv.body) {
    if (argv.body.includes('?TIMESTAMP?')) {
      argv.text = argv.body.replace('?TIMESTAMP?', new Date().toLocaleString());
    }
    textBody = argv.text;
  }

  let wiki = new AdobeWiki('webauto');

  let page = await wiki.getPageByTitle(argv.title);
  let body = wiki.getBody(page);
  let macro = wiki.getElements(body, { macroName: 'csv' })[argv.index];
  wiki.setMacroTextBody(macro, textBody);

  await wiki.updatePage(page, body);
}

main();
