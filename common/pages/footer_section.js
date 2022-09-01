import localize from '../support/functions/localize';
import { Section } from './section';

/** Class representing a footer of global navigation */
export class Footer extends Section {
  constructor() {
    super();
    this.buildProps({
      adobeLogo: '.feds-breadcrumbs-logo',
      regionPicker: '.feds-regionPicker',
      copyright: '//*[contains(text(),"©")]',
      adChoices: '//*[contains(@daa-ll,"AdChoices-")] | //*[contains(@daa-ll,"ChoixdePub-")]',
      privacy: '//a[contains(@href,"privacy.html") and contains(@class,"feds-navLink")]',
      termOfUse: '//*[contains(@daa-ll,"Terms of Use-") or contains(@daa-ll,"Terms_of_Use-")]',
      facebookLogo: 'a.feds-navLink[href="https://www.facebook.com/adobe"]',
      twitterLogo: 'a.feds-navLink[href="https://twitter.com/Adobe"]',
      instagramLogo: 'a.feds-navLink[href="https://www.instagram.com/adobe/"]',
      linkedinLogo: 'a.feds-navLink[href="https://www.linkedin.com/company/adobe"]',
      adChoicesIframe: '#_evidon-consent-frame',
      iframeClose: '//button[contains(text(), "✖")]',
      menuList: '$$.feds-navList a[role=heading]',
      footerMenuItems: '$$#global-footer .feds-navLink[data-feds-action="none"]'
    });
  }

  /**
   * @type {object}
   * @description GNAV Footer container
   */
  get GnavFooter() { return $('#feds-footernav'); }

  /**
   * @type {object}
   * @description Cookies
   */   
  get cookies() {
    let text = localize("Cookie preferences");
    return $(`//*[text()="${text}"] | //*[@data-feds-action="open-adchoices-modal"]`);
  }
}
