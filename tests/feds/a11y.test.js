/* eslint-disable import/extensions */
/* eslint-disable import/named */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import { FedsHeader } from '../../selectors/feds/feds.header.page';
import a11y from '../../libs/accessibility';

const AxeBuilder = require('@axe-core/playwright').default;
const { expect, test } = require('@playwright/test');
const parse = require('../../libs/parse.js');
const a11ySpec = require('../../features/feds/a11y.spec.js');
const { name, features } = parse(a11ySpec);

test.describe(`${name}`, () => {
  features.forEach((props) => {
    test(props.title, async ({ page }) => {

      // Initialize FEDS header page:
      const Header = new FedsHeader(page);
      // Navigate to FEDS header page:
      await page.goto(props.url);
      // Wait for page to load & stabilize:
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(2500);
      // Wait for FEDS GNAV to be visible:
      await Header.MainNavContainer.waitFor({ state: 'visible', timeout: 5000 });

      // Analyze page accessibility:
      const a11yReport = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wwcag21a', 'wcag21aa'])
        .analyze();
      // Assert page violations are limited:
      expect(a11yReport.violations.length).toBeLessThan(5);

      // Custom-summary for a11y html report:
      const reportSummary =
      `Report Summary: Checks the page accessibility of the ${props.url} URL.
        <br>More info:</br>
        <ol style="margin: 0">
        <li>This is a Federated Services, A11y initiative.</li>
        <li>For more info contact chivescu@adobe.com.</li>
        <li>.</li>
        </ol>
      `;
      // Generate a11y html report:
      await a11y.generateA11yReport(a11yReport, reportSummary, 'feds');
    });
  });
});
