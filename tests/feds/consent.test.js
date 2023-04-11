/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
const { expect, test } = require('@playwright/test');
const parse = require('../../libs/parse.js');
const consent = require('../../features/feds/consent.spec.js');
import { FedsConsent } from '../../pages/feds.consent.page';

const { name, features } = parse(consent);
test.describe(`${name}`, () => {
  features.forEach((props) => {
    test(props.title, async ({ page, browser }) => {
      const Consent = new FedsConsent(page);

      // Load OneTrust consent component page:
      // !Note: OneTrust only loads only on GDPR enforced countries.
      //        Forcing the component to load from any geolocation via
      //        the FEDS '?customPrivacyLocation' browser parameter.
      await page.goto(`${props.url}?customPrivacyLocation=de`);
      // Wait for page to load & stabilize:
      await page.waitForLoadState('networkidle');

      // Wait for the OneTrust consent bar to be displayed:
      await page.waitForSelector(Consent.OneTrustContainer);
      await expect(Consent.OneTrustContainer).toBeVisible();

      // Check the contents of the consent bar:
      await Consent.checkOneTrustConsentBar();

      // Check 'Cookie Settings' modal:
      await Consent.checkOneTrustCustomizeModal();

      // // Check FEDS browser objects (pre-consent):
      // let fedsConfig = await page.evaluate(() => { return window.fedsConfig; });
      // let optanonStatus = await page.evaluate(() => { return window.adobePrivacy.hasUserProvidedConsent(); });
      // let activeCookieGroups = await page.evaluate(() => { return window.adobePrivacy.activeCookieGroups(); });

      // expect(typeof fedsConfig).toBe('object');
      // expect(optanonStatus).toBe(false);
      // expect(Array.isArray(activeCookieGroups)).toBe(true);
      // expect(activeCookieGroups.includes('C0001')).toBe(true);
      // expect(activeCookieGroups.includes('C0002')).toBe(false);
      // expect(activeCookieGroups.includes('C0003')).toBe(false);
      // expect(activeCookieGroups.includes('C0004')).toBe(false);

      // // Accept the OneTrust consent banner:
      // await OneTrustEnableButton.click();
      // await expect(OneTrustContainer).not.toBeVisible();
      // await expect(OneTrustSuccessContainer).toBeVisible();

      // // Check consent persistence:
      // await page.reload();
      // await page.waitForLoadState('networkidle');
      // await expect(OneTrustContainer).not.toBeVisible();

      // // Polling 'adobePrivacy' initialization:
      // const adobePrivacy = await page.evaluate(async () => {
      //   let timer = 3000; // 3000ms max wait time
      //   const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      //   while (window.adobePrivacy === undefined && timer > 0) {
      //     await delay(250); timer-=250;
      //   }
      //   return {...(window.adobePrivacy)};
      // });

      // // Check FEDS browser objects (post-consent):
      // fedsConfig = await page.evaluate(() => { return window.fedsConfig; });
      // optanonStatus = await page.evaluate(() => { return window.adobePrivacy.hasUserProvidedConsent(); });
      // activeCookieGroups = await page.evaluate(() => { return window.adobePrivacy.activeCookieGroups(); });

      // expect(typeof fedsConfig).toBe('object');
      // expect(optanonStatus).toBe(true);
      // expect(Array.isArray(activeCookieGroups)).toBe(true);
      // expect(activeCookieGroups.includes('C0001')).toBe(true);
      // expect(activeCookieGroups.includes('C0002')).toBe(true);
      // expect(activeCookieGroups.includes('C0003')).toBe(true);
      // expect(activeCookieGroups.includes('C0004')).toBe(true);
    });
  });
});
