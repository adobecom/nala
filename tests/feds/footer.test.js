import { expect, test } from '@playwright/test';
import Quote from '../../selectors/feds/feds.footer.page.js';

const FooterSpec = require('../../features/feds/footer.spec.js');

const { features } = FooterSpec;

let quote;

test.describe('Footer Block test suite', () => {
  test.beforeEach(async ({ page }) => {
    quote = new Quote(page);
  });

  test(`${features[0].name},${features[0].tags}`, async ({ page, baseURL }) => {
    console.info(`${baseURL}${features[0].path}`);

    await test.step('Go to Quote block test page', async () => {
      await page.goto(`${baseURL}${features[0].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[0].path}`);
    });

    await test.step('Verify Quote block content / specs ', async () => {
      const { data } = features[0];
      expect(await quote.verifyQuote('quote', data)).toBeTruthy();
    });
  });
});
