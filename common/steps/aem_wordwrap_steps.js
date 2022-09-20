/** wordwrap dexter/steps */
const { Given } = require('@cucumber/cucumber');
const { Then } = require('@cucumber/cucumber');
const { When } = require('@cucumber/cucumber');

Then(/^I click on Dexter element "([^"]*)"$/, clickOnDexterSelector);

Then(/^I check whether "([^"]*)" is wrapped in page$/, verifyWordWrapIsPresent);

Then(/^I check whether "([^"]*)" is reverted in page$/, verifyrevertIsPresent);

Then(/^I check whether "([^"]*)" is unwraped in page$/, verifyunwraped);

/**
 * Step Definition:
 * ```
 * /^I click on Dexter element "([^"]*)" $/
 * ```
 * This will click on any of the valid selector provide
 * @param {selector} selector : provide a valid HTML selector
 */
function clickOnDexterSelector(selector) {
  this.page.waitForDisplayed(selector);
  this.page.click(selector);
}

/**
 * Step Definition:
 * ```
 * /^I check whether "([^"]*)" is wrapped in page$/
 * ```
 * This will verify wordwrap is done at the preview page
 */
function verifyWordWrapIsPresent(text) {
  expect(this.page.jpPreviewWordWrapText(text)).toBeDisplayed();
}

/**
 * Step Definition:
 * ```
 * /^I check whether "([^"]*)" is reverted in page$/
 * ```
 * This will verify wordwrap is revert at the preview page
 */
function verifyrevertIsPresent(text) {
  expect(this.page.jpPreviewrevertText(text)).toBeDisplayed();
}

/**
 * Step Definition:
 * ```
 * /^I check whether "([^"]*)" is wrapped in page$/
 * ```
 * This will verify wordwrap is revert at the preview page
 */

function verifyunwraped(text) {
  expect(this.page.jpunwrapedText(text)).toBeDisplayed();
}
