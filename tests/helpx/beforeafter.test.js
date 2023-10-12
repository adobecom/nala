import { expect, test } from '@playwright/test';
import { features } from '../../features/helpx/procedure.spec.js';
import { BeforeAfter } from '../../selectors/helpx/procedure.selectors.js';

let beforeAftr;

test.beforeAll(async({browser})=>{
  const authToken = process.env.HLX_TKN;
  const context = await browser.newContext();
     // Set the authorization token in the header
    await context.setExtraHTTPHeaders({ 'authorization': `token ${authToken}` });
   const page = await context.newPage();
   beforeAftr = new BeforeAfter(page);
    await page.goto(`${baseURL}${features[0].path}`);
    await page.waitForLoadState('networkidle');
})

test.describe('BeforeAfter sanity test suite', () => {

  // Procedure Sanity Checks:
  test(`${features[0].name}, ${features[0].tags}`, async ({ page, baseURL }) => { 
    console.info(`[BeforeAfter] Checking page: ${baseURL}${features[0].path}`);
    await test.step('Navigate to BeforeAfter page', async () => {
    await expect(page).toHaveURL(`${baseURL}${features[0].path}`);
    });

    // Check beforeAfter
    await expect(beforeAftr.beforeafterVertical).toBeVisible();
     
    // Check beforeAfter after vertical movement
    beforeafterVertical.scrollTop -= 40;
    await expect(beforeAftr.beforeafterVerticalmoved).toBeVisible();

    });
  });