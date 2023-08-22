/* eslint-disable max-len */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-import-module-exports */
/* eslint-disable import/no-extraneous-dependencies */
import path from 'node:path';
import { promises as fs } from 'fs';
import { createHtmlReport } from 'axe-html-reporter';

async function generateA11yReport(report, summary, project = 'feds', wcag = 'wcag21aa') {
  // Timestamp reports to track & avoid duplicates:
  const time = new Date();
  const reportDate = time.toLocaleDateString().replace(/\//ig, '-');
  const reportTime = time.toLocaleTimeString().split(' ')[0].replace(/:/g, '-');

  // Setup the 'axe-reports' folder:
  const folderName = 'axe-reports';
  // !Note: Due to PlayWright running checks in paralel, the reports have
  //        to have a unique ID appended in order to avoid overwriting files.
  const uniqueId = Math.random().toString(36).slice(2).substring(0, 6);
  const folderPath = path.resolve(`${process.cwd()}/${folderName}`);
  const reportName = `${project}-a11y-report-${wcag}-${reportDate}-${reportTime}-${uniqueId}.html`;

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
  await fs.writeFile(path.resolve(folderPath, reportName), htmlReport, (err) => {
    if (err) {
      return console.error(`[FEDsError] Failed to write the '${reportName}' report! | Reason: '${err}'`);
    }
    console.info(`[FEDsInfo] Successfully wrote the '${reportName}' a11y report!`);
    return 1;
  });
}

module.exports = { generateA11yReport };
