/** @module common/steps */
const {Given} = require('@cucumber/cucumber');
const {When} = require('@cucumber/cucumber');
const {Then} = require('@cucumber/cucumber');
const urljoin = require('url-join');
const {authorPageGet} = require('../support/functions/sling');

Then(/^I send a get request "([^"]*)"$/, iSendAGetRequestUrl);

Then(/^I send a post request "([^"]*)"$/, iSendAPostRequestUrl);

Then(/^I should see "([^"]*)" in author page property "([^"]*)"$/, iShouldSeeValue);  

/**
 * Step Definition:
 * ```
 * /^I send a get request "([^"]*)"$/
 * ```
 * @param {string} url URL of the request get
 */
function iSendAGetRequestUrl(url) {
  this.response = requestGet(url);
}

/**
 * Step Definition:
 * ```
 * /^I send a post request "([^"]*)"$/
 * ```
 * @param {string} url URL of the request post
 */
function iSendAPostRequestUrl(url) {
  this.response = requestPost(url);
}

/**
 * Step Definition:
 * ```
 * /^I should see "([^"]*)" in author page property "([^"]*)"$/
 * ```
 * @param {string} value Expected value in author page property
 * @param {string} prop Name of the property
 */
function iShouldSeeValue(value, prop) {
  let pagePath = this.page.authorUrlPath;
  if (!pagePath) {
    throw `The page class "${ this.page.constructor.name }" doesn't have "authorUrlPath" property`;
  }
  if (!pagePath.startsWith('http')) {
    pagePath = urljoin(browser.config.profile.authorBaseUrl, pagePath);
  }
  // To do: handle author account
  let actual = authorPageGet(urljoin(pagePath, prop), 'author');
  expect(actual).toBe(value);
}