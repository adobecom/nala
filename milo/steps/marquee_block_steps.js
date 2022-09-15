const { Then } = require('@cucumber/cucumber');
const { When } = require('@cucumber/cucumber');
import { MarqueeBlockPage } from '../pages/marquee_lib_block_page';

When(/^I select the marquee "([^\"]*)$/, iSelectMarqueeBlock);

Then(/^I should see the text "([^\"]*)$/, iSeeText);

Then(/^I should see (\d+) buttons$/, iSeeButtonAmount);

Then(/^I should see (\d+) icons$/, iSeeIconAmount);

Then(/^I should see (\d+) pictures$/, iSeePictureAmount);

Then(/^I should see (\d+) background image present$/, iSeeBackgroundPresent);

When(/^I click a cta button$/, iClickCTA);

/**
 * Step Definition
 * `
`` *
/^I select the marquee "([^\"]*)"$/ *
``
`
 * @param {String} className marquee element class name to select
 *
 */
function iSelectMarqueeBlock(className) {
    let marqueeBlock = $(` //*[@class='${className}']`);
    MarqueeBlockPage.setMarquee(marqueeBlock);
    expect(marqueeBlock.isDisplayed()).toBe(true);
}

/**
 * Step Definition:
 * ```
 * /^I should see the text "([^\"]*)$/
 * ```
 * @param {string} text textual content in block
 *
 */
function iSeeText(text) {
    expect(MarqueeBlockPage.getMarquee().getText()).stringContaining(text);
}

/**
 * Step Definition:
 * ```
 * /^I should see (\d+) buttons$/
 * ```
 * @param {number} amount the number of action buttons present in marquee */
function iSeeButtonAmount(amount) {
    expect(MarqueeBlockPage.marqueeButtonCount()).toEqual(amount);
}

/**
 * Step Definition:
 * ```
 * /^I should see (\d+) icons$/
 * ```
 * @param {number} amount the number of icons present in marquee */
function iSeeIconAmount(amount) {
    expect(MarqueeBlockPage.marqueeIconCount()).toEqual(amount);
}

/**
 * Step Definition:
 * ```
 * /^I should see (\d+) pictures$/
 * ```
 * @param {number} amount the number of pictures present in marquee */
function iSeePictureAmount(amount) {
    expect(MarqueeBlockPage.marqueePicturesCount()).toEqual(amount);
}

/**
 * Step Definition:
 * ```
 * /^I should see (\d+) background image present$/
 * ```
 * @param {number} amount the number of background image renditions present in marquee
 */
function iSeeBackgroundPresent(amount) {
    expect(MarqueeBlockPage.marqueeBackgroundImgCount()).toEqual(amount);
}

/**
 * Step Definition:
 * ```
 * /^I click a cta button$/
 * ```
 */
function iClickCTA() {
    MarqueeBlockPage.clickCTA();
}