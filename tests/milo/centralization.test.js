/* eslint-disable import/named */
/* eslint-disable no-await-in-loop */
/* eslint-disable import/extensions */
import { expect, test } from '@playwright/test';
import { features } from '../../features/milo/centralization.spec.js';
import FedsHeader from '../../selectors/feds/feds.header.page.js';
import FedsFooter from '../../selectors/feds/feds.footer.page.js';

test.describe('Centralization Feature Test Suite', () => {
  // Page with centralized HEADER & FOOTER blocks:
  test(`${features[0].name}, ${features[0].tags}`, async ({ page, baseURL }) => {
    const Header = new FedsHeader(page);
    const Footer = new FedsFooter(page);
    console.info(`[FEDSInfo] Checking page: ${baseURL}${features[0].path}${features[0].browserParams}`);

    await test.step('Navigate to FEDS HEADER page', async () => {
      await page.goto(`${baseURL}${features[0].path}${features[0].browserParams}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[0].path}${features[0].browserParams}`);
    });

    await test.step('Check HEADER block content', async () => {
      // Wait for FEDS GNAV to be visible:
      await Header.mainNavContainer.waitFor({ state: 'visible', timeout: 5000 });
      // Check HEADER block content:
      await expect(Header.mainNavLogo).toBeVisible();
      await expect(Header.signInButton).toBeVisible();
    });

    await test.step('Check FOOTER block content', async () => {
      // Scroll FEDS Footer into viewport:
      await Footer.legalContainer.scrollIntoViewIfNeeded();
      // Wait for FEDS Footer to be visible:
      await Footer.footerContainer.waitFor({ state: 'visible', timeout: 5000 });
      // Check FEDS Footer critical elements:
      await expect(Footer.legalContainer).toBeVisible();
      await expect(Footer.socialContainer).toBeVisible();
      await expect(Footer.footerContainer).toBeVisible();
      await expect(Footer.changeRegionContainer).toBeVisible();
      // !Note: Footer featuredProducts not appearing in NALA. Possible BUG!
      expect(Footer.featuredProductsContainer).toBeVisible();
      await expect(Footer.footerColumns).toHaveCount(5);
      expect([4, 6, 9].includes(await Footer.footerSections.count())).toBeTruthy();
      expect([4, 6, 9].includes(await Footer.footerHeadings.count())).toBeTruthy();
      await expect(Footer.socialIcons).toHaveCount(4);
      await expect(Footer.legalLinks).toHaveCount(5);
    });

    await test.step('Check ChangeRegion functionality', async () => {
      await Footer.changeRegionButton.click();
      await expect(Footer.changeRegionModal).toBeVisible();
      await Footer.changeRegionCloseButton.click();
      await expect(Footer.changeRegionModal).not.toBeVisible();
    });

    await test.step('Check HEADER search component', async () => {
      const isSearchIconVisible = await Header.searchIcon.isVisible();
      if (isSearchIconVisible) {
        await test.step('Check HEADER search component', async () => {
          await Header.openSearchBar();
          await Header.closeSearchBar();
        });
      } else {
        console.info('[Info] Search icon is not visible. Skipping the search component test.');
      }
    });

    await test.step('Check HEADER block mega menu component', async () => {
      await Header.megaMenuToggle.waitFor({ state: 'visible', timeout: 5000 });
      await Header.megaMenuToggle.click();
      await expect(Header.megaMenuContainer).toBeVisible();
      await Header.megaMenuToggle.click();
      await expect(Header.megaMenuContainer).not.toBeVisible();
    });
  });

  // Page with non-centralized HEADER & FOOTER, but centralized Mega-Menu:
  test(`${features[1].name}, ${features[1].tags}`, async ({ page, baseURL }) => {
    const Header = new FedsHeader(page);
    const Footer = new FedsFooter(page);
    console.info(`[FEDSInfo] Checking page: ${baseURL}${features[1].path}${features[1].browserParams}`);

    await test.step('Navigate to FEDS HEADER page', async () => {
      await page.goto(`${baseURL}${features[1].path}${features[1].browserParams}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[1].path}${features[1].browserParams}`);
    });

    await test.step('Check HEADER block content', async () => {
      // Wait for FEDS GNAV to be visible:
      await Header.mainNavContainer.waitFor({ state: 'visible', timeout: 5000 });
      // Check HEADER block content:
      await expect(Header.mainNavLogo).toBeVisible();
      await expect(Header.signInButton).toBeVisible();
    });

    await test.step('Check FOOTER block content', async () => {
      // Scroll FEDS Footer into viewport:
      await Footer.legalContainer.scrollIntoViewIfNeeded();
      // Wait for FEDS Footer to be visible:
      await Footer.footerContainer.waitFor({ state: 'visible', timeout: 5000 });
      // Check FEDS Footer critical elements:
      await expect(Footer.legalContainer).toBeVisible();
      await expect(Footer.socialContainer).toBeVisible();
      await expect(Footer.footerContainer).toBeVisible();
      await expect(Footer.changeRegionContainer).toBeVisible();
      // !Note: Footer featuredProducts not appearing in NALA. Possible BUG!
      expect(Footer.featuredProductsContainer).toBeVisible();
      await expect(Footer.footerColumns).toHaveCount(5);
      expect([4, 6, 9].includes(await Footer.footerSections.count())).toBeTruthy();
      expect([4, 6, 9].includes(await Footer.footerHeadings.count())).toBeTruthy();
      await expect(Footer.socialIcons).toHaveCount(4);
      await expect(Footer.legalLinks).toHaveCount(5);
    });

    await test.step('Check ChangeRegion functionality', async () => {
      await Footer.changeRegionButton.click();
      await expect(Footer.changeRegionModal).toBeVisible();
      await Footer.changeRegionCloseButton.click();
      await expect(Footer.changeRegionModal).not.toBeVisible();
    });

    await test.step('Check HEADER search component', async () => {
      const isSearchIconVisible = await Header.searchIcon.isVisible();
      if (isSearchIconVisible) {
        await test.step('Check HEADER search component', async () => {
          await Header.openSearchBar();
          await Header.closeSearchBar();
        });
      } else {
        console.info('[Info] Search icon is not visible. Skipping the search component test.');
      }
    });

    await test.step('Check HEADER block mega menu component', async () => {
      await Header.megaMenuToggle.waitFor({ state: 'visible', timeout: 5000 });
      await Header.megaMenuToggle.click();
      await expect(Header.megaMenuContainer).toBeVisible();
      await Header.megaMenuToggle.click();
      await expect(Header.megaMenuContainer).not.toBeVisible();
    });
  });

  // Page with non-centralized HEADER & FOOTER, but centralized drop-downs:
  test(`${features[2].name}, ${features[2].tags}`, async ({ page, baseURL }) => {
    const Header = new FedsHeader(page);
    const Footer = new FedsFooter(page);
    console.info(`[FEDSInfo] Checking page: ${baseURL}${features[2].path}${features[2].browserParams}`);

    await test.step('Navigate to FEDS HEADER page', async () => {
      await page.goto(`${baseURL}${features[2].path}${features[2].browserParams}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[2].path}${features[2].browserParams}`);
    });

    await test.step('Check HEADER block content', async () => {
      // Wait for FEDS GNAV to be visible:
      await Header.mainNavContainer.waitFor({ state: 'visible', timeout: 5000 });
      // Check HEADER block content:
      await expect(Header.mainNavLogo).toBeVisible();
      await expect(Header.signInButton).toBeVisible();
    });

    await test.step('Check FOOTER block content', async () => {
      // Scroll FEDS Footer into viewport:
      await Footer.legalContainer.scrollIntoViewIfNeeded();
      // Wait for FEDS Footer to be visible:
      await Footer.footerContainer.waitFor({ state: 'visible', timeout: 5000 });
      // Check FEDS Footer critical elements:
      await expect(Footer.legalContainer).toBeVisible();
      await expect(Footer.socialContainer).toBeVisible();
      await expect(Footer.footerContainer).toBeVisible();
      await expect(Footer.changeRegionContainer).toBeVisible();
      // !Note: Footer featuredProducts not appearing in NALA. Possible BUG!
      expect(Footer.featuredProductsContainer).toBeVisible();
      await expect(Footer.footerColumns).toHaveCount(5);
      expect([4, 6, 9].includes(await Footer.footerSections.count())).toBeTruthy();
      expect([4, 6, 9].includes(await Footer.footerHeadings.count())).toBeTruthy();
      await expect(Footer.socialIcons).toHaveCount(4);
      await expect(Footer.legalLinks).toHaveCount(5);
    });

    await test.step('Check ChangeRegion functionality', async () => {
      await Footer.changeRegionButton.click();
      await expect(Footer.changeRegionModal).toBeVisible();
      await Footer.changeRegionCloseButton.click();
      await expect(Footer.changeRegionModal).not.toBeVisible();
    });

    await test.step('Check HEADER search component', async () => {
      const isSearchIconVisible = await Header.searchIcon.isVisible();
      if (isSearchIconVisible) {
        await test.step('Check HEADER search component', async () => {
          await Header.openSearchBar();
          await Header.closeSearchBar();
        });
      } else {
        console.info('[Info] Search icon is not visible. Skipping the search component test.');
      }
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
