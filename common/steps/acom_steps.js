/** @module acom/steps */
const { Given } = require('@cucumber/cucumber');
const { Then } = require('@cucumber/cucumber');
const { When } = require('@cucumber/cucumber');
import { GnavPage } from '../pages/gnav_page';

Given(
  /^I go to (Adobe home|Creative Cloud|Creative Cloud for Teams|Creative Cloud plans|Experience Cloud) page$/,
  iGoToDestPage
);

/**
 * Step Definition:
 * ```
 * /^I go to (Adobe home|Creative Cloud|Creative Cloud for Teams|Creative Cloud plans|Experience Cloud) page$/
 * ```
 * @param {string} dest Destination page
 */
function iGoToDestPage(dest) {
  this.page = new GnavPage();
  let path = {
    'Adobe home': '/',
    'Creative Cloud': '/creativecloud.html',
    'Creative Cloud for Teams': '/creativecloud/business/teams.html',
    'Creative Cloud plans': '/creativecloud/plans.html',
    'Experience Cloud': '/experience-platform.html'
  }[dest];
  this.page.open(path);
}
