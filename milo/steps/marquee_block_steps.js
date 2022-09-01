const { Then } = require('cucumber');
const { When } = require('cucumber');
const { And } = require('cucumber');
import { MarqueeBlockPage } from '../pages/marquee_lib_block_page';
import { iFocusAndClickTheElement } from '../../common/steps/cct_steps';

Then(/^I should see the text "([^\"]*)"$/, iSeeText);

And(/^I should see (\d+) buttons$/,iSeeButtonAmount);

And(/^I should see (\d+) icons$/, iSeeIconAmount);

And(/^I should see (\d+) pictures$/, iSeePictureAmount);

And(/^I should see (\d+) background image present$/, iSeeBackgroundPresent);

When(/^I click a cta button$/, iFocusAndClickTheElement);

/**
 * Step Definition:
 * ```
 * /^I should see the text "([^\"]*)"$/
 * ```
 * @param {string} text textual content in marquee
 */
function iSeeText(text) {

}

/**
 * Step Definition:
 * ```
 * /^I should see (\d+) background image present$/
 * ```
 * @param {number} backgroundImgCount the number of background image renditions present in marquee
 */
function iSeeBackgroundPresent(backgroundImgCount) {

}
