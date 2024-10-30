/* eslint-disable no-plusplus */
import { expect, test } from '@playwright/test';
import { features } from '../../features/express/cards.spec.js';
import Card from '../../selectors/express/cards.page.js';

let card;

test.describe('Cards block testing', () => {
  // before each test block
  test.beforeEach(async ({ page }) => {
    card = new Card(page);
  });

  test(`${features[0].name},${features[0].tags}`, async ({ page, baseURL }) => {
    console.info(`${baseURL}${features[0].path}`);

    await test.step('Got to Cards block test page', async () => {
      await page.goto(`${baseURL}${features[0].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[0].path}`);
      await page.waitForTimeout(3000);
    });
  });
});
