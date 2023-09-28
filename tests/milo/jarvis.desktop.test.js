/* eslint-disable import/named */
/* eslint-disable no-await-in-loop */
/* eslint-disable import/extensions */
import { expect, test } from '@playwright/test';
import { features } from '../../features/milo/jarvis.spec.js';
import FedsJarvis from '../../selectors/feds/feds.jarvis.page.js';
import FedsConsent from '../../selectors/feds/feds.consent.page.js';

test.describe('Jarvis Component test suite', () => {
  // FEDS Jarvis Default Checks:
  test(`${features[0].name}, ${features[0].tags}`, async ({ page, baseURL }) => {
    const Jarvis = new FedsJarvis(page);
    const Consent = new FedsConsent(page);
    console.info(`[FEDSInfo] Checking page: ${baseURL}${features[0].path}`);

    await test.step('Navigate to FEDS Jarvis Default page', async () => {
      await page.goto(`${baseURL}${features[0].path}${features[0].browserParams}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[0].path}${features[0].browserParams}`);
    });

    await test.step('Accept OneTrust consent bar', async () => {
      // Wait for the OneTrust consent bar to appear:
      await Consent.oneTrustContainer.waitFor({ state: 'visible', timeout: 15000 });
      // Accept the OneTrust consent banner:
      await Consent.acceptOneTrustConsentBar();
      // Check consent persistence:
      await Consent.assertOneTrustAcceptState();
    });

    await test.step('Check Jarvis component functionality', async () => {
      // Open Jarvis chat assistant (via Jarvis button):
      await Jarvis.openJarvisFromCta();
      // Close Jarvis chat assistant (via Jarvis iframe):
      await Jarvis.closeJarvisFromIframe();
      // Open Jarvis chat assistant (via header button):
      await Jarvis.jarvisHeaderButton.click();
      await expect(Jarvis.jarvisContainer).toBeVisible();
      // Close Jarvis chat assistant (via header button):
      await Jarvis.jarvisHeaderButton.click();
      await expect(Jarvis.jarvisContainer).not.toBeVisible();
    });
  });

  // FEDS Jarvis Desktop Checks:
  test(`${features[1].name}, ${features[1].tags}`, async ({ page, baseURL }) => {
    const Jarvis = new FedsJarvis(page);
    const Consent = new FedsConsent(page);
    console.info(`[FEDSInfo] Checking page: ${baseURL}${features[1].path}`);

    await test.step('Navigate to FEDS Jarvis Desktop page', async () => {
      await page.goto(`${baseURL}${features[1].path}${features[1].browserParams}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[1].path}${features[1].browserParams}`);
    });

    await test.step('Accept OneTrust consent bar', async () => {
      // Wait for the OneTrust consent bar to appear:
      await Consent.oneTrustContainer.waitFor({ state: 'visible', timeout: 15000 });
      // Accept the OneTrust consent banner:
      await Consent.acceptOneTrustConsentBar();
      // Check consent persistence:
      await Consent.assertOneTrustAcceptState();
    });

    await test.step('Check Jarvis component functionality', async () => {
      // Open Jarvis chat assistant (via Jarvis button):
      await Jarvis.openJarvisFromCta();
      // Close Jarvis chat assistant (via Jarvis iframe):
      await Jarvis.closeJarvisFromIframe();
      // Open Jarvis chat assistant (via header button):
      await Jarvis.jarvisHeaderButton.click();
      await expect(Jarvis.jarvisContainer).toBeVisible();
      // Close Jarvis chat assistant (via header button):
      await Jarvis.jarvisHeaderButton.click();
      await expect(Jarvis.jarvisContainer).not.toBeVisible();
    });
  });

  // FEDS Jarvis Disabled Checks:
  test(`${features[2].name}, ${features[2].tags}`, async ({ page, baseURL }) => {
    const Jarvis = new FedsJarvis(page);
    const Consent = new FedsConsent(page);
    console.info(`[FEDSInfo] Checking page: ${baseURL}${features[2].path}`);

    await test.step('Navigate to FEDS Jarvis Disabled page', async () => {
      await page.goto(`${baseURL}${features[2].path}${features[2].browserParams}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[2].path}${features[2].browserParams}`);
    });

    await test.step('Accept OneTrust consent bar', async () => {
      // Wait for the OneTrust consent bar to appear:
      await Consent.oneTrustContainer.waitFor({ state: 'visible', timeout: 15000 });
      // Accept the OneTrust consent banner:
      await Consent.acceptOneTrustConsentBar();
      // Check consent persistence:
      await Consent.assertOneTrustAcceptState();
    });

    await test.step('Check Jarvis component is not initialized', async () => {
      // Check Jarvis component doesn't get initialized:
      await Jarvis.jarvisButton.waitFor({ state: 'hidden', timeout: 15000 });
      await expect(Jarvis.jarvisButton).not.toBeVisible();
    });
  });
});
