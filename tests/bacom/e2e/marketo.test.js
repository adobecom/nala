import { expect, test } from '@playwright/test';
import MarketoBlock from '../../../selectors/milo/marketo.block.page.js';
import { features } from '../../../features/bacom/e2e/marketo.spec.js';

let marketoBlock;
const WAIT_TIME = 10000;
const miloLibs = process.env.MILO_LIBS || '';

test.describe('Marketo block test suite', () => {
  test.beforeEach(async ({ page }) => {
    marketoBlock = new MarketoBlock(page);
    await test.setTimeout(1000 * 60 * 2);
  });

  features[0].path.forEach((path) => {
    test(`0: Marketo full form, ${features[0].tags}, path: ${path}`, async ({ page, baseURL }) => {
      const params = miloLibs ? `?${miloLibs}&georouting=off` : '?georouting=off';
      const testPage = `${baseURL}${path}${params}`;

      console.info(`[Test Page]: ${testPage}`);

      await test.step('step-1: Go to the test page', async () => {
        await page.goto(testPage);
        await page.waitForLoadState('domcontentloaded');
        await expect(page).toHaveURL(testPage);

        await marketoBlock.marketo.scrollIntoViewIfNeeded();

        // Need this wait to avoid failed form submission during parallel runs
        await page.waitForTimeout(WAIT_TIME);
      });

      await test.step('step-2: check the input field placeholders', async () => {
        await marketoBlock.checkInputPlaceholders();
      });

      await test.step('step-3: Submit the form with valid inputs', async () => {
        await marketoBlock.submitFullTemplateForm();
      });

      await test.step('step-4: Verify the form submission redirect', async () => {
        await page.waitForTimeout(WAIT_TIME);
        const redirectedUrl = await page.url();
        await expect(redirectedUrl).not.toBe(testPage);
        await expect(redirectedUrl).toContain('?submissionid');
      });
    });
  });

  features[1].path.forEach((path) => {
    test(
      `1: Marketo essential template, ${features[1].tags}, path: ${path}`,
      async ({ page, baseURL }) => {
        const params = miloLibs ? `?${miloLibs}&georouting=off` : '?georouting=off';
        const testPage = `${baseURL}${path}${params}`;
        console.info(`[Test Page]: ${testPage}`);

        await test.step('step-1: Go to the Marketo block full template test page', async () => {
          await page.goto(testPage);
          await page.waitForLoadState('domcontentloaded');
          await expect(page).toHaveURL(testPage);

          await marketoBlock.marketo.scrollIntoViewIfNeeded();

          // Need this wait to avoid failed form submission during parallel runs
          await page.waitForTimeout(WAIT_TIME);
        });

        await test.step('step-2: check the input field placeholders', async () => {
          await marketoBlock.checkInputPlaceholders();
        });

        await test.step('step-3: Submit the form with valid inputs', async () => {
          await marketoBlock.submitEssentialTemplateForm();
        });

        await test.step('step-4: Verify the form submission redirect', async () => {
          await page.waitForTimeout(WAIT_TIME);
          const redirectedUrl = await page.url();
          await expect(redirectedUrl).toContain('?submissionid');
        });
      },
    );
  });
});
