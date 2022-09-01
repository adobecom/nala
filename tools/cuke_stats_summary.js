const fs = require('fs');
const yargs = require('yargs');
const path = require('path');

function main() {
  let argv = yargs
    .options('file', {
      alias: 'f',
      required: true,
      describe: 'json file input to generate job usage summary'
    })
    .parserConfiguration({ 'strip-aliased': true }).argv;
  let cukeStatsSummary = {};
  cukeStatsSummary['Summary'] = [];
  let file = argv.file;
  let site = '';
  if (file.includes('scenarios.json')) {
    site = file.split('_')[1];
    let jsonContent = JSON.parse(fs.readFileSync(file));
    let result = getTestsSummary(jsonContent);
    let totalTests = result['total'];
    let testsInJenkins = result['inuse'];
    let percentUsed = result['percent'];
    cukeStatsSummary['Summary'].push({
      totalTests: totalTests,
      inUse: testsInJenkins,
      usagePercent: percentUsed
    });
  }
  fs.writeFileSync(
    site + '_stats_summary.json',
    JSON.stringify(cukeStatsSummary, null, 2)
  );
}

/**
 *
 * @param {json object} jsonData
 * @returns {array}
 */
function getTestsSummary(jsonData) {
  let arr = [];
  let inUseCount = 0;
  let totalTests = 0;
  let usePercent = 0;
  if (Object.keys(jsonData).length != 0) {
    let entriesTests = jsonData['scenarios'];
    totalTests = entriesTests.length;
    for (let j = 0; j < entriesTests.length; j++) {
      let entryTest = entriesTests[j];
      if (entryTest.jenkinsJobs != '') {
        inUseCount = inUseCount + 1;
      }
    }
  }
  usePercent = Math.round((inUseCount / totalTests) * 100);
  arr['inuse'] = inUseCount;
  arr['total'] = totalTests;
  arr['percent'] = usePercent+'%';
  return arr;
}

main();
