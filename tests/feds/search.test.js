/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
const { expect, test } = require('@playwright/test');
const parse = require('../../libs/parse.js');
const search = require('../../features/feds/search.spec.js');
import { FedsHeader } from '../../pages/feds.header.page';

const { name, features } = parse(search);
test.describe(`${name}`, () => {
  features.forEach((props) => {
    test(props.title, async ({ page, browser }) => {
      // Initialize FEDS page:
      const Header = new FedsHeader(page);
      // Load page with FEDS search component:
      await page.goto(props.url);
      // Wait for page to load & stabilize:
      await page.waitForLoadState('networkidle');
      // Check basic search functionality:
      await Header.OpenSearchBar();
      await Header.CloseSearchBar();
      // Check search functionality (real search):
      await Header.OpenSearchBar();
      await Header.SearchInput.fill('Adobe Photoshop');
      await expect(Header.SearchResults).toBeVisible();
      await Header.CloseSearchBar();
      // Check search functionality (bogus search):
      await Header.OpenSearchBar();
      await Header.SearchInput.fill('How much wood could a woodchuck chuck ...');
      // Wait for search results to populate:
      await page.waitForTimeout(1000);
      await expect(Header.AdvancedSearchLink).toBeVisible();
      await Header.CloseSearchBar();
    });
  });
});
