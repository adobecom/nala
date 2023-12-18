import { expect, test } from '@playwright/test';
import features from '../../features/helpx/procedure.spec.js';
import Procedure from '../../selectors/helpx/procedure.page.js';
import helpxconfig from '../../configs/helpx.config.js';

let procedure;
let page;

test.beforeAll(async ({ browser }) => {
  //Verify TOKEN is set at environment variables
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
  //create a new page
  page = await context.newPage();
  procedure = new Procedure(page); //Attached Xpaths procedure page to playwright page
  let procedureTag = features.features[0].path;
  //Go to URL
  await page.goto(`${helpxconfig.use?.baseURL}${procedureTag}`);
  await page.waitForLoadState('networkidle');
});

test.describe('Procedure Sanity test suite', () => {
  let urlpath = features.features[0].path;
  let procedureTag = features.features[0].path;

  // Procedure Sanity Checks:
  test(`${urlpath}, ${procedureTag}`, async ({ baseURL }) => {
    console.log(`[Test Page]: ${baseURL}${procedureTag}`);
    //I verify url of the page
    await test.step('Navigate to Procedure page', async () => {
      await expect(page).toHaveURL(`${baseURL}${procedureTag}.html`);
    });

    //I verify procedure component is present with step,image,TextBold
    await test.step('Check Procedure page content', async () => {
      // Check procedure:
      await expect(procedure.procedure).toBeVisible();
      //check Step count
      await expect(procedure.procedureStep).toHaveCount(3);
      // Check image in procedure:
      await expect(procedure.procedureImage).toBeVisible();
      // Check bold text in procedure:
      await expect(procedure.procedureTxtBold).toBeVisible();
    });
  });
});

