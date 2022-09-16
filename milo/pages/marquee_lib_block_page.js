import { GnavPage } from '../../common/pages/gnav_page';
import { iFocusAndClickTheElement } from '../../common/steps/cct_steps';

/**
 * Page class for Milo Marquee Block page
 */
export class MarqueeBlockPage extends GnavPage {
    static selectedMarquee;

    /**
     * @type {string}
     * @description URL path
     */
    get urlPath() {
        return '/docs/library/blocks/marquee';
    }

    /**
     * @type {object}
     * @description Get the selected/desired Marquee from the Marquee page
     * @param {string} marqueeType marquee class type
     */
    getMarquee(marqueeType) {
        this.selectedMarquee = $(`//*[@class='${marqueeType}']`);
        return this.selectedMarquee;
    }

    /**
     * @type {object}
     * @description Get the amount of actions of the selected marquee from the Marquee page
     */
    getMarqueeButtonCount() {
        return this.selectedMarquee.$('.action-area').childElementCount();
    }

    /**
     * @type {object}
     * @description Get the amount of icons present within the selected marquee from the Marquee page
     */
    getMarqueeIconCount() {
        return this.selectedMarquee.$$('.icon-area picture').length;
    }

    /**
     * @type {object}
     * @description Get the amount of pictures present within the selected marquee from the Marquee page
     */
    getMarqueePicturesCount() {
        return this.selectedMarquee.$$('.image picture').length;
    }

    /**
     * @type {object}
     * @description Get the amount of background images present within the selected marquee from the Marquee page
     */
    getMarqueeBackgroundImgCount() {
        return this.selectedMarquee.$$('div.background div picture').length;
    }

    /**
     * @description Click the first action area cta within the selected marquee on the Marquee block page
     */
    clickCTA() {
        iFocusAndClickTheElement(
            this.selectedMarquee.$('.action-area').$$('<a />')[0]
        );
    }

    /**
     * @type {object}
     * @description Get the locator of element where the text passed is equal to the element
     * @param {string} marqueeType marquee class type
     * @param {string} text marquee element text
     */
    getMarqueeElementTextEquals(marqueeType, text) {
        return $(`//*[@class='${marqueeType}']`).$(`//*[text()='${text}']`);
    }

    /**
     * @type {object}
     * @description Get the locator of element where the text passed is contained in the element.
     * @param {string} marqueeType marquee class type
     * @param {string} text marquee element text
     */
    getMarqueeElementTextContains(marqueeType, text) {
        return $(`//*[@class='${marqueeType}']`).$(
            `//*[contains(text(),'${text}')]`
        );
    }
}