/** @module common/steps */
const { Given } = require('@cucumber/cucumber');
const { When } = require('@cucumber/cucumber');
const { Then } = require('@cucumber/cucumber');
const urljoin = require('url-join');

Then(/^I send a get request "([^"]*)"$/, iSendAGetRequestUrl);

Then(/^I send a post request "([^"]*)"$/, iSendAPostRequestUrl);

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