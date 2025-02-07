import { test, expect } from '@playwright/test';
import { features } from '../../features/feds/prodSanity/cctpagesanity.spec.js';
import CreativeCloudTeamsSanity from '../../selectors/feds/feds.cctpagesanity.page.js';

test.describe('Test Suite for Creative Cloud Business Teams Page Components', () => {
  let cct;

  test.beforeEach(async ({ page }) => {
    cct = new CreativeCloudTeamsSanity(page);
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test(`${features[0].name}, ${features[0].tags}, ${features[0].country}`, async ({ page, baseURL }) => {
    console.info(`[FEDSInfo] Checking Page: ${baseURL}${features[features[0].tcid].path}`);

    const pageURL = `${baseURL}${features[0].path}`;
    await page.goto(pageURL, { waitUntil: 'networkidle' });
    await expect(page).toHaveURL(pageURL);

    await cct.validatingUnavElements();
    await cct.validatingCreativeAndDesignElements();
    await cct.validatingProductElements();
    await cct.validatingResourceElements();
    await cct.validatingContactSales();
    await cct.validatingFooterElements();
  });

  test(`${features[1].name}, ${features[1].tags}, ${features[1].country}`, async ({ page, baseURL }) => {
    console.info(`[FEDSInfo] Checking Page: ${baseURL}${features[features[1].tcid].path}`);

    const pageURL = `${baseURL}${features[1].path}`;
    await page.goto(pageURL, { waitUntil: 'networkidle' });
    await expect(page).toHaveURL(pageURL);

    await cct.closeGeorouting.click();

    await cct.validatingUnavElements();
    await cct.validatingCreativeAndDesignElements();
    await cct.validatingProductElements();
    await cct.validatingResourceElements();
    await cct.validatingContactSales();
    await cct.validatingFooterElements();
  });
});
