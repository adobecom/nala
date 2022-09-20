import { GnavPage } from '../../common/pages/gnav_page';

/**
 * Page class for Milo Marquee Block page
 */
export class MarqueeBlockPage extends GnavPage {

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
        return $(`//*[@class='${marqueeType}']`);
    }

    /**
     * @type {number}
     * @description Get the amount of actions of the selected marquee from the Marquee page
     * @param {string} marqueeType marquee class type
     */
    getMarqueeButtonCount(marqueeType) {
        if (marqueeType != "marquee inline dark")
            return this.getMarquee(marqueeType).$('.action-area').$$('<a />').length;
        else {
            console.log('The marquee block ' + marqueeType + ' has an expected amount of "0" for cta buttons available so returned length is 0.');
            return 0;
        }
    }

    /**
     * @type {number}
     * @description Get the amount of icons present within the selected marquee from the Marquee page
     * @param {string} marqueeType marquee class type
     */
    getMarqueeIconCount(marqueeType) {
        return this.getMarquee(marqueeType).$$('.icon-area picture').length;
    }

    /**
     * @type {number}
     * @description Get the amount of pictures present within the selected marquee from the Marquee page
     * @param {string} marqueeType marquee class type
     */
    getMarqueePicturesCount(marqueeType) {
        return this.getMarquee(marqueeType).$$('.image picture').length;
    }

    /**
     * @type {number}
     * @description Get the amount of background images present within the selected marquee from the Marquee page
     * @param {string} marqueeType marquee class type
     */
    getMarqueeBackgroundImgCount(marqueeType) {
        return this.getMarquee(marqueeType).$$('div.background div picture').length;
    }

    /**
     * @description Click the first action area cta within the selected marquee on the Marquee block page
     * @param {string} marqueeType marquee class type
     */
    clickCTA(marqueeType) {
        if (marqueeType != "marquee inline dark") {
            let ctaButton = this.getMarquee(marqueeType).$('.action-area').$$('<a />')[0];
            console.log('Found first CTA button "' + ctaButton.getText() + '" in Action Area container and clicked the button.');
            browser.execute('arguments[0].click()', ctaButton);
        } else
            console.log('There is no CTA action-area container for ' + marqueeType);
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