import { expect } from '@playwright/test';
import { FedsPage } from './feds.page';
exports.FedsConsent = class FedsConsent extends FedsPage {

  constructor(page) {
    super();
    this.page = page;

    // OneTrust consent selectors:
    this.OneTrustTitle = page.locator('#onetrust-policy-title');
    this.OneTrustMessage = page.locator('#onetrust-policy-text');
    this.OneTrustEnableButton = page.locator('#onetrust-accept-btn-handler');
    this.OneTrustCustomizeButton = page.locator('#onetrust-pc-btn-handler');
    this.OneTrustDontEnableButton = page.locator('#onetrust-reject-all-handler');

    // OneTrust container selectors:
    this.OneTrustContainer = page.locator('#onetrust-banner-sdk');
    this.OneTrustConsentFrame = page.locator('#onetrust-pc-sdk');
    this.OneTrustConfirmChoices = page.locator('button.save-and-close');
    this.OneTrustDontEnable = page.locator('button.disable-all-btn');
    this.OneTrustEnableAll = page.locator('button.enable-all-btn');
  }

    // >> FEDS Consent methods declared here <<
};
