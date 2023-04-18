/* eslint-disable import/extensions */
/* eslint-disable import/named */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import { FedsConsent } from '../../selectors/feds/feds.consent.page';

const { expect, test } = require('@playwright/test');
const parse = require('../../libs/parse.js');
const consent = require('../../features/feds/consent.spec.js');

const { name, features } = parse(consent);
test.describe(`${name}`, () => {
  features.forEach((props) => {
    test(props.title, async ({ page }) => {
      const Consent = new FedsConsent(page);

      // Load OneTrust consent component page:
      // !Note: OneTrust only loads only on GDPR enforced countries.
      //        Forcing the component to load from any geolocation via
      //        the FEDS '?customPrivacyLocation' browser parameter.
      await page.goto(`${props.url}?customPrivacyLocation=de`);
      // Wait for page to load & stabilize:
      await page.waitForLoadState('networkidle');

      // Wait for the OneTrust consent bar to be displayed:
      await Consent.OneTrustContainer.waitFor({ state: 'visible', timeout: 15000 });
      await expect(Consent.OneTrustContainer).toBeVisible();

      // Check the contents of the consent bar:
      await Consent.checkOneTrustConsentBar();
      // Check 'Cookie Settings' modal:
      await Consent.checkOneTrustSettingsModal();
      // Check FEDS browser objects (pre-consent):
      await Consent.assertOneTrustCookieGroups(0);

      // Accept the OneTrust consent banner:
      await Consent.acceptOneTrustConsentBar();
      // Check consent persistence:
      await Consent.assertOneTrustAcceptState();
      // Polling 'adobePrivacy' initialization:
      const adobePrivacy = await page.evaluate(async () => {
        let timer = 3000; // 3000ms max wait time
        const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
        while (window.adobePrivacy === undefined && timer > 0) {
          await delay(250); timer -= 250;
        }
        return { ...(window.adobePrivacy) };
      });
      // Check FEDS browser objects (post-consent):
      await Consent.assertOneTrustCookieGroups(1);
    });
  });
});
