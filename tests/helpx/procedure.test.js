import { expect, test } from '@playwright/test';
import { features } from '../../features/helpx/procedure.spec.js';
import { Procedure} from '../../selectors/helpx/procedure.selectors.js';


let procedure;

test.beforeAll(async({browser})=>{
  const authToken = process.env.HLX_TKN;
  const context = await browser.newContext();
     // Set the authorization token in the header
    await context.setExtraHTTPHeaders({ 'authorization': `token ${authToken}` });
   const page = await context.newPage();
   procedure = new Procedure(page);
    await page.goto(`${baseURL}${features[0].path}`);
    await page.waitForLoadState('networkidle');
})


test.describe('Procedure Sanity test suite', () => {

  // Procedure Sanity Checks:
  test(`${features[0].name}, ${features[0].tags}`, async ({ page, baseURL }) => { 
    console.info(`[Procedure] Checking page: ${baseURL}${features[0].path}`);
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