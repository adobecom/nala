import { expect, test } from '@playwright/test';
import { features } from '../../features/helpx/draft.spec.js';
import Draft from '../../selectors/helpx/draft.page.js';
import config from '../../configs/helpx.config.js';
import { WebUtil } from '../../libs/webutil.js';


let draft;
let page;
let draftTag= features[0].path;

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
  draft = new Draft(page);
  await page.goto(`${config.use?.baseURL}${draftTag}`);
  await page.waitForLoadState('networkidle');
});

test.describe('Draft sanity test suite', () => {
  // Draft Sanity Checks:
  test(`Verify Draft component`, async ({baseURL}) => {
    console.log(`[Test Page]: ${baseURL}${draftTag}.html`);
    await test.step('Navigate to Draft page', async () => {
      await expect(page).toHaveURL(`${baseURL}${draftTag}.html`);
    });

    // Check procedure present
    await expect(draft.procedure).not.toBeVisible();

    // Check beforeAftr present
    await expect(draft.beforeAftr).not.toBeVisible();

    // Check codeBlock present
    await expect(draft.codeBlock).not.toBeVisible();

    // Check generic present
    await expect(draft.generic).not.toBeVisible();

    //verify CSS property of a Draft page
    expect(await WebUtil.verifyCSS(await draft.procedure, draft.cssProperties['procedure'])).toBeTruthy();
    expect(await WebUtil.verifyCSS(await draft.beforeAftr, draft.cssProperties['beforeAftr'])).toBeTruthy();
    expect(await WebUtil.verifyCSS(await draft.codeBlock, draft.cssProperties['codeBlock'])).toBeTruthy();
    expect(await WebUtil.verifyCSS(await draft.generic, draft.cssProperties['generic'])).toBeTruthy();
    
    //Verify Attribute of a Draft Page
    expect(await WebUtil.verifyAttributes(await draft.procedure, draft.attProperties['procedure'])).toBeTruthy();
    expect(await WebUtil.verifyAttributes(await draft.beforeAftr, draft.attProperties['beforeAftr'])).toBeTruthy();
    expect(await WebUtil.verifyAttributes(await draft.codeBlock, draft.attProperties['codeBlock'])).toBeTruthy();
    expect(await WebUtil.verifyAttributes(await draft.generic, draft.attProperties['generic'])).toBeTruthy();
    
  });
});
