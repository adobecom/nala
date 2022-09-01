const exec = require('child_process').exec;
const fs = require('fs');
const path = require('path');

const getMissingSteps = async () => {
  //for bacom
  let command_bacom =
    "npx cucumber-js 'bacom/**/*.feature' --require-module '@babel/register' -r common/steps -r bacom/steps  -d --format json:output_bacom.json -f progress:progress_bacom.txt";
  exec(command_bacom, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
  });

  //for milo
  let command_milo =
    "npx cucumber-js 'milo/**/*.feature' --require-module '@babel/register' -r common/steps -r milo/steps  -d --format json:output_milo.json -f progress:progress_dc.txt";
  exec(command_milo, (error, stdout, stderr) => {
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

let sites = ['bacom', 'milo'];

const getFailures = async () => {
  let missingSteps = [];
  let JSONpath = path.join(__dirname, '..');
  for (let site of sites) {
    let entries = JSON.parse(
      fs.readFileSync(`${JSONpath}/output_${site}.json`)
    );
    for (const element of entries) {
      let entry = element.elements;
      for (let j = 0; j < entry.length; j++) {
        let steps = entry[j].steps;
        for (let k = 0; k < steps.length; k++) {
          let missingStep = {};
          let step_result = steps[k].result.status;
          if (step_result == 'undefined' || step_result == 'ambiguous') {
            missingStep.uri = element.uri;
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
