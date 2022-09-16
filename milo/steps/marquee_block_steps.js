const { Given } = require('@cucumber/cucumber');
const { Then } = require('@cucumber/cucumber');
const { When } = require('@cucumber/cucumber');
import { MarqueeBlockPage } from '../pages/marquee_lib_block_page';

Given(/^I go to "([^\"]*)" marquee block page$/, iGoToMarqueePage);

When(/^I select the marquee "([^\"]*)"$/, iSelectMarqueeBlock);

Then(/^I should see the text "([^\"]*)"$/, iSeeText);

Then(/^I should see "(.+)" buttons$/, iSeeButtonAmount);

Then(/^I should see "(.+)" icons$/, iSeeIconAmount);

Then(/^I should see "(.+)" pictures$/, iSeePictureAmount);

Then(/^I should see "(.+)" background image present$/, iSeeBackgroundPresent);

Then(/^I should see "([^\"]*)" in the current url on the page$/, iSeeUrlInPageUrl);

When(/^I click a cta button$/, iClickCTA);

/**
 * Step Definition:
 * ```
 * /^I go to "([^\"]*)" marquee block page$/
 * ```
 * @param {string} path Path to go to
 */
function iGoToMarqueePage(path) {
    this.page = new MarqueeBlockPage();
    this.page.open(path);
    console.log(browser.getUrl());
}

/**
 * Step Definition
 * ```
 * /^I select the marquee "([^\"]*)"$/
 * ```
 * @param {String} className marquee element class name to select
 */
function iSelectMarqueeBlock(className) {
    expect(this.page.getMarquee(className).isDisplayed()).toBe(true);
}

/**
 * Step Definition:
 * ```
 * /^I should see the text "([^\"]*)"$/
 * ```
 * @param {string} text textual content in block
 */
function iSeeText(text) {
    expect(this.page.selectedMarquee.getText()).stringContaining(text);
}

/**
 * Step Definition:
 * ```
 * /^I should see "(.+)" buttons$/
 * ```
 * @param {number} amount the number of action buttons present in marquee
 */
function iSeeButtonAmount(amount) {
    expect(this.page.marqueeButtonCount()).toEqual(amount);
}

/**
 * Step Definition:
 * ```
 * /^I should see "(.+)" icons$/
 * ```
 * @param {number} amount the number of icons present in marquee
 */
function iSeeIconAmount(amount) {
    expect(this.page.marqueeIconCount()).toEqual(amount);
}

/**
 * Step Definition:
 * ```
 * /^I should see "(.+)" pictures$/
 * ```
 * @param {number} amount the number of pictures present in marquee
 */
function iSeePictureAmount(amount) {
    expect(this.page.marqueePicturesCount()).toEqual(amount);
}

/**
 * Step Definition:
 * ```
 * /^I should see "(.+)" background image present$/
 * ```
 * @param {number} amount the number of background image renditions present in marquee
 */
function iSeeBackgroundPresent(amount) {
    expect(this.page.marqueeBackgroundImgCount()).toEqual(amount);
}

/**
 * Step Definition:
 * ```
 * /^I should see "([^\"]*)" in the current url on the page$/
 * ```
 * @param {string} url Page URL
 */
function iSeeUrlInPageUrl(url) {
    expect(browser).toHaveUrlContaining(url, {
        wait: 10000,
        interval: 1000
    });
}

/**
 * Step Definition:
 * ```
 * /^I click a cta button$/
 * ```
 */
function iClickCTA() {
    this.page.clickCTA();
}