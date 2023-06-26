/* eslint-disable import/named */
/* eslint-disable no-await-in-loop */
/* eslint-disable import/extensions */
import { expect, test } from '@playwright/test';
import { FedsHeader } from '../../selectors/feds/feds.header.page';

const parse = require('../../libs/parse.js');
const header = require('../../features/feds/header.spec.js');

const { name, features } = parse(header);
test.describe(`${name}`, () => {
  features.forEach((props) => {
    test(props.title, async ({ page }) => {
      const { title } = props;
      // Initialize FEDS header page:
      const Header = new FedsHeader(page);
      // Navigate to FEDS header page:
      await page.goto(props.url);
      // Wait for page to load & stabilize:
      await page.waitForLoadState('domcontentloaded');
      // Wait for FEDS GNAV to be visible:
      await Header.MainNavContainer.waitFor({ state: 'visible', timeout: 5000 });
      await expect(Header.SearchIcon).toBeVisible();
      await expect(Header.SignInLabel).toBeVisible();
      await expect(Header.MainNavLogo).toBeVisible();
      if (!/adobe/.test(title)) await expect(Header.GnavLogo).toBeVisible();

      await test.step('Check HEADER search component', async () => {
        await Header.openSearchBar();
        await Header.closeSearchBar();
      });

      await test.step('Check HEADER mega menu component', async () => {
        await Header.MegaMenuToggle.waitFor({ state: 'visible', timeout: 5000 });
        await Header.MegaMenuToggle.click();
        await expect(Header.MegaMenuContainer).toBeVisible();
        await Header.MegaMenuToggle.click();
        await expect(Header.MegaMenuContainer).not.toBeVisible();
      });
    });
  });
});
