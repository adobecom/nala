const exec = require('child_process').exec;
const fs = require('fs');
const path = require('path');

const getMissingSteps = async () => {
  //for acom
  let command_acom =
    "npx cucumber-js 'acom/**/*.feature' --require-module '@babel/register' -r common/steps -r acom/steps  -d --format json:output_acom.json -f progress:progress_acom.txt";
  exec(command_acom, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
  });

  //for dc
  let command_dc =
    "npx cucumber-js 'dc/**/*.feature' --require-module '@babel/register' -r common/steps -r dc/steps  -d --format json:output_dc.json -f progress:progress_dc.txt";
  exec(command_dc, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
  });
};

getMissingSteps();

let sites = ['acom', 'dc'];

const getFailures = async () => {
  let missingSteps = [];
  let JSONpath = path.join(__dirname, '..');
  for (let site of sites) {
    let entries = JSON.parse(
      fs.readFileSync(`${JSONpath}/output_${site}.json`)
    );
    for (let i = 0; i < entries.length; i++) {
      let entry = entries[i].elements;
      for (let j = 0; j < entry.length; j++) {
        let steps = entry[j].steps;
        for (let k = 0; k < steps.length; k++) {
          let missingStep = {};
          let step_result = steps[k].result.status;
          if (step_result == 'undefined' || step_result == 'ambiguous') {
            missingStep.uri = entries[i].uri;
            missingStep.scenarioName = entry[j].name;
            missingStep.stepName = steps[k].name;
            missingStep.result = step_result;
          }
          if (Object.keys(missingStep).length != 0) {
            missingSteps.push(missingStep);
          }
        }
      }
    }
    fs.writeFileSync(
      `${site}_missingSteps.json`,
      JSON.stringify(
        {
          site: site,
          steps: missingSteps
        },
        null,
        2
      )
    );
    missingSteps = [];
  }
};

getFailures();
