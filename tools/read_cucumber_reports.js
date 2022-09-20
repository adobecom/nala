const glob = require('glob');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { uploadFile } = require('./s3_upload_file');

async function uploadScreenshots(screenshotDir, cred) {
  let globFiles = path.join(screenshotDir, '**', '*.png');
  screenshots = [];
  for (let f of glob.sync(globFiles)) {
    let filename = path.basename(f);
    let date = new Date().toISOString().split('T')[0];
    let s3Path = path.join(date, uuidv4());
    let res = await uploadFile(f, 'screenshots', s3Path, cred);
    screenshots.push(res.Location);
  }
  return screenshots;
}

async function readCucumberReports(reportDir, screenshotDir, s3cred) {
  let screenshots = null;
  if (screenshotDir && s3cred && s3cred.s3accesskey && s3cred.s3secretkey) {
    screenshots = await uploadScreenshots(screenshotDir, s3cred);
  }
  let reports = path.join(reportDir, '**', '*.json');
  let results = [];
  for (let f of glob.sync(reports)) {
    console.log(`Reading ${f}...`);
    let report = JSON.parse(fs.readFileSync(f, 'utf8'));
    for (let feature of report) {
      let platform = feature.metadata.platform.name;
      for (let scenario of feature.elements) {
        let result = {
          feature: feature.name,
          scenario: scenario.name,
          steps: [],
          elapsed: 0,
          status: 'passed'
        };
        if (screenshots) {
          result.screenshots = screenshots;
        }
        // find Jira ID
        let jid = scenario.tags.find(x => x.name.match(/^@[A-Z]+-\d+$/));
        let descid = scenario.tags.find(x => x.name.match(/^@desc-/));
        if (jid) {
          result.jid = jid.name.slice(1);
        } else {
          console.log('No JIRA id is found in tags');
        }
        if (descid) {
          result.descid = descid.name.slice(1);
        }
        for (let step of scenario.steps) {
          result.steps.push({
            name: `${step.keyword} ${step.name}`,
            status: step.result.status,
            elapsed: step.result.duration / 1000000
          });
          if (result.status === 'passed' && step.result.status != 'passed') {
            result.status = step.result.status;
            if (result.status == 'failed') {
              result.comment = step.result.error_message;
            }
          }
          result.elapsed += step.result.duration / 1000000;
          if (step.keyword === 'Before') {
            if (step.embeddings) {
              let profile = step.embeddings[0].data.profile;
              if (profile.browser) {
                result.browser = profile.browser;
              }
              if (profile.locale === '') {
                profile.locale = 'default';
              }
              if (profile.locale) {
                result.locale = profile.locale;
              }
              if (profile.profile) {
                result.env = profile.profile;
              }
              if (profile.akamaiLocale) {
                result.akamaiLocale = profile.akamaiLocale;
              }
              if (profile.akamaiLocaleAuto) {
                result.akamaiLocale = 'auto';
              }                           
              result.platform = platform;
            }
          }
        }
        results.push(result);
      }
    }
  }
  return results;
}

exports.readCucumberReports = readCucumberReports;
