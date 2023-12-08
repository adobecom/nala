/* eslint-disable import/named */
/* eslint-disable no-await-in-loop */
/* eslint-disable import/extensions */
import { expect, test } from '@playwright/test';
import { features } from '../../features/feds/promobar.spec.js';
import FedsHeader from '../../selectors/feds/feds.header.page.js';

test.describe('Promobar Block Test Suite', () => {
  // FEDS Default Header Checks:
  test(`${features[0].name}, ${features[0].tags}`, async ({ page, baseURL }) => {
    const Header = new FedsHeader(page);
    const { data } = features[0];
    console.info(`[FEDSInfo] Checking page: ${baseURL}${features[0].path}`);

    await test.step('Navigate to FEDS Promobar page', async () => {
      await page.goto(`${baseURL}${features[0].path}${features[0].browserParams}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[0].path}${features[0].browserParams}`);
    });

    await test.step('Check Promobar block content', async () => {
      // Wait for promobar to be visible:
      await Header.promoBarContainer.waitFor({ state: 'visible', timeout: 5000 });
      // Check promobar content:
      await expect(Header.promoBarBackground).toBeVisible();
      await expect(Header.promoBarForeground).toBeVisible();
      await expect(Header.promoBarContent).toBeVisible();
      await expect(Header.promoBarText).toBeVisible();
      await expect(Header.promoBarBtn).toBeVisible();
      await expect(Header.promoBarBtn).toHaveText(data.promoBarBtn);
      await expect(Header.promoBarText).toHaveText(data.promoBarText);
      // Check promobar action button:
      expect(await Header.promoBarBtn).toHaveAttribute('href', data.promoBarBtnLink);
      await Header.promoBarBtn.click();
      await page.waitForLoadState('domcontentloaded');
      await Header.mainNavContainer.waitFor({ state: 'visible', timeout: 5000 });
      await expect(page).toHaveURL('https://www.adobe.com/');
    });
  });
});
