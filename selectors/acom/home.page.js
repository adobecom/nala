export default class AcomHomePage {
    constructor(page) {
      this.page = page;
  
      // Gnav menu locators
      this.helpSupportMenu = page.locator('//*[contains(@daa-ll,"Help_Support")]');
      this.contactUsCTA = page.locator('a[href$="#open-jarvis-chat"]');

      // Jarvis popup chat
      this.jarvisContainer = page.locator('iframe.adbmsgContentIframe');
      
      // // Footer locators
      // this.globalFooter = this.page.locator('.global-footer');
      // this.changeLanguageText = this.globalFooter.locator('.feds-regionPicker-text');
      // this.changeLanguageButton = this.globalFooter.locator('.feds-regionPicker');
      // this.changeLanguageList = this.globalFooter.locator('.fragment p');
      // this.copywright = this.globalFooter.locator('.feds-footer-privacySection');
      // this.privacyLink = this.globalFooter.locator('a.feds-footer-privacyLink').nth(0);
      // this.termsOfUseLink = this.globalFooter.locator('a.feds-footer-privacyLink').nth(1);
      // this.cookiePreferencesLink = this.globalFooter.locator('a.feds-footer-privacyLink').nth(2);
      // this.doNotSellInformationLink = this.globalFooter.locator('a.feds-footer-privacyLink').nth(3);
      // this.adChoicesLink = this.globalFooter.locator('a.feds-footer-privacyLink').nth(4);
    }
  }
  