/* eslint-disable import/extensions */
/* eslint-disable import/named */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import { FedsHeader } from '../../selectors/feds/feds.header.page';

const AxeBuilder = require('@axe-core/playwright').default;
const { expect, test } = require('@playwright/test');
const parse = require('../../libs/parse.js');
const a11y = require('../../features/feds/a11y.spec.js');
const { name, features } = parse(a11y);

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
      if (!/adobe/.test(title)) await expect(Header.GnavLogo).toBeVisible();
      await expect(Header.MainNavLogo).toBeVisible();

      // Analyze page accessibility:
      const a11yScan = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wwcag21a', 'wcag21aa'])
        .analyze();
      // Assert page violations are limited:
      expect(a11yScan.violations.length).toBeLessThan(5);
    });
  });
});
