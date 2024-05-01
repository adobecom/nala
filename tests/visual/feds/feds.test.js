/* eslint-disable import/named */
import { expect, test } from '@playwright/test';
import { features } from '../../../features/visual/feds/feds.spec.js';
import { takeOne } from '../../../libs/visualutil.js';
import FedsHeader from '../../../selectors/feds/feds.header.page.js';

const folderPath = 'screenshots/feds';
let Header;

test.describe('Feds blocks visual comparison test suite', () => {
  test.beforeEach(async ({ page }) => {
    Header = new FedsHeader(page);
  });

  test(`${features[0].name}, ${features[0].tags}`, async ({ page, baseURL }, testInfo) => {
    const result = await takeOne(
      page,
      baseURL + features[0].path + features[0].browserParams,
      async () => {
        await page.waitForLoadState('domcontentloaded');
        await Header.megaMenuToggle.waitFor({ state: 'visible', timeout: 5000 });
        await Header.megaMenuToggle.click();
        await expect(Header.megaMenuContainer).toBeVisible();
      },
      folderPath,
      `${features[0].name}-${testInfo.project.name}`,
      false,
    );

    console.log(result);
  });

  test(`${features[1].name}, ${features[1].tags}`, async ({ page, baseURL }, testInfo) => {
    const result = await takeOne(
      page,
      baseURL + features[1].path + features[1].browserParams,
      async () => { await page.waitForSelector('.feds-footer-privacyLink'); },
      folderPath,
      `${features[1].name}-${testInfo.project.name}`,
      true,
    );

    console.log(result);
  });
});
