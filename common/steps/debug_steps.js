/** @module common/steps */
const { Given } = require('@cucumber/cucumber');
const { When } = require('@cucumber/cucumber');
const { Then } = require('@cucumber/cucumber');

Then(/^I highlight the element "([^\"]*)"$/, highlightElement);

/**
 * Step Definition:
 * ```
 * /^I highlight the element "([^\"]*)"$/
 * ```
 * @param {string} selector Element selector
 */
function highlightElement(selector) {
  browser.highlightElement(browser.$(selector));
}
