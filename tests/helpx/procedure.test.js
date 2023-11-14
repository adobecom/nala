import { expect, test } from '@playwright/test';
import { features } from '../../features/helpx/procedure.spec.js';
import { Procedure } from '../../selectors/helpx/procedure.page.js';

let procedure;

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
  const page = await context.newPage();
  procedure = new Procedure(page);
  await page.goto(`${baseURL}${features[0].path}`);
  await page.waitForLoadState('networkidle');
});

test.describe('Procedure Sanity test suite', () => {
  // Procedure Sanity Checks:
  test(`${features[0].name}, ${features[0].tags}`, async ({
    page,
    baseURL,
  }) => {
    console.info(`[Test Page]: ${baseURL}${features[0].path}`);
    await test.step('Navigate to Procedure page', async () => {
      await expect(page).toHaveURL(`${baseURL}${features[0].path}`);
    });

    await test.step('Check Procedure page content', async () => {
      // Check procedure:
      await expect(procedure.procedure).toBeVisible();

      // Check procedure step:
      await expect(procedure.procedureStep).toBeVisible();

      // Check image in procedure:
      await expect(procedure.procedureImage).toBeVisible();

      // Check bold text in procedure:
      await expect(procedure.procedureTxtBold).toBeVisible();
    });
  });
});
