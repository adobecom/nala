// Accessibility automation for CAAS (Content as a Service)
import { expect, test } from '@playwright/test';
import { features } from '../../features/caas/caas.a11y.spec.js';
import Caas from '../../selectors/caas/caas.feature.page.js';
import a11y from '../../libs/accessibility.js';

const AxeBuilder = require('@axe-core/playwright').default;

let a11yReport;

test.describe('CAAS Accessibility', () => {
  test(`${features[0].name} Accessibility, ${features[0].tags}`, async ({ page, baseURL }) => {
    const caas = new Caas(page);
    // const { path, data } = features[0];

    await test.step('Navigate to CAAS collection test page', async () => {
      await page.goto(`${baseURL}${features[0].path}`);
      await page.waitForLoadState('networkidle');
      await expect(page).toHaveURL(`${baseURL}${features[0].path}`);
      // Ensure at least one card is visible
      await expect(await caas.caasFirstCard).toBeVisible();
    });

    await test.step('Analyze CAAS page accessibility', async () => {
      a11yReport = await new AxeBuilder({ page })
        // Add WCAG tags as needed
        .withTags(features[0].wcagTags)
        .analyze();
      // Assert page violations are limited (customize threshold as needed)
      expect.soft(a11yReport.violations.length).toBeLessThan(5);
    });

    await test.step('Generate CAAS accessibility report', async () => {
      const reportSummary = 'Accessibility Report Summary:';
      await a11y.generateA11yReport(a11yReport, reportSummary, 'caas', 'wcag21aa');
    });
  });
});
