/* eslint-disable max-len */
/* eslint-disable import/no-import-module-exports */
import { expect } from '@playwright/test';

exports.FedsConsent = class FedsConsent {
  constructor(page) {
    this.page = page;
    this.props = {
      // OneTrust consent component props:
      OneTrustCookie: 'OptanonAlertBoxClosed',
      OneTrustCookies: ['OptanonAlertBoxClosed', 'OptanonConsent', 'OptanonChoice'],
      consent_date: new Date().toISOString(),
      OneTrustCookieGroup: {
        default: ['C0001', 'H41', 'H42', 'H2', 'H1', 'H43', 'H245', 'H28', 'H52', 'H76', 'H271', 'H109'],
        enabled: ['C0001', 'C0002', 'C0003', 'C0004', 'H41', 'H42', 'H2', 'H1', 'H43', 'H245', 'H28',
          'H52', 'H76', 'H271', 'H109', 'H40', 'H99', 'H4', 'H75', 'H48', 'H110', 'H204', 'H76',
          'H40', 'H56', 'H222', 'H7', 'H36', 'H8', 'H128', 'H196', 'H9', 'H10', 'H219', 'H11',
          'H13', 'H14', 'H151', 'H221', 'H218', 'H216', 'H72', 'H37', 'H215', 'H16', 'H245',
          'H17', 'H18', 'H19', 'H20', 'H45', 'H21', 'H46', 'H211', 'H22', 'H92', 'H47', 'H213',
          'H49', 'H209', 'H220', 'H23', 'H24', 'H25', 'H27', 'H50', 'H51', 'H28', 'H268', 'H30',
          'H31', 'H53', 'H32', 'H204', 'H54', 'H210', 'H33', 'H217', 'H76', 'H34', 'H77', 'H35'],
      },
      oneTrustTitle: 'Make It Your Own',
      oneTrustMessage: 'Adobe and its vendors use cookies and similar technologies to improve your experience and measure your interactions with our websites, products and services. We also use them to provide you more relevant information in searches and in ads on this and other sites. If that’s okay, click “Enable all". Clicking “Don’t enable” will set only cookies that are strictly necessary. You can also view our vendors and customize your choices by clicking "Cookie Settings".',
      oneTrustEnableButton: 'Enable all',
      oneTrustCookiesButton: 'Cookie Settings',
    };

    // OneTrust consent selectors:
    this.oneTrustTitle = page.locator('#onetrust-policy-title');
    this.oneTrustMessage = page.locator('#onetrust-policy-text');
    this.oneTrustEnableButton = page.locator('#onetrust-accept-btn-handler');
    this.oneTrustCookiesButton = page.locator('#onetrust-pc-btn-handler');
    this.oneTrustDontEnableButton = page.locator('#onetrust-reject-all-handler');
    this.oneTrustSuccessContainer = page.locator('#ot-cookie-settings');

    // OneTrust modal selectors:
    this.oneTrustContainer = page.locator('#onetrust-banner-sdk');
    this.oneTrustConsentFrame = page.locator('#onetrust-pc-sdk');
    this.oneTrustConfirmChoices = page.locator('button.save-and-close');
    this.oneTrustModalDontEnable = page.locator('button.disable-all-btn');
    this.oneTrustModalEnableAll = page.locator('button.enable-all-btn');
    this.oneTrustModalClose = page.locator('button#close-pc-btn-handler');
  }

  /**
   * Checks the content of the consent component.
   * @param  {none}
   * @return {Promise} PlayWright promise
   */
  async checkOneTrustConsentBar() {
    // Wait for the consent bar to be displayed:
    await this.oneTrustContainer.waitFor({ state: 'visible', timeout: 10000 });
    // Check the contents of the consent bar:
    await expect(this.oneTrustTitle).toHaveText(this.props.oneTrustTitle);
    await expect(this.oneTrustMessage).toHaveText(this.props.oneTrustMessage);
    await expect(this.oneTrustEnableButton).toHaveText(this.props.oneTrustEnableButton);
    await expect(this.oneTrustCookiesButton).toHaveText(this.props.oneTrustCookiesButton);
  }

  /**
   * Checks the Cookie Settings modal.
   * @param  {none}
   * @return {Promise} PlayWright promise
   */
  async checkOneTrustSettingsModal() {
    // Check the 'Customize' modal:
    await this.oneTrustContainer.waitFor({ state: 'visible', timeout: 10000 });
    await this.oneTrustCookiesButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.oneTrustCookiesButton.click();
    // Wait for the opt-out modal to be displayed:
    await expect(this.oneTrustConsentFrame).toBeVisible();
    // Close the opt-out modal & assert result:
    await this.oneTrustModalClose.click();
    await expect(this.oneTrustConsentFrame).not.toBeVisible();
  }

  /**
   * Accept the OneTrust consent component.
   * @param  {none}
   * @return {Promise} PlayWright promise
   */
  async acceptOneTrustConsentBar() {
    // Wait for the consent bar to be displayed:
    await this.oneTrustContainer.waitFor({ state: 'visible', timeout: 10000 });
    // Click on the 'Enable all' button (ACCEPT consent action):
    await this.oneTrustEnableButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.oneTrustEnableButton.click();
    // Wait for the consent bar to disappear:
    await this.oneTrustContainer.waitFor({ state: 'hidden', timeout: 10000 });
  }

  /**
   * Assert the OneTrust consent ACCEPT state.
   * @param  {none}
   * @return {Promise} PlayWright promise
   */
  async assertOneTrustAcceptState() {
    // OneTrust consent shouldn't be prompted after page refresh:
    await this.page.reload();
    // Wait for the page to load & stabilize:
    await this.page.waitForLoadState('domcontentloaded');
    // OneTrust consent shouldn't be prompted after page loads:
    await expect(this.oneTrustContainer).not.toBeVisible();
  }

  /**
   * Assert the OneTrust consent ACCEPT state.
   * @param  {number}  0 | 1 (Not logged-in / Logged-in)
   * @return {Promise} PlayWright promise
   */
  async assertOneTrustCookieGroups(loggedIn = 0) {
    // Retrieve browser object values:
    const fedsConfig = await this.page.evaluate(() => window.fedsConfig);
    const optanonStatus = await this.page.evaluate(() => window.adobePrivacy.hasUserProvidedConsent());
    const activeCookieGroups = await this.page.evaluate(() => window.adobePrivacy.activeCookieGroups());
    // Check retrieved data:
    expect(typeof fedsConfig).toBe('object');
    if (loggedIn === 0) {
      expect(optanonStatus).toBe(false);
      expect(Array.isArray(activeCookieGroups)).toBe(true);
      expect(activeCookieGroups.includes('C0001')).toBe(true);
      expect(activeCookieGroups.includes('C0002')).toBe(false);
      expect(activeCookieGroups.includes('C0003')).toBe(false);
      expect(activeCookieGroups.includes('C0004')).toBe(false);
    } else {
      expect(Array.isArray(activeCookieGroups)).toBe(true);
      expect(optanonStatus).toBe(true);
      expect(activeCookieGroups.includes('C0001')).toBe(true);
      expect(activeCookieGroups.includes('C0002')).toBe(true);
      expect(activeCookieGroups.includes('C0003')).toBe(true);
      expect(activeCookieGroups.includes('C0004')).toBe(true);
    }
  }
};
