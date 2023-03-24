/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
const { expect, test } = require('@playwright/test');
const parse = require('../../libs/parse.js');
const consent = require('../../features/feds/consent.spec.js');
const selectors = require('../../selectors/feds/consent.selectors.js');

const { name, features } = parse(consent);
test.describe(`${name}`, () => {
  features.forEach((props) => {
    test(props.title, async ({ page, browser }) => {
      const OneTrustTitle = page.locator(selectors['@OneTrustTitle']);
      const OneTrustMessage = page.locator(selectors['@OneTrustMessage']);
      const OneTrustEnableButton = page.locator(selectors['@OneTrustEnableButton']);
      const OneTrustCookiesButton = page.locator(selectors['@OneTrustCookiesButton']);
      const OneTrustDontEnableButton = page.locator(selectors['@OneTrustDontEnableButton']);
      const OneTrustSuccessContainer = page.locator(selectors['@OneTrustSuccessContainer']);

      const OneTrustContainer = page.locator(selectors['@OneTrustContainer']);
      const OneTrustConsentFrame = page.locator(selectors['@OneTrustConsentFrame']);

      const OneTrustConfirmChoices = page.locator(selectors['@OneTrustConfirmChoices']);
      const OneTrustModalDontEnable = page.locator(selectors['@OneTrustDontEnable']);
      const OneTrustModalEnableAll = page.locator(selectors['@OneTrustEnableAll']);
      const OneTrustModalClose = page.locator(selectors['@OneTrustModalClose']);

      // Load OneTrust consent component page:
      // !Note: OneTrust only loads only on GDPR enforced countries.
      //        Forcing the component to load from any geolocation via
      //        the FEDS '?customPrivacyLocation' browser parameter.
      await page.goto(`${props.url}?customPrivacyLocation=de`);

      // Wait for the OneTrust consent bar to be displayed:
      await page.waitForSelector(selectors['@OneTrustContainer']);
      await expect(OneTrustContainer).toBeVisible();

      // Check the contents of the consent bar:
      await expect(OneTrustTitle).toHaveText('Make It Your Own');
      await expect(OneTrustMessage).toContainText('Adobe and its vendors use cookies and similar technologies to improve your experience and measure your interactions with our websites, products and services.');
      await expect(OneTrustEnableButton).toHaveText('Enable all');
      await expect(OneTrustDontEnableButton).toHaveText('Don\'t Enable');
      await expect(OneTrustCookiesButton).toHaveText('Cookie Settings');

      // Check 'Cookie Preferences' modal:
      await OneTrustCookiesButton.click();
      await expect(OneTrustConsentFrame).toBeVisible();
      await page.waitForSelector(selectors['@OneTrustModalClose']);
      await OneTrustModalClose.click();
      await expect(OneTrustConsentFrame).not.toBeVisible();

      // Check FEDS browser objects (pre-consent):
      let fedsConfig = await page.evaluate(() => { return window.fedsConfig; });
      let optanonStatus = await page.evaluate(() => { return window.adobePrivacy.hasUserProvidedConsent(); });
      let activeCookieGroups = await page.evaluate(() => { return window.adobePrivacy.activeCookieGroups(); });

      expect(typeof fedsConfig).toBe('object');
      expect(optanonStatus).toBe(false);
      expect(Array.isArray(activeCookieGroups)).toBe(true);
      expect(activeCookieGroups.includes('C0001')).toBe(true);
      expect(activeCookieGroups.includes('C0002')).toBe(false);
      expect(activeCookieGroups.includes('C0003')).toBe(false);
      expect(activeCookieGroups.includes('C0004')).toBe(false);

      // Accept the OneTrust consent banner:
      await OneTrustEnableButton.click();
      await expect(OneTrustContainer).not.toBeVisible();
      await expect(OneTrustSuccessContainer).toBeVisible();

      // Check consent persistence:
      await page.reload();
      await page.waitForLoadState('networkidle');
      await expect(OneTrustContainer).not.toBeVisible();

      // Polling 'adobePrivacy' initialization:
      const adobePrivacy = await page.evaluate(async () => {
        let timer = 3000; // 3000ms max wait time
        const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
        while (window.adobePrivacy === undefined && timer > 0) {
          await delay(250); timer-=250;
        }
        return {...(window.adobePrivacy)};
      });

      // Check FEDS browser objects (post-consent):
      fedsConfig = await page.evaluate(() => { return window.fedsConfig; });
      optanonStatus = await page.evaluate(() => { return window.adobePrivacy.hasUserProvidedConsent(); });
      activeCookieGroups = await page.evaluate(() => { return window.adobePrivacy.activeCookieGroups(); });

      expect(typeof fedsConfig).toBe('object');
      expect(optanonStatus).toBe(true);
      expect(Array.isArray(activeCookieGroups)).toBe(true);
      expect(activeCookieGroups.includes('C0001')).toBe(true);
      expect(activeCookieGroups.includes('C0002')).toBe(true);
      expect(activeCookieGroups.includes('C0003')).toBe(true);
      expect(activeCookieGroups.includes('C0004')).toBe(true);
    });
  });
});
