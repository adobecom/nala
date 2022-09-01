/**
 * Gets executed before test execution begins. At this point you can access to all global
 * variables like `browser`. It is the perfect place to define custom commands.
 * @param {Array.<Object>} capabilities list of capabilities details
 * @param {Array.<String>} specs        List of spec file paths that are to be run
 * @param {Object}         browser      instance of created browser/device session
 */
function before(capabilities, specs, browser) {
  console.log(JSON.stringify(browser.capabilities, null, 2));

  global.devTools = new Set();
  global.testCount = 0;
  global.globalTimeout = 10000;

  if (process.env.browser === 'chrome' && process.env.devtools && process.env.devtools != 'false') {
    let tools = process.env.devtools.split(',');
    tools.forEach(tool => {
      devTools.add(tool);
    });
  }
}

exports.before = before;
