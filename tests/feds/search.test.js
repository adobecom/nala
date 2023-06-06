/* eslint-disable import/named */
/* eslint-disable no-await-in-loop */
/* eslint-disable import/extensions */
/* eslint-disable no-restricted-syntax */
import { expect, test } from '@playwright/test';
import { FedsHeader } from '../../selectors/feds/feds.header.page';

const parse = require('../../libs/parse.js');
const search = require('../../features/feds/search.spec.js');

const { name, features } = parse(search);
test.describe(`${name}`, () => {
  features.forEach((props) => {
    test(props.title, async ({ page }) => {
      // Initialize FEDS page:
      const Header = new FedsHeader(page);
      // Load page with FEDS search component:
      await page.goto(props.url);
      // Wait for page to load & stabilize:
      await page.waitForLoadState('networkidle');

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
});
