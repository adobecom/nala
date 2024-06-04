import { expect, test } from '@playwright/test';
import { features } from '../../features/cc/firefly.spec.js';
import FireFly from '../../selectors/cc/firefly.page.js';

let firefly;
test.describe('firefly integration', () => {
  test.beforeEach(async ({ page }) => {
    firefly = new FireFly(page);
  });
  test(`${features[0].name},${features[0].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[0].path}`);
    await test.step('Firefly interactive marquee search via IMS login', async () => {
      await page.goto(`${baseURL}${features[0].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[0].path}`);
    });
    await test.step('search term take use to IMS and post login to FF product page', async () => {
      const searchtext = features[0].term;
      expect(await firefly.searchPromptBox).toBeTruthy();
      expect(await firefly.generateCTA).toBeTruthy();
      await firefly.searchPromptBox.fill(features[0].term);
      await firefly.generateCTA.click();
      await firefly.stage_login(process.env.IMS_EMAIL, process.env.IMS_PASS);
      await expect(page).toHaveURL(/.*firefly/);
      await firefly.promtbar_input(searchtext);
    });
  });

  test(`${features[1].name},${features[1].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[1].path}`);
    await test.step('click generate without search prompt', async () => {
      await page.goto(`${baseURL}${features[1].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[1].path}`);
    });
    await test.step('user hits serach CTA with out search prompt', async () => {
      expect(await firefly.searchPromptBox).toBeTruthy();
      expect(await firefly.generateCTA).toBeTruthy();
      await firefly.generateCTA.click();
      await expect(page).toHaveURL(/.*firefly/);
    });
  });

  test(`${features[2].name},${features[2].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[2].path}`);
    await test.step('click generate without search prompt', async () => {
      await page.goto(`${baseURL}${features[2].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[2].path}`);
    });
    await test.step('user hits serach CTA with out search prompt', async () => {
      expect(await firefly.FFInteractiveCards).toBeTruthy();
      expect(await firefly.FFEntisement).toBeTruthy();
      expect(await firefly.searchPromptBox).toBeTruthy();
      expect(await firefly.promptDefaultText).toBeTruthy();
    });
  });
});
