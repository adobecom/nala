import { expect, test } from '@playwright/test';
import MarketoBlock from '../../../selectors/milo/marketo.block.page.js';
import { features } from '../../../features/bacom/e2e/marketo.e2e.spec.js';

let marketoBlock;
const miloLibs = process.env.MILO_LIBS || '';

test.describe('Marketo block test suite', () => {
  test.beforeEach(async ({ page }) => {
    marketoBlock = new MarketoBlock(page);
    await test.setTimeout(1000 * 60 * 3);
  });

  features[0].path.forEach((path) => {
    test(`0: Marketo full form, ${features[0].tags}, path: ${path}`, async ({ page, baseURL }) => {
      const params = miloLibs ? `${miloLibs}&georouting=off` : '?georouting=off';
      const testPage = `${baseURL}${path}${params}`;

      console.info(`[Test Page]: ${testPage}`);

      await test.step('step-1: Go to the test page', async () => {
        await page.goto(testPage);
        await page.waitForLoadState('domcontentloaded');
        await expect(page).toHaveURL(testPage);

        await expect(async () => {
          await marketoBlock.marketo.scrollIntoViewIfNeeded();
          await expect(marketoBlock.email).toBeVisible({ timeout: 10000 });
        }).toPass({
          intervals: [3000],
          timeout: 60000,
        });
      });

      await test.step('step-2: check the input field placeholders', async () => {
        await marketoBlock.checkInputPlaceholders();
      });

      await test.step('step-3: Submit the form with valid inputs', async () => {
        await marketoBlock.submitFullTemplateForm();
      });

      await test.step('step-4: Verify the form submission redirect', async () => {
        await expect(async () => {
          await marketoBlock.submitButton.waitFor({ state: 'detached' });
          const redirectedUrl = await page.url();
          await expect(redirectedUrl).toContain('?submissionid');
        }).toPass();
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
          await expect(marketoBlock.email).toBeVisible({ timeout: 8000 });
        });

        await test.step('step-2: check the input field placeholders', async () => {
          await marketoBlock.checkInputPlaceholders();
        });

        await test.step('step-3: Submit the form with valid inputs', async () => {
          await marketoBlock.submitEssentialTemplateForm();
        });

        await test.step('step-4: Verify the form submission redirect', async () => {
          await expect(async () => {
            await marketoBlock.submitButton.waitFor({ state: 'detached' });
            const redirectedUrl = await page.url();
            await expect(redirectedUrl).toContain('?submissionid');
          }).toPass();
        });
      },
    );
  });
});
