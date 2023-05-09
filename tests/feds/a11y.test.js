/* eslint-disable import/extensions */
/* eslint-disable import/named */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import { FedsHeader } from '../../selectors/feds/feds.header.page';
import { createHtmlReport } from 'axe-html-reporter';

const fs = require('fs');
const path = require('path');
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
      const a11yPageReport = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wwcag21a', 'wcag21aa'])
        .analyze();
      // Assert page violations are limited:
      expect(a11yPageReport.violations.length).toBeLessThan(5);

      // Timestamp the reports to avoid duplicates/deletion:
      const time = new Date();
      const reportDate = time.toLocaleDateString().replace(/\//ig,'-');
      const reportTime = time.toLocaleTimeString().split(' ')[0].replace(/:/g, '-');
      const crtEnv     = 'prod'; // !Note: In future implement dynamic env checking.
      // Generate AXE-CORE html report:
      const customSummary =
      `Test Case: Check FEDS accessibility score on Helix page and generate report
        <br>Steps:</br>
        <ol style="margin: 0">
        <li>This is a placeholder text.</li>
        <li>POC powered by Chad Sunvice (chivescu@adobe.com).</li>
        </ol>
      `;
      // Setup the 'axe-reports' folder:
      const folderName = 'axe-reports';
      const folderPath = path.resolve(`${process.cwd()}/${folderName}`);
      const reportName = `feds-a11y-wcag21aa-report-${crtEnv}-${reportDate}-${reportTime}.html`;
      try {
        if (!fs.existsSync(folderPath)) {
          fs.mkdirSync(folderPath, { recursive: true });
          console.info(`[FEDsInfo] Successfully created the '${folderName}' folder!`);
        } else {
          console.info('[FEDsInfo] Directory already exists!');
        }
      } catch (err) {
        console.error(`[FEDsError] Failed to created the '${folderName}' folder! | Reason: '${err}'`);
      }
      // Generate a11y html report:
      const htmlReport = createHtmlReport({
        results: a11yPageReport,
        options: {
            projectKey: 'MWP Web (https://jira.corp.adobe.com/projects/MWPW)',
            customSummary,
            doNotCreateReportFile: true,
        },
      });
      // Write a11y html report to file:
      fs.writeFile(path.resolve(folderPath, reportName), htmlReport, function(err) {
        if (err) {
          return console.error(`[FEDsError] Failed to write the '${reportName}' report! | Reason: '${err}'`);
        }
        console.info(`[FEDsInfo] Successfully wrote the '${reportName}' a11y report!`);
      });
    });
  });
});
