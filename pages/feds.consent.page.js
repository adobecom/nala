import { expect } from '@playwright/test';
exports.FedsConsent = class FedsConsent {

  constructor(page) {
    super();
    this.page = page;
    this.props = {
      // OneTrust consent component props:
      OneTrustCookie: 'OptanonAlertBoxClosed',
      OneTrustCookies: ['OptanonAlertBoxClosed', 'OptanonConsent', 'OptanonChoice'],
      consent_date: new Date().toISOString(),
      OneTrustCookieGroup: {
        default: ["C0001", "H41", "H42", "H2", "H1", "H43", "H245", "H28", "H52", "H76", "H271", "H109"],
        enabled: ["C0001", "C0002", "C0003", "C0004", "H41", "H42", "H2", "H1", "H43", "H245", "H28",
                  "H52", "H76", "H271", "H109", "H40", "H99", "H4", "H75", "H48", "H110", "H204", "H76",
                  "H40", "H56", "H222", "H7", "H36", "H8", "H128", "H196", "H9", "H10", "H219", "H11",
                  "H13", "H14", "H151", "H221", "H218", "H216", "H72", "H37", "H215", "H16", "H245",
                  "H17", "H18", "H19", "H20", "H45", "H21", "H46", "H211", "H22", "H92", "H47", "H213",
                  "H49", "H209", "H220", "H23", "H24", "H25", "H27", "H50", "H51", "H28", "H268", "H30",
                  "H31", "H53", "H32", "H204", "H54", "H210", "H33", "H217", "H76", "H34", "H77", "H35"]
      },
      OneTrustTitle: 'Make It Your Own',
      OneTrustMessage: [
        'Adobe and its vendors use cookies and similar technologies to improve your experience and measure your interactions with our websites, products and services. We also use them to provide you more relevant information in searches, and in ads on this and other sites. If that’s okay, click “Enable all.” To limit sharing and view our vendors, click “Customize.” You can change your options at any time.',
        'Adobe and its vendors use cookies and similar technologies to improve your experience and measure your interactions with our websites, products, and services. We also use them to provide you more relevant information in searches, and in ads on this and other sites. If that’s okay, click “Enable all.” To limit sharing and view our vendors, click “Customize.” You can change your options at any time.',
        'Adobe and its vendors use cookies and similar technologies to improve your experience and measure your interactions with our websites, products and services. We also use them to provide you more relevant information in searches and in ads on this and other sites. If that’s okay, click “Enable all". Clicking “Don’t enable” will set only cookies that are strictly necessary. You can also view our vendors and customize your choices by clicking "Cookie Settings".'
      ],
      OneTrustEnableButton: 'Enable all',
      OneTrustCookiesButton: ['Customize', 'Cookie Settings']
    };

    // OneTrust consent selectors:
    this.OneTrustTitle = page.locator('#onetrust-policy-title');
    this.OneTrustMessage = page.locator('#onetrust-policy-text');
    this.OneTrustEnableButton = page.locator('#onetrust-accept-btn-handler');
    this.OneTrustCookiesButton = page.locator('#onetrust-pc-btn-handler');
    this.OneTrustDontEnableButton = page.locator('#onetrust-reject-all-handler');
    this.OneTrustSuccessContainer = page.locator('#ot-cookie-settings');
  
    // OneTrust modal selectors:
    this.OneTrustContainer = page.locator('#onetrust-banner-sdk');
    this.OneTrustConsentFrame = page.locator('#onetrust-pc-sdk');
    this.OneTrustConfirmChoices = page.locator('button.save-and-close');
    this.OneTrustModalDontEnable = page.locator('button.disable-all-btn');
    this.OneTrustModalEnableAll = page.locator('button.enable-all-btn');
    this.OneTrustModalClose = page.locator('button#close-pc-btn-handler');
  }

  // OneTrust-specific methods:
  async checkOneTrustConsentBar() {
    // Wait for the consent bar to be displayed:
    await this.OneTrustContainer.waitFor({state: 'visible', timeout: 10000});
    // Check the contents of the consent bar:
    await expect(this.OneTrustTitle).toHaveText(this.props.OneTrustTitle);
    await expect(this.OneTrustMessage).toHaveText(this.props.OneTrustMessage);
    await expect(this.OneTrustEnableButton).toHaveText(this.props.OneTrustEnableButton);
    await expect(this.OneTrustCookiesButton).toHaveText(this.props.OneTrustCookiesButton);
  }

  async checkOneTrustCustomizeModal() {
    // Check the 'Customize' modal:
    await this.OneTrustContainer.waitFor({state: 'visible', timeout: 10000});
    await this.OneTrustCookiesButton.waitFor({state: 'visible', timeout: 10000});
    await this.OneTrustCookiesButton.click();
    // Wait for the out-out modal to be displayed:
    await expect(this.OneTrustConsentFrame).toBeVisible();
    // Close the out-out modal & assert result:
    await this.OneTrustModalClose.click();
    await expect(this.OneTrustConsentFrame).not.toBeVisible();
  }

  async acceptOneTrustConsentBar() {
    // Wait for the consent bar to be displayed:
    this.OneTrustContainer.waitFor({state: 'visible', timeout: 10000});
    // Click on the 'Enable all' button (ACCEPT consent action):
    this.OneTrustEnableButton.waitFor({state: 'visible', timeout: 10000});
    this.OneTrustEnableButton.click();
    // Wait for the consent bar to disappear:
    this.OneTrustContainer.waitFor({state: 'hidden', timeout: 10000});
  }

  async assertOneTrustAcceptState(nextUrl=baseUrl) {
    // OneTrust consent shouldn't be prompted after page refresh:
    browser.refresh();
    expect(this.OneTrustContainer).not.toBeVisible();
    // Navigate to a different page and assert the same behavior:
    browser.url(nextUrl);
    // Wait for the page to load & stabilize:
    await this.page.waitForLoadState('networkidle');
    // OneTrust consent shouldn't be prompted after page loads:
    expect(this.OneTrustContainer).not.toBeVisible();
  }

  async assertOneTrustAcceptCookies() {
    // Extract OneTrust cookie from current domain (if present):
    const OneTrustCookie = await this.page.context().cookies();
    // Assert OneTrust cookie (existance & content):
    await expect(OneTrustCookie[0].name).toEqual(this.props.OneTrustCookie);
    // Checking if the 'consent_date' property has the proper format:
    const foundConsentDate = (OneTrustCookie[0].value).split('T')[0];
    const propsConsentDate = (this.props.consent_date).split('T')[0];
    // !Note: Minutes & seconds are not taken into consideration!
    //   e.g: From '2019-10-10T11:13:34.781Z' | Only '2019-10-10T11'
    await expect(foundConsentDate).toEqual(propsConsentDate);
  }

  assertOneTrustIgnoreAction() {
    
    // // Navigate to a different Adobe.com page:
    // browser.url(`${browser.options.baseUrl}/products/premiere.html`);
    // // Check OneTrust consent contents:
    // this.checkOneTrustConsentBar();
    // // Navigate to a different Adobe.com page:
    // browser.url(`${browser.options.baseUrl}/products/photoshop-lightroom.html`);
    // // Check OneTrust consent contents:
    // this.checkOneTrustConsentBar();
  }
};
