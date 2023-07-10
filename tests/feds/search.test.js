/* eslint-disable import/named */
/* eslint-disable no-await-in-loop */
/* eslint-disable import/extensions */
import { expect, test } from '@playwright/test';
import { FedsHeader } from '../../selectors/feds/feds.header.page.js';
import { features } from '../../features/feds/search.spec.js';

test.describe('Search Component test suite', () => {
  // FEDS Search Component Checks:
  test(`${features[0].name}, ${features[0].tags}`, async ({ page, baseURL }) => {
    const Header = new FedsHeader(page);
    console.info(`[FEDSInfo] Checking page: ${baseURL}${features[0].path}`);

    await test.step('Navigate to search component page', async () => {
      await page.goto(`${baseURL}${features[0].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[0].path}`);
    });

    await test.step('Check search component basic functionality', async () => {
      await Header.openSearchBar();
      await Header.closeSearchBar();
    });

    await test.step('Check search component functionality (real search)', async () => {
      await Header.openSearchBar();
      await Header.SearchInput.fill('Adobe Photoshop');
      await expect(Header.SearchResults).toBeVisible();
      await Header.closeSearchBar();
    });

    await test.step('Check search component functionality (bogus search)', async () => {
      await Header.openSearchBar();
      await Header.SearchInput.fill('How much wood could a woodchuck chuck ...');
      // Wait for search results to populate:
      await page.waitForTimeout(1000);
      await expect(Header.AdvancedSearchLink).toBeVisible();
      await Header.closeSearchBar();
    });
  });
});
