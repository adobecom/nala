import { Section } from './section';

/** Class representing consent banner component */
export class Consent extends Section {
  /**
   * @type {object}
   * @description Banner
   */
  get banner() {
    return $('div#onetrust-banner-sdk');
  }

  /**
   * @type {object}
   * @description Personalize button on Banner
   */
  get personalize() {
    return $('#onetrust-pc-btn-handler');
  }

  /**
   * @type {object}
   * @description EnableAll button on Banner
   */
  get enableAll() {
    return $('button#onetrust-accept-btn-handler');
  }

  /**
   * @type {object}
   * @description DisableAll on Cookie Settings UI
   */
  get personalizeDisableAll() {
    return $('.disable-all-btn');
  }

  /**
   * @type {object}
   * @description EnableAll on Cookie Settings UI
   */
  get personalizeEnableAll() {
    return $('.enable-all-btn');
  }

  /**
   * @type {object}
   * @description Enable All Cookies without personalization
   */
  get enableAllCookies() {
    return $('#onetrust-accept-btn-handler');
  }

  /**
   * @type {object}
   * @description ConfirmMyChoices on Cookie Settings UI
   */
  get personalizeConfirmMyChoices() {
    return $(
      '.save-and-close.pc-save-and-close.save-preference-btn-handler.onetrust-close-btn-handler'
    );
  }

  /**
   * @type {object}
   * @description General info question fields on Cookie Settings UI
   */
  get personalizeGeneralInfoQuestions() {
    return $$('.ot-general-question');
  }

  /**
   * @type {object}
   * @description General info enable field on Cookie Settings UI
   */
  get personalizeGeneralInfoEnable() {
    return $('.ot-enable-disabled > .ot-enable');
  }

  /**
   * @type {object}
   * @description General info disable field on Cookie Settings UI
   */
  get personalizeGeneralInfoDisable() {
    return $('.ot-enable-disabled > .ot-disable');
  }

  /**
   * @type {object}
   * @description Personalize link on footer
   */
  get personalizeLinkOnFooter() {
    return $("//*[@data-feds-action='open-adchoices-modal']");
  }

  /**
   * @type {object}
   * @description Close button on Toast UI
   */
  get closeSettingsToast() {
    return $('.cs-close');
  }

  /**
   * @type {object}
   * @description ADChoices link on footer
   */
  get adChoicesLinkOnFooter() {
    return $("//*[@daa-ll='AdChoices-5']");
  }

  /**
   * @type {object}
   * @description close button on Cookie Settings UI
   */
  get closeButton() {
    return $('#close-pc-btn-handler');
  }

  /**
   * Get cookie category field on Cookie Settings UI
   * @param {string} number category number
   */
  personalizeCategory(number) {
    return $(`//*[@data-optanongroupid=\'${number}\']`);
  }

  /**
   * Enable cookie category
   * @param {string} number category number
   */
  checkPersonalizeCategoryEnable(number) {
    let elt = $(`//*[@data-optanongroupid='${number}']/div/label`);
    elt.scrollIntoView();
    elt.click();
  }

  /**
   * Click cookie detail button
   * @param {string} number category number
   */
  clickPersonalizeCategoryCookieDetails(number) {
    $(`//*[@data-optanongroupid=\'${number}\']`)
      .$('.category-host-list-btn.category-host-list-handler')
      .click();
  }

  /**
   * Click view cookies button
   * @param {string} number category number
   */
  clickPersonalizeCategoryCookieDetailsViewCookies(number) {
    $('#hosts-list-container > .host-item:first-child').click();
  }
}
