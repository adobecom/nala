/** @module ec/steps */
const {Given} = require('cucumber');
const {Then} = require('cucumber');
const {When} = require('cucumber');
import { ECHomePage } from '../pages/ec_home_page';

Given(/^I go to Experience Cloud home page$/, iGoToExperienceCloudHomePage);  

/**
 * Step Definition:
 * ```
 * /^I go to Experience Cloud home page$/
 * ```
 */
function iGoToExperienceCloudHomePage() {
  this.page = new ECHomePage();
  this.page.open();
}