/** @module common/steps */
const {Given} = require('@cucumber/cucumber');
const {When} = require('@cucumber/cucumber');
const {Then} = require('@cucumber/cucumber');
const fs = require('fs');

Then(/^I save network logs to "([^"]*)"$/, iSaveNetworkLogsToFilename);

Then(/^I save browser console errors to "([^"]*)"$/, iSaveBrowserConsoleErrorsToFilename);

Then(/^I should see "([^"]*)" loading in network logs$/, iShouldSeeLoadingInNetworkLogs);

Then(/^I filter (.+) "([^"]*)" from "([^"]*)" to "([^"]*)"$/, filterPropFromTo);

/**
 * Step Definition:
 * ```
 * /^I save network logs to "([^"]*)"$/
 * ```
 * @param {string} filename Name of file to be saved
 */
function iSaveNetworkLogsToFilename(filename) {
  let entries = [];
  logNetwork.forEach(element => {
    entries.push({
      status: element.status,
      mimeType: element.mimeType,
      url: element.url,
      encodedDataLength: element.encodedDataLength
    });
  });
  fs.writeFileSync(filename, JSON.stringify(entries, null, 2));
}

/**
 * Step Definition:
 * ```
 * /^I save browser console errors to "([^"]*)"$/
 * ```
 * @param {string} filename Name of file to be saved
 */
function iSaveBrowserConsoleErrorsToFilename(filename) {
  let entries = [];
  if (global.logConsole) {
    // Chrome Devtools is enabled
    logConsole.forEach(element => {
      entries.push({
        level: element.level,
        text: element.text,
        url: element.url
      });
    });
  } else {
    // Use Selenium
    entries = browser.getLogs('browser');
  }
  fs.writeFileSync(filename, JSON.stringify(entries, null, 2));
}

/**
 * Step Definition:
 * ```
 * /^I should see "([^"]*)" loading in network logs$/
 * ```
 * @param {string} itemname Name of item in network logs
 */
 function iShouldSeeLoadingInNetworkLogs(itemname) {
  let entries = [];
  logNetwork.forEach(element => {
    entries.push({
      level: element.level,
      text: element.text,
      url: element.url
    });
  });
  console.log(entries);
}

/**
 * Step Definition:
 * ```
 * /^I filter (.+) "([^"]*)" from "([^"]*)" to "([^"]*)"$/
 * ```
 * @param {*} prop prop to be filtered
 * @param {*} value value of the prop
 * @param {*} from source file
 * @param {*} to target file
 */
function filterPropFromTo(prop, value, fromFile, toFile) {
  let data = JSON.parse(fs.readFileSync(fromFile, 'utf8'));
  let results = data.filter(x => x[prop] === value);
  if (toFile.endsWith('.json')) {
    fs.writeFileSync(toFile, JSON.stringify(results, null, 2));
  } else if (toFile.endsWith('.html')) {
    // Convert timestamp field
    if (results.length > 0 && 'timestamp' in results[0]) {
      results.forEach(x => x.timestamp = new Date(parseInt(x.timestamp)).toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }));
    }
    // Convert to a HTML table
    const row = html => `<tr>\n${html}</tr>\n`;
    const heading = object => row(Object.keys(object).reduce((html, heading) => (html + `<th>${heading}</th>`), ''));
    const datarow = object => row(Object.values(object).reduce((html, value) => (html + `<td>${value}</td>`), ''));
    const htmlTable = dataList => `<table>${heading(dataList[0])}${dataList.reduce((html, object) => (html + datarow(object)), '')}</table>`;

    fs.writeFileSync(toFile, htmlTable(results));
  }
  if (results.length > 0) {
    throw `Found ${results.length} ${value} browser console errors`;
  }
}