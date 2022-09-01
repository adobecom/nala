/** @module common/steps */
const {Given} = require('@cucumber/cucumber');
const {When} = require('@cucumber/cucumber');
const {Then} = require('@cucumber/cucumber');
const axios = require('axios').default;
const {requestGet} = require('../support/functions/request_sync');

import { env } from 'yargs';
import localizeProp from '../support/functions/localizeProp';

Then(/^I verify the following locale specific properties on "(.*)" page$/, iVerifyTheFollowingLocaleSpecificPropertiesOnPagePage);

Then(/^I check for existence the following locale specific properties on "(.*)" page$/, iCheckForExistenceTheFollowingLocaleSpecificPropertiesOnPagePage);

Then(/^I verify the following locale specific properties on "(.*)" page exists$/, iVerifyTheFollowingLocaleSpecificPropertiesOnPageExists);

Then(/^I verify the following locale specific properties url for success HTTP status codes on "(.*)" page$/, iVerifyTheFollowingLocaleSpecificPropertiesUrlForSuccessHttpStatusCodesOnPagePage);  

/**
 * Step Definition:
 * ```
 * /^I verify the following locale specific properties on "(.*)" page$/
 * ```
 * @param {string} page Page title
 * @param {string[][]} table Table of properties
 */
function iVerifyTheFollowingLocaleSpecificPropertiesOnPagePage(page, table) {
  for (let row of table.raw()) {
    let seoProp = row[0];
    let seoVal = localizeProp(page, seoProp);
    let url = browser.getUrl()
    switch (seoProp) {
    case 'meta_title':
      expect($('//title').getAttribute('textContent')).toContain(seoVal);
      break;
    case 'meta_description':
      expect($('//meta[@name="description"]').getAttribute('content')).toContain(seoVal);
      break;
    case 'canonical':
      console.log(`Canonical URL: ${ seoVal }`);
      if(url.includes('acrobat/online')){
        expect($('//link[@rel="canonical"]').getAttribute('href')).toContain(seoVal);
      }
      else{
        expect($('//link[@rel="canonical"]').getAttribute('href')).toContain(seoVal.replace('https://www.adobe.com',browser.config.profile.baseUrl));
      }
      break;
    }
  }
}

/**
 * Step Definition:
 * ```
 * /^I check for existence the following locale specific properties on "(.*)" page$/
 * ```
 * @param {string} page Page title
 * @param {string[][]} table Table of properties
 */
function iCheckForExistenceTheFollowingLocaleSpecificPropertiesOnPagePage(page, table) {
  for (let row of table.raw()) {
    let seoProp = row[0];
    switch (seoProp) {
    case 'hreflang':
      expect($('//link[@hreflang]')).toExist();
      break;
    }
  }
}
/**
 * Step Definition:
 * ```
 * Due to the changing metadata a check to see if it exists would be better
 * /^I verify the following locale specific properties on "(.*)" page exists$/
 * ```
 * @param {string} page Page title
 * @param {string[][]} table Table of properties
 */
 function iVerifyTheFollowingLocaleSpecificPropertiesOnPageExists(page, table) {
  for (let row of table.raw()) {
    let seoProp = row[0];
    let seoVal = localizeProp(page, seoProp);
    switch (seoProp) {
    case 'meta_title':
      expect($('//title').getAttribute('textContent')).toExist;
      break;
    case 'meta_description':
      expect($('//meta[@name="description"]').getAttribute('content')).toExist;
      break;
    case 'canonical':
      console.log(`Canonical URL: ${ seoVal }`);
      expect($('//link[@rel="canonical"]').getAttribute('href')).toExist;
      break;
    }
  }
}


/**
 * Step Definition:
 * ```
 * /^I verify the following locale specific properties url for success HTTP status codes on "(.*)" page$/
 * ```
 * @param {string} page Page title
 * @param {string[][]} table Table of properties
 */
function iVerifyTheFollowingLocaleSpecificPropertiesUrlForSuccessHttpStatusCodesOnPagePage(page, table) {
  for (let row of table.raw()) {
    let seoProp = row[0];
    let urlList = [];
    let options = {};
    options.maxRedirects = 0;
    switch (seoProp) {
    case 'hreflang':
      let elements = $$('//link[@hreflang]');
      urlList = elements.map(x => x.getAttribute('href'));
      break;
    }
    urlList.forEach(url => {
      browser.call(() => {
        return axios.get(url, options).catch(error => {
          console.log(`Error HTTP Response for ${ url }`);
          expect(error.response.status).toBe(200);
        });
      });
    });
  }
}