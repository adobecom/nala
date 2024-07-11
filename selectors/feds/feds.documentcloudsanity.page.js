// import { expect, test } from '@playwright/test';
import { expect } from '@playwright/test';

export default class doccloudpagessanity {
  constructor(page) {
    this.page = page;

    // Geo model close element
    this.geoRoutingClose = page.locator('.dexter-CloseButton').last();

    // Acrobat MagaManu, Locale Nav elements
    this.adobeBranding = page.locator('.feds-logo').first();
    this.gnavComplete = page.locator('.gnavTopnav');
    this.fedsNav = this.gnavComplete.locator('#feds-topnav').first();
    this.localNav = this.fedsNav.locator('//ul[@daa-lh="localnav"]');
    this.localNavDefaultHeading = page.locator('.feds-navLink-text--default').first();
    this.localnavDefaultDisablFocusNavElement = page.locator('//a[@daa-ll="Adobe_Acrobat-1"]').first();
    this.featuresNavLink = page.locator('feds-navLink-text--default').nth(29);
    this.comparePlansNavLink = page.locator('feds-navLink-text--default').nth(37);
    this.reourcesNavLink = page.locator('feds-navLink-text--default').nth(38);
    this.learnAndHelpNavLink = page.locator('feds-navLink-text--default').nth(39);
    this.freeTrialNavLink = page.locator('feds-navLink-text--default').nth(40);

    // Unav Elements
    this.appSwithcer = page.locator('#unav-app-switcher');
    this.userSignin = page.locator('#unav-profile');

    // Footer links
    this.footerProductsColumn = page.locator('//a[@daa-ll="Products-1" and @role="heading"]');
    this.footerBusinessColumn = page.locator('//a[@daa-ll="For_business-1" and @role="heading"]');
    this.footerECCommunity = page.locator('//a[@daa-ll="Blogs_Community-1" and @role="heading"]');
    this.footerSupportColumn = page.locator('//a[@daa-ll="Support-1" and @tabindex="-1"]');
    this.footerAdobeColumn = page.locator('//a[@daa-ll="Adobe-1" and @tabindex="-1"]');
    this.footerCCLink = page.locator('//a[@class="feds-navLink" and @daa-ll="Creative_Cloud-1"]');
    this.footerECLink = page.locator('//a[@class="feds-navLink" and @daa-ll="What_is_Experience_Cloud-1"]');
    this.footerHelpxLink = page.locator('//a[@class="feds-navLink" and @daa-ll="Help_Center-2"]');
  }

  async CloseGeoModel() {
    console.log('close geo model popup');
    await this.page.waitForTimeout(3000);
    await this.geoRoutingClose.click();
  }

  async ValidateGnav() {
    console.log('validate Gnav Elements');
    await this.page.waitForLoadState('networkidle');
    const elements = [this.adobeBranding, this.gnavComplete, this.fedsNav, this.localNav,
      this.localNavDefaultHeading, this.localnavDefaultDisablFocusNavElement, this.featuresNavLink,
      this.comparePlansNavLink];
    const promises = elements.map(async (element) => { expect(element).toBeTruthy(); });
    await Promise.all(promises);
  }
}
