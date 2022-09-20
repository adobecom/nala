const { Given } = require('@cucumber/cucumber');
const { Then } = require('@cucumber/cucumber');
const { When } = require('@cucumber/cucumber');
import { MarqueeBlockPage } from '../pages/marquee_lib_block_page';

Given(/^I go to "([^\"]*)" marquee block page$/, iGoToMarqueePage);

When(/^I scroll to the marquee "([^\"]*)"$/, iScrollToMarqueeBlock);

When(/^I click a cta button in marquee "([^\"]*)"$/, iClickCTA);

Then(/^I should see the text "([^\"]*)" in marquee "([^\"]*)"$/, iSeeText);

Then(/^I should see (\d+) buttons in marquee "([^\"]*)"$/, iSeeButtonAmount);

Then(/^I should see (\d+) icons in marquee "([^\"]*)"$/, iSeeIconAmount);

Then(/^I should see (\d+) pictures in marquee "([^\"]*)"$/, iSeePictureAmount);

Then(/^I should see (\d+) background image present in marquee "([^\"]*)"$/, iSeeBackgroundPresent);

Then(/^I should see "([^\"]*)" in the current url on the page$/, iSeeUrlInPageUrl);

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
 * /^I scroll to the marquee "([^\"]*)"$/
 * ```
 * @param {String} className marquee element class name to select
 */
function iScrollToMarqueeBlock(className) {
    const elem = this.page.getMarquee(className);
    browser.pause(2000);
    elem.scrollIntoView();
    expect(elem.isDisplayed()).toBe(true);
}

/**
 * Step Definition:
 * ```
 * /^I should see the text "([^\"]*)" in marquee "([^\"]*)"$/
 * ```
 * @param {string} text textual content in block
 * @param {String} className marquee element class name to select
 */
function iSeeText(text, className) {
    expect(this.page.getMarquee(className).getText().includes(text)).toBe(true);
}

/**
 * Step Definition:
 * ```
 * /^I should see (\d+) buttons in marquee "([^\"]*)"$/
 * ```
 * @param {number} amount the number of action buttons present or expected in marquee
 * @param {String} className marquee element class name to select
 */
function iSeeButtonAmount(amount, className) {
    expect(this.page.getMarqueeButtonCount(className)).toEqual(amount);
}

/**
 * Step Definition:
 * ```
 * /^I should see (\d+) icons in marquee "([^\"]*)"$/
 * ```
 * @param {number} amount the number of icons present in marquee
 * @param {String} className marquee element class name to select
 */
function iSeeIconAmount(amount, className) {
    expect(this.page.getMarqueeIconCount(className)).toEqual(amount);
}

/**
 * Step Definition:
 * ```
 * /^I should see (\d+) pictures in marquee "([^\"]*)"$/
 * ```
 * @param {number} amount the number of pictures present in marquee
 * @param {String} className marquee element class name to select
 */
function iSeePictureAmount(amount, className) {
    expect(this.page.getMarqueePicturesCount(className)).toEqual(amount);
}

/**
 * Step Definition:
 * ```
 * /^I should see (\d+) background image present in marquee "([^\"]*)"$/
 * ```
 * @param {number} amount the number of background image renditions present in marquee
 * @param {String} className marquee element class name to select
 */
function iSeeBackgroundPresent(amount, className) {
    expect(this.page.getMarqueeBackgroundImgCount(className)).toEqual(amount);
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
 * /^I click a cta button in marquee "([^\"]*)"$/
 * @param {String} className marquee element class name to select
 * ```
 */
function iClickCTA(className) {
    this.page.clickCTA(className);
}