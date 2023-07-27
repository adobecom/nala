/* eslint-disable import/named */
/* eslint-disable no-await-in-loop */
/* eslint-disable import/extensions */
import { expect, test } from '@playwright/test';
import { features } from '../../features/feds/a11y.spec.js';
import FedsHeader from '../../selectors/feds/feds.header.page.js';
import a11y from '../../libs/accessibility';

// eslint-disable-next-line import/no-extraneous-dependencies
const AxeBuilder = require('@axe-core/playwright').default;

let a11yReport;

test.describe(`${features[0].name}`, () => {
  (features[0].path).forEach((a11yUrl, index) => {
    test(`${features[0].name}-${index}, ${features[0].envs}, ${features[0].tags}`, async ({ page, baseURL }) => {
      const Header = new FedsHeader(page);
      console.info(`[FEDSInfo] Checking page: ${baseURL}${a11yUrl}${features[0].browserParams}`);

      await test.step('Navigate to accessibility targeted page', async () => {
        await page.goto(`${baseURL}${a11yUrl}${features[0].browserParams}`);
        // Wait for page to load & stabilize:
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(5000);
        // Check the expected URL was loaded:
        await expect(page).toHaveURL(`${baseURL}${a11yUrl}${features[0].browserParams}`);
      });

      await test.step('Analyze targeted page accessibility', async () => {
        // Wait for FEDS GNAV to be visible:
        await Header.mainNavContainer.waitFor({ state: 'visible', timeout: 5000 });
        // Analyze page accessibility:
        a11yReport = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wwcag21a', 'wcag21aa'])
          .analyze();
        // Assert page violations are limited:
        expect(a11yReport.violations.length).toBeLessThan(5);
      });

      await test.step('Generate accessibility report for current page', async () => {
        // Custom-summary for a11y html report:
        const reportSummary = `Report Summary: Checks the page accessibility 
            of the given URL & generates a a11y report.
            <br>More info:</br>
            <ol style="margin: 0">
            <li>This is a Federated Services, A11y initiative.</li>
            </ol>
          `;
        // Generate a11y html report:
        await a11y.generateA11yReport(a11yReport, reportSummary, 'feds');
      });
    });
  });
});
