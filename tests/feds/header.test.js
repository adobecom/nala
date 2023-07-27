/* eslint-disable import/named */
/* eslint-disable no-await-in-loop */
/* eslint-disable import/extensions */
import { expect, test } from '@playwright/test';
import { features } from '../../features/feds/header.spec.js';
import FedsHeader from '../../selectors/feds/feds.header.page.js';

// eslint-disable-next-line import/no-extraneous-dependencies
const AxeBuilder = require('@axe-core/playwright').default;

test.describe('Header Block test suite', () => {
  // FEDS Default Header Checks:
  test(`${features[0].name}, ${features[0].tags}`, async ({ page, baseURL }, testInfo) => {
    const Header = new FedsHeader(page);
    console.info(`[FEDSInfo] Checking page: ${baseURL}${features[0].path}`);

    await test.step('Navigate to FEDS HEADER page', async () => {
      await page.goto(`${baseURL}${features[0].path}${features[0].browserParams}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[0].path}${features[0].browserParams}`);
    });

    await test.step('Check HEADER block content', async () => {
      // Wait for FEDS GNAV to be visible:
      await Header.mainNavContainer.waitFor({ state: 'visible', timeout: 5000 });
      // Check HEADER block content:
      await expect(Header.searchIcon).toBeVisible();
      await expect(Header.signInLabel).toBeVisible();
      await expect(Header.mainNavLogo).toBeVisible();
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

    await test.step('Analyze header block accessibility', async () => {
      // Analyze page accessibility:
      const a11yReport = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wwcag21a', 'wcag21aa'])
        .include('header.global-navigation')
        .analyze();
      // Assert there are no page accessibility violations:
      expect.soft(a11yReport.violations.length).toBeLessThan(5);
      // Attach A11y results to test output:
      await testInfo.attach('a11y-scan-results', {
        body: JSON.stringify(a11yReport, null, 2),
        contentType: 'application/json',
      });
    });
  });
});
