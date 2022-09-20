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
  let jobUsageSummary = {};
  jobUsageSummary['Summary'] = [];
  let file = argv.file;
  let jenkinsServer = '';
  let tempJenkinsServer
  if (file.includes('all')) {
    tempJenkinsServer = file.split(path.sep)[0];
    if(tempJenkinsServer.includes('json')){
      jenkinsServer = tempJenkinsServer.split('.')[0];
    }
    else{
      jenkinsServer = tempJenkinsServer;

    }
    let jsonContent = JSON.parse(fs.readFileSync(file));
    let outdatedCount = getCount(jsonContent, 'Outdated');
    let inUseCount = getCount(jsonContent, 'In Use');
    let notUsedCount = getCount(jsonContent, 'Not Used');
    jobUsageSummary['Summary'].push({
      inUse: inUseCount,
      notUsed: notUsedCount,
      outdated: outdatedCount
    });
  }
  fs.writeFileSync(
    jenkinsServer + '_usage_summary.json',
    JSON.stringify(jobUsageSummary, null, 2)
  );
}

/**
 *
 * @param {json object} jsonData
 * @param {string} value value of the key in json
 * @returns {number}
 */
function getCount(jsonData, value) {
  let count = 0;
  if (Object.keys(jsonData).length != 0) {
    let entriesJenkins = jsonData['entries'];
    for (let j = 0; j < entriesJenkins.length; j++) {
      let entryJenkins = entriesJenkins[j];
      if (entryJenkins.jobInUse != '') {
        if (entryJenkins.jobInUse.includes(value)) {
          count = count + 1;
        }
      }
    }
  }
  return count;
}

main();
