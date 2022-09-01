/** @module common/steps */
const { Given } = require('@cucumber/cucumber');
const { When } = require('@cucumber/cucumber');
const { Then } = require('@cucumber/cucumber');
import getSitemapData from '../support/functions/getSitemapData';

Then(/^I load data from this sitemap "([^\"]*)"$/, iLoadDataFromSitemap);

Then(/^I verify all floodgate paths from wiki page are not in this sitemap$/, iVerifyAllFloodgatePaths);

/**
 * Step Definition:
 * ```
 * /^I load data from this sitemap "([^\"]*)"$/
 * ```
 * @param {string} path sitemap path
 */
function iLoadDataFromSitemap(path) {
  if (path !== undefined && path !== '') {
    if (this.page.sitemapData === undefined) {
      this.page.sitemapData = getSitemapData(path);

      console.log("Total Pages in Sitemap:" + this.page.sitemapData.length);
      console.log(this.page.sitemapData);
    }
  }
}

/**
 * Step Definition:
 * ```
 * /^I verify all floodgate paths from wiki page are not in this sitemap$/
 * ```
 */
 function iVerifyAllFloodgatePaths() {
    const filteredArray = this.page.sitemapData.filter(value => this.page.wikiData.includes(value));
    console.log(filteredArray);
    expect(filteredArray.length).toEqual(0);
  }
