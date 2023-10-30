import { expect, test } from '@playwright/test';
import { features } from '../../features/helpx/codeBlock.spec.js';
import { CodeBlock } from '../../selectors/helpx/codeBlock.page.js';

let codeBlk;

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
  codeBlk = new CodeBlock(page);
  await page.goto(`${baseURL}${features[0].path}`);
  await page.waitForLoadState('networkidle');
});

test.describe('CodeBlock sanity test suite', () => {
  // CodeBlock Sanity Checks:
  test(`${features[0].name}, ${features[0].tags}`, async ({
    page,
    baseURL,
  }) => {
    console.info(`[Test Page]: ${baseURL}${features[0].path}`);
    await test.step('Navigate to CodeBlock page', async () => {
      await expect(page).toHaveURL(`${baseURL}${features[0].path}`);
    });

    // Check for different codeBlock formats present
    await expect(codeBlk.codeBlockA3).toBeVisible();
    await expect(codeBlk.codeFusion).toBeVisible();
    await expect(codeBlk.codeC).toBeVisible();
    await expect(codeBlk.codeCss).toBeVisible();
    await expect(codeBlk.codeJava).toBeVisible();
    await expect(codeBlk.codeJS).toBeVisible();
    await expect(codeBlk.codePhp).toBeVisible();
    await expect(codeBlk.codePlain).toBeVisible();
    await expect(codeBlk.codeSql).toBeVisible();
    await expect(codeBlk.codeXml).toBeVisible();
    await expect(codeBlk.codeMxml).toBeVisible();

    // Check different InLineNumber codeBlock formats present
    await expect(codeBlk.codeBlockA3Num).toBeVisible();
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

    expect(
      await WebUtil.verifyCSS(
        await this.codeHideDsktop,
        this.cssProperties['codeHideDsktop']
      )
    ).toBeTruthy();
    expect(
      await WebUtil.verifyCSS(
        await this.codeHideTablet,
        this.cssProperties['codeHideTablet']
      )
    ).toBeTruthy();
    expect(
      await WebUtil.verifyCSS(
        await this.codeHideMobile,
        this.cssProperties['codeHideMobile']
      )
    ).toBeTruthy();

    expect(
      await WebUtil.verifyAttributes(
        await this.codeHideDsktop,
        this.attProperties['codeHideDsktop']
      )
    ).toBeTruthy();
    expect(
      await WebUtil.verifyAttributes(
        await this.codeHideTablet,
        this.attProperties['codeHideTablet']
      )
    ).toBeTruthy();
    expect(
      await WebUtil.verifyAttributes(
        await this.codeHideMobile,
        this.attProperties['codeHideMobile']
      )
    ).toBeTruthy();
  });
});
