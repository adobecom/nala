// /* eslint-disable import/named */
// /* eslint-disable no-await-in-loop */
// /* eslint-disable import/extensions */
// import { expect, test } from '@playwright/test';
// import { features } from '../../features/feds/jarvis.spec.js';
// import FedsJarvis from '../../selectors/feds/feds.jarvis.page.js';
// import FedsConsent from '../../selectors/feds/feds.consent.page.js';

// test.describe('Jarvis Component test suite', () => {
//   // Setup viewport to trigger mobile logic:
//   test.use({
//     viewport: {
//       width: 600,
//       height: 1200,
//     },
//   });

//   // FEDS Jarvis Mobile Checks:
//   test(`${features[3].name}, ${features[3].tags}`, async ({ page, baseURL }) => {
//     const Jarvis = new FedsJarvis(page);
//     const Consent = new FedsConsent(page);
//     console.info(`[FEDSInfo] Checking page: ${baseURL}${features[3].path}`);

//     await test.step('Navigate to FEDS Jarvis Default page', async () => {
//       await page.goto(`${baseURL}${features[3].path}?hideGeorouting=on`);
//       await page.waitForLoadState('domcontentloaded');
//       await expect(page).toHaveURL(`${baseURL}${features[3].path}?hideGeorouting=on`);
//     });

//     await test.step('Accept OneTrust consent bar', async () => {
//       // Wait for the OneTrust consent bar to appear:
//       await Consent.oneTrustContainer.waitFor({ state: 'visible', timeout: 15000 });
//       // Accept the OneTrust consent banner:
//       await Consent.acceptOneTrustConsentBar();
//       // Check consent persistence:
//       await Consent.assertOneTrustAcceptState();
//     });

//     await test.step('Check Jarvis component is initialized', async () => {
//       // Wait for Jarvis component to appear:
//       await Jarvis.jarvisButton.waitFor({ state: 'visible', timeout: 15000 });
//       // Open Jarvis chat assistent:
//       await Jarvis.jarvisButton.click();
//       await expect(Jarvis.jarvisContainer).toBeVisible();
//     });
//   });
// });
