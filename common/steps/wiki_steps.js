/** @module common/steps */
const { Given } = require('@cucumber/cucumber');
const { When } = require('@cucumber/cucumber');
const { Then } = require('@cucumber/cucumber');

import getWikiData from '../support/functions/getWikiData';

Then(
  /^I load data from wiki page "([^\"]*)"(| with replacements "([^\"]*)")$/,
  iLoadDataFromWikiPage
);

/**
 * Step Definition:
 * ```
 * /^I load data from wiki page "([^\"]*)"(| with replacements "([^\"]*)")$/
 * ```
 * @param {string} wikiID Wiki article ID
 * @param {string} replacements optional, using ":" for assignment and "," as separator, no space in-between
 * Example of replacements string: "verb-id:verb-word-to-pdf,domainName:acrobat.adobe.com"
 */
function iLoadDataFromWikiPage(wikiID, replacements) {
  if (wikiID !== undefined && wikiID !== '') {
    if (this.page.wikiData === undefined) {
      if (!replacements) {
        console.log('replacements not provided.');
      } else {
        console.log('replacements are:');
        console.log(replacements);
      }
      
      this.page.wikiData = getWikiData(wikiID, replacements);

      console.log("Total Pages in Wiki:" + this.page.wikiData.length);
      console.log(this.page.wikiData);
    }
  }
}
