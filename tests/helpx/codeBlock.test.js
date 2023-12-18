import { expect, test } from '@playwright/test';
import { features } from '../../features/helpx/codeBlock.spec.js';
import CodeBlock from '../../selectors/helpx/codeBlock.page.js';
import config from '../../configs/helpx.config.js';
import { WebUtil } from '../../libs/webutil.js';


let codeBlk;
let page;
let codeblocktag = features[0].path;


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
  codeBlk = new CodeBlock(page);


  await page.goto(`${config.use?.baseURL}${codeblocktag}`);
  await page.waitForLoadState('networkidle');
});

test.describe('CodeBlock sanity test suite', () => {
  // CodeBlock Sanity Checks:
  test(`verify Code Block Page Elements`, async ({baseURL}) => {
    console.info(`[Test Page]: ${baseURL}${codeblocktag}`);
    await test.step('Navigate to CodeBlock page', async () => {
      await expect(page).toHaveURL(`${baseURL}${codeblocktag}.html`);
    });

    // Check for different codeBlock formats present
    await expect(codeBlk.codeA3).toBeVisible();
    await expect(codeBlk.codeFusion).toBeVisible();
    await expect(codeBlk.codeC).toBeVisible();
    await expect(codeBlk.codeCss).toBeVisible();
    await expect(codeBlk.codeJava).toBeVisible();
    await expect(codeBlk.codeJS).toHaveCount(4);
    await expect(codeBlk.codePhp).toHaveCount(5);
    await expect(codeBlk.codePlain).toBeVisible();
    await expect(codeBlk.codeSql).toHaveCount(3);
    await expect(codeBlk.codeXml).toHaveCount(2);
    await expect(codeBlk.codeMxml).toBeVisible();

    //verify Code block css Properties
    expect(await WebUtil.verifyCSS(await codeBlk.codeHideDsktop.first(), codeBlk.cssProperties['codeHideDsktop'])).toBeTruthy();
    expect(await WebUtil.verifyCSS(await codeBlk.codeHideTablet.first(), codeBlk.cssProperties['codeHideTablet'])).toBeTruthy();
    expect(await WebUtil.verifyCSS(await codeBlk.codeHideMobile.first(), codeBlk.cssProperties['codeHideMobile'])).toBeTruthy();
    
    //Verify code Block Attribute Properties
    expect(await WebUtil.verifyAttributes(await codeBlk.codeHideDsktop.first(), codeBlk.attProperties['codeHideDsktop'])).toBeTruthy();
    expect(await WebUtil.verifyAttributes(await codeBlk.codeHideTablet.first(), codeBlk.attProperties['codeHideTablet'])).toBeTruthy();
    expect(await WebUtil.verifyAttributes(await codeBlk.codeHideMobile.first(), codeBlk.attProperties['codeHideMobile'])).toBeTruthy();
    

    //Check different InLineNumber codeBlock formats present
    await expect(codeBlk.codeA3Num).toBeVisible();
    await expect(codeBlk.codeFusionNum).toBeVisible();
    await expect(codeBlk.codeCNum).toBeVisible();
    await expect(codeBlk.codeCssNum).toBeVisible();
    await expect(codeBlk.codeJavaNum).toBeVisible();
    await expect(codeBlk.codeJSNum).toBeVisible();
    await expect(codeBlk.codePhpNum).toBeVisible();
    await expect(codeBlk.codePlainNum).toBeVisible();
    await expect(codeBlk.codeSqlNum).toBeVisible();
    await expect(codeBlk.codeXmlNum).toBeVisible();
    await expect(codeBlk.codeMxmlNum).toBeVisible();
  });
});
