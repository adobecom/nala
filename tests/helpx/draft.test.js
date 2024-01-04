import { expect, test } from '@playwright/test';
import { features } from '../../features/helpx/draft.spec.js';
import Draft from '../../selectors/helpx/draft.page.js';
import config from '../../configs/helpx.config.js';
import { WebUtil } from '../../libs/webutil.js';


let draft;
let page;
let draftTag= features[0].path;
let cssProps; 
const helpxbaseURL = config.use?.baseURL;

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
  cssProps = new WebUtil(page);

});

test.describe('Draft sanity test suite', () => {
  // Draft Sanity Checks:
  test(`Verify Draft component`, async ({baseURL}) => {
    await page.goto(`${helpxbaseURL}${draftTag}`);
    await page.waitForLoadState('networkidle');
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
    expect(await cssProps.verifyCSS_(await draft.procedure, draft.cssProperties['procedure'])).toBeTruthy();
    expect(await cssProps.verifyCSS_(await draft.beforeAftr, draft.cssProperties['beforeAftr'])).toBeTruthy();
    expect(await cssProps.verifyCSS_(await draft.codeBlock, draft.cssProperties['codeBlock'])).toBeTruthy();
    expect(await cssProps.verifyCSS_(await draft.generic, draft.cssProperties['generic'])).toBeTruthy();
    
    //Verify Attribute of a Draft Page
    expect(await cssProps.verifyAttributes_(await draft.procedure, draft.attProperties['procedure'])).toBeTruthy();
    expect(await cssProps.verifyAttributes_(await draft.beforeAftr, draft.attProperties['beforeAftr'])).toBeTruthy();
    expect(await cssProps.verifyAttributes_(await draft.codeBlock, draft.attProperties['codeBlock'])).toBeTruthy();
    expect(await cssProps.verifyAttributes_(await draft.generic, draft.attProperties['generic'])).toBeTruthy();
    
  });
});


test.describe('Draft on Before After Component',()=>{

  let baname= `${features[1].name}`;
  test(baname, async () => {
    const BeforeAfterurl = `${helpxbaseURL}${features[1].path}`;
    await page.goto(BeforeAfterurl);
    await page.waitForLoadState('networkidle');
    await console.log("BeforeAfterurl: "+BeforeAfterurl);

    //verify components are not visible
    await expect(draft.codeAs3LineNumbersDraft).not.toBeVisible();
    await expect(draft.beforeAfterSlider).not.toBeVisible();
    await expect(draft.horizontalBeforeAfterSlider).not.toBeVisible();
    await expect(draft.beforeAfterSliderDraft).not.toBeVisible();
    await expect(draft.beforeAfterSliderDraftHorizontal).not.toBeVisible();
    await expect(draft.as3CodeSnippet).not.toBeVisible();

    
  });
});

test.describe('Draft on Code Block Component',()=>{

  let baname= `${features[2].name}`;
  test(baname, async () => {
    const codeblockdrafturl = `${helpxbaseURL}${features[2].path}`;
    await page.goto(codeblockdrafturl);
    await page.waitForLoadState('networkidle');
    await console.log("CodeBlockDrafturl: "+codeblockdrafturl);

    //verify components are not visible
    await expect(draft.codeAs3LineNumbersDraft).not.toBeVisible();
    await expect(draft.codeColdFusionDraft).not.toBeVisible();
    await expect(draft.codeCPlusPlusDraft).not.toBeVisible();
    await expect(draft.codeCSSLineNumbersDraft).not.toBeVisible();
    await expect(draft.codeJavaLineNumbersDraft).not.toBeVisible();
    await expect(draft.codeJavaScriptDraft).not.toBeVisible();
    await expect(draft.codePHPDraft).not.toBeVisible();
    await expect(draft.codeSQLDraft).toBeVisible();
    await expect(draft.codeXMLDraft).not.toBeVisible();
    await expect(draft.codeShellDraft).not.toBeVisible();
    await expect(draft.codePlainDraft).not.toBeVisible();
  });
});

test.describe('Draft Component on Generic',()=>{

  let baname= `${features[3].name}`;
  test(baname, async () => {
    const genericDraftURl = `${helpxbaseURL}${features[3].path}`;
    await page.goto(genericDraftURl);
    await page.waitForLoadState('networkidle');
    await console.log("genericDraftURl: "+genericDraftURl);

    await expect(draft.genericComponentsDraft).toBeVisible();
    await expect(draft.genericImageDraft1).not.toBeVisible();
    await expect(draft.genericImageDraft2).not.toBeVisible();
    await expect(draft.genericTextDraft).not.toBeVisible();
      
  });
});

