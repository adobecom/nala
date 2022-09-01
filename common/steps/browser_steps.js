/** @module common/steps */
const { Given } = require('@cucumber/cucumber');
const { When } = require('@cucumber/cucumber');
const { Then } = require('@cucumber/cucumber');

Then(/^I resize the browser width to (\d+)$/, resizeBrowserWidth);

/**
 * Step Definition:
 * ```
 * /^I resize the browser width to (\d+)$/
 * ```
 * @param {string} width Browser width
 */
function resizeBrowserWidth(width) {
  //browser.execute("document.querySelector('html').style.overflowY = 'hidden'");
  width = parseInt(width);
  browser.maximizeWindow();
  let size = browser.getWindowSize();  
  browser.setWindowSize(width, size.height);
}
