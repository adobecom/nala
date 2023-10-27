import { expect, test } from '@playwright/test';
import { features } from '../../features/helpx/codeBlock.spec.js';
import { CodeBlock } from '../../selectors/helpx/codeBlock.selectors.js';

let codeBlk;

test.beforeAll(async({browser})=>{
  if (process.env.HLX_TKN !== undefined && process.env.HLX_TKN !== "") {
    // The environment variable is set and has a non-blank value
    console.log("Environment variable is set and not blank");
  } else {
    // The environment variable is either not set or has a blank value
    const errorMessage = "Environment variable 'HLX_TKN' is not set or blank. Please ensure it is properly configured.";
    throw new Error(errorMessage);
  }

  const authToken = process.env.HLX_TKN;
  const context = await browser.newContext();
     // Set the authorization token in the header
    await context.setExtraHTTPHeaders({ 'authorization': `token ${authToken}` });
   const page = await context.newPage();
   codeBlk = new CodeBlock(page);
    await page.goto(`${baseURL}${features[0].path}`);
    await page.waitForLoadState('networkidle');
})

test.describe('CodeBlock sanity test suite', () => {

  // CodeBlock Sanity Checks:
  test(`${features[0].name}, ${features[0].tags}`, async ({ page, baseURL }) => { 
    console.info(`[CodeBlock] Checking page: ${baseURL}${features[0].path}`);
    await test.step('Navigate to CodeBlock page', async () => {
    await expect(page).toHaveURL(`${baseURL}${features[0].path}`);
    });

    // Check as3 codeBlock present
    await expect(codeBlk.codeBlockA3).toBeVisible();

    // Check codeFusion codeBlock present
    await expect(codeBlk.codeFusion).toBeVisible();

    // Check codeC codeBlock present
    await expect(codeBlk.codeC).toBeVisible();

    // Check codeCss codeBlock present
    await expect(codeBlk.codeCss).toBeVisible();

    // Check codeJava codeBlock present
    await expect(codeBlk.codeJava).toBeVisible();

    // Check codeJS codeBlock present
    await expect(codeBlk.codeJS).toBeVisible();

    // Check codePhp codeBlock present
    await expect(codeBlk.codePhp).toBeVisible();

    // Check codePlain codeBlock present
    await expect(codeBlk.codePlain).toBeVisible();

    // Check codeSql codeBlock present
    await expect(codeBlk.codeSql).toBeVisible();

    // Check codeXml codeBlock present
    await expect(codeBlk.codeXml).toBeVisible();

    // Check codeMxml codeBlock present
    await expect(codeBlk.codeMxml).toBeVisible();

  // Check as3 InLineNumber codeBlock present
  await expect(codeBlk.codeBlockA3Num).toBeVisible();

  // Check codeFusion InLineNumber codeBlock present
  await expect(codeBlk.codeFusionNum).toBeVisible();

  // Check codeC InLineNumber codeBlock present
  await expect(codeBlk.codeCNum).toBeVisible();

  // Check codeCss InLineNumber codeBlock present
  await expect(codeBlk.codeCssNum).toBeVisible();

  // Check codeJava InLineNumber codeBlock present
  await expect(codeBlk.codeJavaNum).toBeVisible();

  // Check codeJS InLineNumber codeBlock present
  await expect(codeBlk.codeJSNum).toBeVisible();

  // Check codePhp InLineNumber codeBlock present
  await expect(codeBlk.codePhpNum).toBeVisible();

  // Check codePlain InLineNumber codeBlock present
  await expect(codeBlk.codePlainNum).toBeVisible();

  // Check codeSql InLineNumber codeBlock present
  await expect(codeBlk.codeSqlNum).toBeVisible();

  // Check codeXml InLineNumber codeBlock present
  await expect(codeBlk.codeXmlNum).toBeVisible();

  // Check codeMxml InLineNumber codeBlock present
  await expect(codeBlk.codeMxmlNum).toBeVisible();
  
  expect(await WebUtil.verifyCSS(await this.codeHideDsktop, this.cssProperties['codeHideDsktop'])).toBeTruthy();
  expect(await WebUtil.verifyCSS(await this.codeHideTablet, this.cssProperties['codeHideTablet'])).toBeTruthy();
  expect(await WebUtil.verifyCSS(await this.codeHideMobile, this.cssProperties['codeHideMobile'])).toBeTruthy();

  expect(await WebUtil.verifyAttributes(await this.codeHideDsktop, this.attProperties['codeHideDsktop'])).toBeTruthy();
  expect(await WebUtil.verifyAttributes(await this.codeHideTablet, this.attProperties['codeHideTablet'])).toBeTruthy();
  expect(await WebUtil.verifyAttributes(await this.codeHideMobile, this.attProperties['codeHideMobile'])).toBeTruthy();
    });
  });