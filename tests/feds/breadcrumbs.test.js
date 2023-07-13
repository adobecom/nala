/* eslint-disable import/named */
/* eslint-disable no-await-in-loop */
/* eslint-disable import/extensions */
import { expect, test } from '@playwright/test';
import { FedsHeader } from '../../selectors/feds/feds.header.page.js';
import { features } from '../../features/feds/breadcrumbs.spec.js';

test.describe('Breadcrumbs Component test suite', () => {
  // FEDS Breadcrumbs-With-Base Checks:
  test(`${features[0].name}, ${features[0].tags}`, async ({ page, baseURL }) => {
    const Header = new FedsHeader(page);
    console.info(`[FEDSInfo] Checking page: ${baseURL}${features[0].path}`);

    await test.step('Navigate to FEDS Breadcrumbs-With-Base page', async () => {
      await page.goto(`${baseURL}${features[0].path}?hideGeorouting=on`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[0].path}?hideGeorouting=on`);
    });

    await test.step('Check breadcrumbs structure on current page', async () => {
      // Wait for FEDS GNAV to be visible:
      await Header.mainNavContainer.waitFor({ state: 'visible', timeout: 10000 });
      // Check breadcrumbs is displayed:
      await expect(Header.breadcrumbContainer).toBeVisible();
      // Check breadcrumbs structure & content:
      await expect(Header.breadcrumbElems).toHaveCount(4);
      let breadcrumbs = await Header.breadcrumbContainer.textContent();
      breadcrumbs = breadcrumbs.replace(/ /g, '').replace(/(\r\n|\n|\r)/gm, '');
      expect(breadcrumbs).toEqual('HomeProductsPhotoshopEducation');
    });
  });

  // FEDS Breadcrumbs-From-Document checks:
  test(`${features[1].name}, ${features[1].tags}`, async ({ page, baseURL }) => {
    const Header = new FedsHeader(page);
    console.info(`[FEDSInfo] Checking page: ${baseURL}${features[1].path}`);

    await test.step('Navigate to FEDS Breadcrumbs-From-Document page', async () => {
      await page.goto(`${baseURL}${features[1].path}?hideGeorouting=on`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[1].path}?hideGeorouting=on`);
    });

    await test.step('Check breadcrumbs structure on current page', async () => {
      // Wait for FEDS GNAV to be visible:
      await Header.mainNavContainer.waitFor({ state: 'visible', timeout: 10000 });
      // Check breadcrumbs is displayed:
      await expect(Header.breadcrumbContainer).toBeVisible();
      // Check breadcrumbs structure & content:
      await expect(Header.breadcrumbElems).toHaveCount(4);
      let breadcrumbs = await Header.breadcrumbContainer.textContent();
      breadcrumbs = breadcrumbs.replace(/ /g, '').replace(/(\r\n|\n|\r)/gm, '');
      expect(breadcrumbs).toEqual('HomeProductsPhotoshopEducation');
    });
  });

  // FEDS Breadcrumbs-Hidden-Links checks:
  test(`${features[2].name}, ${features[2].tags}`, async ({ page, baseURL }) => {
    const Header = new FedsHeader(page);
    console.info(`[FEDSInfo] Checking page: ${baseURL}${features[2].path}`);

    await test.step('Navigate to FEDS Breadcrumbs-Hidden-Links page', async () => {
      await page.goto(`${baseURL}${features[2].path}?hideGeorouting=on`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[2].path}?hideGeorouting=on`);
    });

    await test.step('Check breadcrumbs structure on current page', async () => {
      // Wait for FEDS GNAV to be visible:
      await Header.mainNavContainer.waitFor({ state: 'visible', timeout: 10000 });
      // Check breadcrumbs is displayed:
      await expect(Header.breadcrumbContainer).toBeVisible();
      // Check breadcrumbs structure & content:
      await expect(Header.breadcrumbElems).toHaveCount(2);
      let breadcrumbs = await Header.breadcrumbContainer.textContent();
      breadcrumbs = breadcrumbs.replace(/ /g, '').replace(/(\r\n|\n|\r)/gm, '');
      expect(breadcrumbs).toEqual('breadcrumbsfeds-breadcrumbs-hidden-links');
    });
  });

  // FEDS Breadcrumbs-No-Hidden-Links checks:
  test(`${features[3].name}, ${features[3].tags}`, async ({ page, baseURL }) => {
    const Header = new FedsHeader(page);
    console.info(`[FEDSInfo] Checking page: ${baseURL}${features[3].path}`);

    await test.step('Navigate to FEDS Breadcrumbs-No-Hidden-Links page', async () => {
      await page.goto(`${baseURL}${features[3].path}?hideGeorouting=on`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[3].path}?hideGeorouting=on`);
    });

    await test.step('Check breadcrumbs structure on current page', async () => {
      // Wait for FEDS GNAV to be visible:
      await Header.mainNavContainer.waitFor({ state: 'visible', timeout: 10000 });
      // Check breadcrumbs is displayed:
      await expect(Header.breadcrumbContainer).toBeVisible();
      // Check breadcrumbs structure & content:
      await expect(Header.breadcrumbElems).toHaveCount(6);
      let breadcrumbs = await Header.breadcrumbContainer.textContent();
      breadcrumbs = breadcrumbs.replace(/ /g, '').replace(/(\r\n|\n|\r)/gm, '');
      expect(breadcrumbs).toEqual('libsfedsdraftsqabreadcrumbsfeds-breadcrumbs-no-hidden-links');
    });
  });
});
