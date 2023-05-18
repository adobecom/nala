/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable import/no-import-module-exports */
/* eslint-disable-next-line import/no-import-module-exports */
const fs = require('fs').promises;
const path = require('path');
import { createHtmlReport } from 'axe-html-reporter';

async function generateA11yReport(report, summary, project='feds', wcag='wcag21aa') {

  // Timestamp reports to track & avoid duplicates:
  const time       = new Date();
  const crtEnv     = 'prod';
  const reportDate = time.toLocaleDateString().replace(/\//ig,'-');
  const reportTime = time.toLocaleTimeString().split(' ')[0].replace(/:/g, '-');

  // Setup the 'axe-reports' folder:
  const folderName = 'axe-reports';
  const folderPath = path.resolve(`${process.cwd()}/${folderName}`);
  const reportName = `${project}-a11y-report-${wcag}-${crtEnv}-${reportDate}-${reportTime}.html`;

  try {
    await access(folderPath);
    console.info('[FEDsInfo] Directory already exists!');
  } catch (err) {
    console.info(`[FEDsInfo] No directory exists at ${folderPath}!`);
    // Creating the directory:
    await fs.mkdir(folderPath, { recursive: true });
    console.info(`[FEDsInfo] Successfully created the '${folderName}' folder!`);
  }

  // Generate a11y html report:
  const customSummary = summary;
  const htmlReport = createHtmlReport({
    results: report,
    options: {
        projectKey: 'MWP Web (https://jira.corp.adobe.com/projects/MWPW)',
        customSummary,
        doNotCreateReportFile: true,
    },
  });

  // Write a11y html report to file:
  await fs.writeFile(path.resolve(folderPath, reportName), htmlReport, function(err) {
    if (err) {
      return console.error(`[FEDsError] Failed to write the '${reportName}' report! | Reason: '${err}'`);
    }
    console.info(`[FEDsInfo] Successfully wrote the '${reportName}' a11y report!`);
  });
}

module.exports = { generateA11yReport };
