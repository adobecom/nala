import { expect, test } from '@playwright/test';
import { features } from '../../features/helpx/beforeAfter.spec.js';
import BeforeAfter from '../../selectors/helpx/beforeafter.page.js';
import config from '../../configs/helpx.config.js';

let beforeAftr;
let page;

test.beforeAll(async ({ browser }) => {
  if (process.env.HLX_TKN !== undefined && process.env.HLX_TKN !== '') {
    // The environment variable is set and has a non-blank value
    console.log('Environment variable is set and not blank');
  } else {
    // The environment variable is either not set or has a blank value
    const errorMessage =
      "Environment variable 'HLX_TKN' is not set or blank. Please ensure it is properly configured.";
    throw new Error(errorMessage);
  }

  const authToken = process.env.HLX_TKN;
  const context = await browser.newContext();
  // Set the authorization token in the header
  await context.setExtraHTTPHeaders({ authorization: `token ${authToken}` });
  page = await context.newPage();
  beforeAftr = new BeforeAfter(page);

});


test.describe('BeforeAfter Sanity test suite', () => {

  // Before After Sanity Checks:
  test(`${features[0].name}, ${features[0].tags}`, async ({ baseURL }) => {
    const BeforeAfterTag = features[0].path;
    await page.goto(`${config.use?.baseURL}${BeforeAfterTag}`);
    await page.waitForLoadState('networkidle');
    console.log(`[Test Page]: ${baseURL}${BeforeAfterTag}`);
    //I verify url of the page
    await test.step('Navigate to beforeAfter page', async () => {
      await expect(page).toHaveURL(`${baseURL}${BeforeAfterTag}.html`);
    });


    await test.step('Check Before After page content', async () => {
      // Check Before After Page component is visible
      await expect(beforeAftr.beforeAftr).toBeVisible();
    });
  });
});
