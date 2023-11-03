import { expect, test } from '@playwright/test';
import { features } from '../../features/helpx/viewPort.spec.js';
import { ViewPort } from '../../selectors/helpx/viewPort.page.js';

let viewPort;

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
  viewPort = new ViewPort(page);
  await page.goto(`${baseURL}${features[0].path}`);
  await page.waitForLoadState('networkidle');
});

test.describe('ViewPort sanity test suite', () => {
  // ViewPort Sanity Checks:
  test(`${features[0].name}, ${features[0].tags}`, async ({
    page,
    baseURL,
  }) => {
    console.info(`[Test Page]: ${baseURL}${features[0].path}`);
    await test.step('Navigate to ViewPort page', async () => {
      await expect(page).toHaveURL(`${baseURL}${features[0].path}`);
    });

    expect(
      await WebUtil.verifyCSS(
        await this.hideDsktop,
        this.cssProperties['hideDsktop']
      )
    ).toBeTruthy();
    expect(
      await WebUtil.verifyCSS(
        await this.hideTablet,
        this.cssProperties['hideTablet']
      )
    ).toBeTruthy();
    expect(
      await WebUtil.verifyCSS(
        await this.hideMobile,
        this.cssProperties['hideMobile']
      )
    ).toBeTruthy();

    expect(
      await WebUtil.verifyAttributes(
        await this.hideDsktop,
        this.attProperties['hideDsktop']
      )
    ).toBeTruthy();
    expect(
      await WebUtil.verifyAttributes(
        await this.hideTablet,
        this.attProperties['hideTablet']
      )
    ).toBeTruthy();
    expect(
      await WebUtil.verifyAttributes(
        await this.hideMobile,
        this.attProperties['hideMobile']
      )
    ).toBeTruthy();
  });
});
