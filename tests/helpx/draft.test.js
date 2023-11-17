import { expect, test } from '@playwright/test';
import { features } from '../../features/helpx/draft.spec.js';
import { Draft } from '../../selectors/helpx/draft.page.js';

let draft;

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
  draft = new Draft(page);
  await page.goto(`${baseURL}${features[0].path}`);
  await page.waitForLoadState('networkidle');
});

test.describe('Draft sanity test suite', () => {
  // Draft Sanity Checks:
  test(`${features[0].name}, ${features[0].tags}`, async ({
    page,
    baseURL,
  }) => {
    console.info(`[Test Page]: ${baseURL}${features[0].path}`);
    await test.step('Navigate to Draft page', async () => {
      await expect(page).toHaveURL(`${baseURL}${features[0].path}`);
    });

    // Check procedure present
    await expect(draft.procedure).toBeVisible();

    // Check beforeAftr present
    await expect(draft.beforeAftr).toBeVisible();

    // Check codeBlock present
    await expect(draft.codeBlock).toBeVisible();

    // Check generic present
    await expect(draft.generic).toBeVisible();

    expect(
      await WebUtil.verifyCSS(
        await this.procedure,
        this.cssProperties['procedure']
      )
    ).toBeTruthy();
    expect(
      await WebUtil.verifyCSS(
        await this.beforeAftr,
        this.cssProperties['beforeAftr']
      )
    ).toBeTruthy();
    expect(
      await WebUtil.verifyCSS(
        await this.codeBlock,
        this.cssProperties['codeBlock']
      )
    ).toBeTruthy();
    expect(
      await WebUtil.verifyCSS(await this.generic, this.cssProperties['generic'])
    ).toBeTruthy();

    expect(
      await WebUtil.verifyAttributes(
        await this.procedure,
        this.attProperties['procedure']
      )
    ).toBeTruthy();
    expect(
      await WebUtil.verifyAttributes(
        await this.beforeAftr,
        this.attProperties['beforeAftr']
      )
    ).toBeTruthy();
    expect(
      await WebUtil.verifyAttributes(
        await this.codeBlock,
        this.attProperties['codeBlock']
      )
    ).toBeTruthy();
    expect(
      await WebUtil.verifyAttributes(
        await this.generic,
        this.attProperties['generic']
      )
    ).toBeTruthy();
  });
});
