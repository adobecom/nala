/** @module common/steps */
const {Given} = require('@cucumber/cucumber');
const {When} = require('@cucumber/cucumber');
const {Then} = require('@cucumber/cucumber');
const execSync = require('child_process').execSync;

const execCommand = async cmd => {
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(stdout);
    });
  });
};

Then(/^I open IE browser console$/, iOpenIeBrowserConsole);

Then(/^I save IE browser console errors to "([^"]*)"$/, iSaveIeBrowserConsoleErrorsToFilename);  

/**
 * Step Definition:
 * ```
 * /^I open IE browser console$/
 * ```
 */
function iOpenIeBrowserConsole() {
  let exitCode = execSync('node common/utils/auto_ie.js --run openConsole');
  if (exitCode != 0) {
    throw 'IE browser console cannot be opened';
  }
}

/**
 * Step Definition:
 * ```
 * /^I save IE browser console errors to "([^"]*)"$/
 * ```
 * @param {string} filename Name of file to be saved
 */
function iSaveIeBrowserConsoleErrorsToFilename(filename) {
  let exitCode = execSync(`node common/utils/auto_ie.js --run getErrors --output ${ filename }`);
  if (exitCode != 0) {
    throw 'IE browser console errors cannot be saved';
  }
}