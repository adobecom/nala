/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
const { expect, test } = require('@playwright/test');
const parse = require('../../libs/parse.js');
const header = require('../../features/feds/header.spec.js');
import { FedsHeader } from '../../pages/feds.header.page';

const { name, features } = parse(header);
test.describe(`${name}`, () => {
  features.forEach((props) => {
    test(props.title, async ({ page, browser }) => {

      // Initialize FEDS header page:
      const Header = new FedsHeader(page);

      // Navigate to FEDS header page:
      await page.goto(props.url);
      // Wait for page to load & stabilize:
      await page.waitForLoadState('domcontentloaded');

      // Wait for FEDS GNAV to be visible:
      await Header.MainNavContainer.waitFor({state: 'visible', timeout: 5000});
      await expect(Header.SearchIcon).toBeVisible();
      await expect(Header.SignInLabel).toBeVisible();
      await expect(Header.GnavLogo).toBeVisible();
      await expect(Header.MainNavLogo).toBeVisible();

      // Check basic search functionality:
      await Header.OpenSearchBar();
      await Header.CloseSearchBar();

      // Check header mega menu:
      await Header.MegaMenuToggle.waitFor({state: 'visible', timeout: 5000});
      await Header.MegaMenuToggle.click();
      await expect(Header.MegaMenuContainer).toBeVisible();
      await Header.MegaMenuToggle.click();
      await expect(Header.MegaMenuContainer).not.toBeVisible();
    });
  });
});
