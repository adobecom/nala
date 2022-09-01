/** @module common/steps */
const {Given} = require('@cucumber/cucumber');
const {Then} = require('@cucumber/cucumber');
const {When} = require('@cucumber/cucumber');

const fs = require('fs');
const axeSource = require('axe-core').source;
const axe = require('axe-core');

Then(/^I check accessibility of the page$/, iCheckAccessibilityOfThePage);

Then(/^I create an accessibility report named "([^\"]*)"$/, iCreateAnAccessibilityReportNamedFilename);  

/**
 * Step Definition:
 * ```
 * /^I check accessibility of the page$/
 * ```
 */
function iCheckAccessibilityOfThePage() {
  browser.execute(axeSource);
  let result = browser.executeAsync(function (done) {
    axe.run({
      runOnly: {
        type: 'tags',
        values: [
          'wcag2a',
          'wcag2aa'
        ]
      }
    }, function (err, result) {
      if (err)
        done(err);
      done(result);
    });
  });
  this.axe = result;
}

/**
 * Step Definition:
 * ```
 * /^I create an accessibility report named "([^\"]*)"$/
 * ```
 * @param {string} filename Output filename of the report
 */
function iCreateAnAccessibilityReportNamedFilename(filename) {
  let report = {};
  for (let v of this.axe.violations) {
    if (!(v.id in report)) {
      report[v.id] = {
        id: v.id,
        impact: v.impact,
        description: v.description,
        help: v.help,
        helpUrl: v.helpUrl,
        tags: v.tags,
        failures: {}
      };
    }
    let entry = report[v.id];
    for (let node of v.nodes) {
      let failureSummary = node.failureSummary;
      if (!(failureSummary in entry.failures)) {
        entry.failures[failureSummary] = new Set();
      }
      let failures = entry.failures[failureSummary];
      failures.add({
        html: node.html,
        target: node.target
      });
    }
  }
  for (let value of Object.values(report)) {
    for (let key of Object.keys(value.failures)) {
      value.failures[key] = [...value.failures[key]];
    }
  }
  report = Object.values(report);
  fs.writeFileSync(filename, JSON.stringify(report, null, 2));
}