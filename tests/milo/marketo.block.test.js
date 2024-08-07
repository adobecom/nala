import { expect, test } from '@playwright/test';
import { features } from '../../features/milo/marketo.block.spec.js';
import MarketoBlock from '../../selectors/milo/marketo.block.page.js';

let marketoBlock;
const miloLibs = process.env.MILO_LIBS || '';

test.describe('Marketo block test suite', () => {
  test.beforeEach(async ({ page, browserName }) => {
    if (browserName === 'chromium') test.skip('TODO: debug why this is failing on github actions');

    marketoBlock = new MarketoBlock(page);
    await test.setTimeout(1000 * 60 * 3);
  });

  features[0].path.forEach((path) => {
    test(`0: @marketo full template, ${features[0].tags}, path: ${path}`, async ({ page, baseURL }) => {
      const testPage = `${baseURL}${path}${miloLibs}`;
      console.info(`[Test Page]: ${testPage}`);

      await test.step('step-1: Go to the Marketo block full template test page', async () => {
        await page.goto(testPage);
        await page.waitForLoadState('domcontentloaded');
        await expect(page).toHaveURL(testPage);
        await expect(marketoBlock.email).toBeVisible({ timeout: 8000 });
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
      `1: @marketo full template with company type, ${features[1].tags}, path: ${path}`,
      async ({ page, baseURL }) => {
        const testPage = `${baseURL}${path}${miloLibs}`;
        console.info(`[Test Page]: ${testPage}`);

        await test.step('step-1: Go to the Marketo block full template test page', async () => {
          await page.goto(testPage);
          await page.waitForLoadState('domcontentloaded');
          await expect(page).toHaveURL(testPage);
          await expect(marketoBlock.email).toBeVisible({ timeout: 8000 });
        });

        await test.step('step-2: check the input field placeholders', async () => {
          await marketoBlock.checkInputPlaceholders();
        });

        await test.step('step-3: Submit the form with valid inputs', async () => {
          await marketoBlock.submitFullTemplateForm('Digital commerce');
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

  features[2].path.forEach((path) => {
    test(`2: @marketo expanded template, ${features[2].tags}}, path: ${path}`, async ({ page, baseURL }) => {
      const testPage = `${baseURL}${path}${miloLibs}`;
      console.info(`[Test Page]: ${testPage}`);

      await test.step('step-1: Go to the Marketo block expanded template test page', async () => {
        await page.goto(testPage);
        await page.waitForLoadState('domcontentloaded');
        await expect(page).toHaveURL(testPage);
        await expect(marketoBlock.email).toBeVisible({ timeout: 8000 });
      });

      await test.step('step-2: check the input field placeholders', async () => {
        await marketoBlock.checkInputPlaceholders();
      });

      await test.step('step-3: Submit the form with valid inputs', async () => {
        await marketoBlock.submitExpandedTemplateForm();
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

  features[3].path.forEach((path) => {
    test(`3: @marketo essential template, ${features[3].tags}, path: ${path}`, async ({ page, baseURL }) => {
      const testPage = `${baseURL}${path}${miloLibs}`;
      console.info(`[Test Page]: ${testPage}`);

      await test.step('step-1: Go to the Marketo block essential template test page', async () => {
        await page.goto(testPage);
        await page.waitForLoadState('domcontentloaded');
        await expect(page).toHaveURL(testPage);
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
    });
  });
});
