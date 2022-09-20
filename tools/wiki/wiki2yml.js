const fs = require('fs');
const yargs = require('yargs');
const yaml = require('js-yaml');
const { AdobeWiki } = require('./adobe_wiki');

async function main() {
  let argv = yargs.options({
    space: {
      alias: 's',
      describe: 'Wiki space',
      default: 'webauto'
    },
    title: {
      alias: 't',
      describe: 'Page title'
    },
    index: {
      alias: 'n',
      describe: 'Index of the table on wiki to be converted',
      default: 0
    },    
    output: {
      alias: 'o',
      describe: 'Output file',
      default: 'output.yml'
    },    
  }).argv;

  let wiki = new AdobeWiki(argv.space);
  let page = await wiki.getPageByTitle(argv.title);
  let body = wiki.getBody(page); 
  let tables = wiki.getElements(body, {name: 'table'});
  let data = wiki.getTableData(tables[argv.index]);

  fs.writeFileSync(argv.output, yaml.dump(data));
}

main();