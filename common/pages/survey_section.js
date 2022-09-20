import { Section } from './section';

/** Class representing survey pop-up element */
export class Survey extends Section {
  /**
   * @type {object}
   * @description Banner
   */
  get surveyPopup() {
    return $('iframe[data-src^="https://survey.adobe.com"]');
  }

  /**
   * @type {object}
   * @description Radio button choice for "No, thanks"
   */
   get choiceNo() {
    return $('#QID1-2-label');
  }

    /**
   * @type {object}
   * @description Close button
   */
   get closeSurvey() {
      return $('[src$="siteintercept/svg-close-btn-black-7.svg"]');
    }

}
