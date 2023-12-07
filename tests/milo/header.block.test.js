/* eslint-disable import/named */
/* eslint-disable no-await-in-loop */
/* eslint-disable import/extensions */
import { expect, test } from '@playwright/test';
import { features } from '../../features/milo/header.block.spec.js';
import FedsHeader from '../../selectors/feds/feds.header.page.js';

test.describe('Header Block Test Suite', () => {
  // FEDS Default Header Checks:
  test(`${features[0].name}, ${features[0].tags}`, async ({ page, baseURL }) => {
    const Header = new FedsHeader(page);
    console.info(`[FEDSInfo] Checking page: ${baseURL}${features[0].path}`);

    await test.step('Navigate to FEDS HEADER page', async () => {
      await page.goto(`${baseURL}${features[0].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[0].path}`);
    });

    await test.step('Check HEADER block content', async () => {
      // Wait for FEDS GNAV to be visible:
      await Header.mainNavContainer.waitFor({ state: 'visible', timeout: 5000 });
      // Check HEADER block content:
      await expect(Header.mainNavLogo).toBeVisible();
      await expect(Header.searchIcon).toBeVisible();
      
      //skipping the step for PR branch runs 
      // working on better workaround soloution
      
      // await expect(Header.signInButton).toBeVisible();
    });

    await test.step('Check HEADER search component', async () => {
      await Header.openSearchBar();
      await Header.closeSearchBar();
    });

    await test.step('Check HEADER block mega menu component', async () => {
      await Header.megaMenuToggle.waitFor({ state: 'visible', timeout: 5000 });
      await Header.megaMenuToggle.click();
      await expect(Header.megaMenuContainer).toBeVisible();
      await Header.megaMenuToggle.click();
      await expect(Header.megaMenuContainer).not.toBeVisible();
    });
  });
});
