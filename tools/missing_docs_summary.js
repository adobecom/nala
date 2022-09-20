const fs = require('fs');
const yargs = require('yargs');
const path = require('path');
const yaml = require('js-yaml');

const CHECKED_CNT = 'totalChecked';
const MISSED_CNT = 'missingDoc';
const PERCENTAGE = 'completePercentage';

/**
 * Example: node .\tools\missing_docs_summary.js -o ./tools/ -f missing_docs_helpx.json missing_docs_javelin.json
 * Output: percentage_summary.json
 *
 */
function main() {
  let argv = yargs
    .options('files', {
      alias: 'f',
      required: true,
      describe: 'json files input to generate progress summary'
    })
    .options('output', {
      alias: 'o',
      describe: 'output directory'
    })
    .array('files')
    .parserConfiguration({ 'strip-aliased': true }).argv;
  let progressSummary = {};
  progressSummary['Summary'] = [];
  let files = argv.files;
  for (let file of files) {
    let match = file.match(/missing_docs_(.*).json/);
    if (match) {
      console.log(`Adding ${match[1]}!`);
      const jsonContent = yaml.load(fs.readFileSync(file));
      progressSummary['Summary'].push({
        Site: match[1],
        [CHECKED_CNT]: jsonContent[CHECKED_CNT],
        [MISSED_CNT]: jsonContent[MISSED_CNT],
        [PERCENTAGE]: jsonContent[PERCENTAGE]
      });
      // progressSummary[match[1]] = [
      //   jsonContent[MISSED_CNT],
      //   jsonContent[CHECKED_CNT],
      //   jsonContent[PERCENTAGE]
      // ];
    }
  }

  if (argv.output) {
    fs.writeFileSync(
      path.join(argv.output, 'percentage_summary.json'),
      JSON.stringify(progressSummary, null, 2)
    );
  } else {
    fs.writeFileSync(
      'percentage_summary.json',
      JSON.stringify(progressSummary, null, 2)
    );
  }
}
main();
