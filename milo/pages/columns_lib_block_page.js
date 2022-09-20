import { GnavPage } from '../../common/pages/gnav_page';
import { iFocusAndClickTheElement } from '../../common/steps/cct_steps';

/**
 * Page class for Milo Columns Block page
 */
export class ColumnsBlockPage extends GnavPage {
    static selectedColumns;

    /**
     * @type {string}
     * @description URL path
     */
    get urlPath() {
        return '/docs/library/blocks/columns';
    }

    /**
     * @type {object}
     * @description Get the selected/desired Marquee from the Marquee page
     */
    static get getColumns() {
        return this.selectedColumns;
    }

    /**
     * @type {object}
     * @description Get the amount of actions of the selected marquee from the Marquee page
     */
    static get marqueeButtonCount() {
        return this.selectedColumns.$('.action-area').childElementCount();
    }

    /**
     * @type {object}
     * @description Get the amount of icons present within the selected marquee from the Marquee page
     */
    static get marqueeIconCount() {
        return this.selectedColumns.$$('.icon-area picture').length;
    }

    /**
     * @type {object}
     * @description Get the amount of pictures present within the selected marquee from the Marquee page
     */
    static get marqueePicturesCount() {
        return this.selectedColumns.$$('.image picture').length;
    }

    /**
     * @type {object}
     * @description Get the amount of background images present within the selected marquee from the Marquee page
     */
    static get marqueeBackgroundImgCount() {
        return this.selectedColumns.$$('div.background div picture').length;
    }

    /**
     * Click the first action area cta within the selected marquee on the Marquee block page
     */
    static clickCTA() {
        iFocusAndClickTheElement(this.selectedColumns.$('.action-area').$$('<a \>')[0]);
    }

    /**
     * @type {object}
     * @description Get the locator of element where the text passed is equal to the element
     * @param {string} marqueeType marquee class type
     * @param {string} text marquee element text
     */
    marqueeElementTextEquals(marqueeType, text) {
        return $(`//*[@class='${marqueeType}']`).$(`//*[text()='${text}']`);
    }

    /**
     * @type {object}
     * @description Get the locator of element where the text passed is contained in the element.
     * @param {string} marqueeType marquee class type
     * @param {string} text marquee element text
     */
    marqueeElementTextContains(marqueeType, text) {
        return $(`//*[@class='${marqueeType}']`).$(
            `//*[contains(text(),'${text}')]`
        );
    }
}