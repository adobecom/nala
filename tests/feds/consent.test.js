/* eslint-disable import/named */
/* eslint-disable no-await-in-loop */
/* eslint-disable import/extensions */
import { expect, test } from '@playwright/test';
import { features } from '../../features/feds/consent.spec.js';
import FedsConsent from '../../selectors/feds/feds.consent.page.js';

test.describe('Consent Component test suite', () => {
  // FEDS Consent Component Checks:
  test(`${features[0].name}, ${features[0].tags}`, async ({ page, baseURL }) => {
    const Consent = new FedsConsent(page);
    console.info(`[FEDSInfo] Checking page: ${baseURL}${features[0].path}`);

    await test.step('Navigate to FEDS consent component page', async () => {
      // !Note: Forcing consent to load on GDPR-enforced country.
      // Load OneTrust consent component page:
      await page.goto(`${baseURL}${features[0].path}${features[0].browserParams}`);
      // Wait for page to load & stabilize:
      await page.waitForLoadState('networkidle');
      await expect(page).toHaveURL(`${baseURL}${features[0].path}${features[0].browserParams}`);
      // Wait for the OneTrust consent bar to appear:
      await Consent.oneTrustContainer.waitFor({ state: 'visible', timeout: 15000 });
      await expect(Consent.oneTrustContainer).toBeVisible();
    });

    await test.step('Check consent component integrity', async () => {
      // Check the contents of the consent bar:
      await Consent.checkOneTrustConsentBar();
    });

    await test.step('Check consent persistence (pre-consent)', async () => {
      await page.reload();
      await page.waitForLoadState('domcontentloaded');
      // Wait for the OneTrust consent bar to reappear:
      await Consent.oneTrustContainer.waitFor({ state: 'visible', timeout: 15000 });
      await expect(Consent.oneTrustContainer).toBeVisible();
    });

    await test.step('Check consent Cookie Settings modal', async () => {
      // Check 'Cookie Settings' modal:
      await Consent.checkOneTrustSettingsModal();
    });

    await test.step('Check consent cookie-groups (pre-consent)', async () => {
      // Check FEDS browser objects (pre-consent):
      await Consent.assertOneTrustCookieGroups(0);
    });

    await test.step('Check consent persistence (post-consent)', async () => {
      // Accept the OneTrust consent banner:
      await Consent.acceptOneTrustConsentBar();
      // Check consent persistence:
      await Consent.assertOneTrustAcceptState();
    });

    await test.step('Check consent cookie-groups (post-consent)', async () => {
      // Polling 'adobePrivacy' initialization:
      await page.evaluate(async () => {
        let timer = 5000; // 5000ms max wait time
        // eslint-disable-next-line no-promise-executor-return
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
