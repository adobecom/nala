const fs = require('fs');
const path = require('path');

/**
 * Gets executed after all tests are done. You still have access to all global variables from
 * the test.
 * @param {Number} result 0 - test pass, 1 - test fail
 * @param {Array.<Object>} capabilities list of capabilities details
 * @param {Array.<String>} specs List of spec file paths that ran
 */
function after(result, capabilities, specs) {
  let buildInfoFile = path.join(browser.config.outputDir, 'buildInfo.json');
  if (browser.config.buildInfo) {
    fs.writeFileSync(
      buildInfoFile,
      JSON.stringify(browser.config.buildInfo, null, 2)
    );
  } else if (fs.existsSync(buildInfoFile)) {
    fs.unlinkSync(buildInfoFile);
  }
}

exports.after = after;
