import { expect, test } from '@playwright/test';
import { features } from '../../features/milo/marketo.block.spec.js';
import MarketoBlock from '../../selectors/milo/marketo.block.page.js';

let marketoBlock;
const WAIT_TIME = 10000;
const miloLibs = process.env.MILO_LIBS || '';

test.describe('Marketo block test suite', () => {
  test.beforeEach(async ({ page }) => {
    marketoBlock = new MarketoBlock(page);
  });

  features[0].path.forEach((path) => {
    test(`0: @marketo full template, ${features[0].tags}, path: ${path}}`, async ({ page, baseURL }) => {
      const testPage = `${baseURL}${path}${miloLibs}`;
      console.info(`[Test Page]: ${testPage}`);

      await test.step('step-1: Go to the Marketo block full template test page', async () => {
        await page.goto(testPage);
        await page.waitForLoadState('domcontentloaded');
        await expect(page).toHaveURL(testPage);

        // Need this wait to avoid failed form submission during parallel runs
        await page.waitForTimeout(WAIT_TIME);
      });

      await test.step('step-2: check the input field placeholders', async () => {
        await MarketoBlock.checkInputPlaceholders(
          marketoBlock.firstName,
          marketoBlock.lastName,
          marketoBlock.email,
          marketoBlock.company,
          marketoBlock.phone,
          marketoBlock.postalCode,
        );
      });

      await test.step('step-3: Submit the form with valid inputs', async () => {
        await marketoBlock.submitFullTemplateForm();
      });

      await test.step('step-4: Verify the form submission redirect', async () => {
        await expect(page).not.toHaveURL(testPage, { timeout: 10000 });
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

          // Need this wait to avoid failed form submission during parallel runs
          await page.waitForTimeout(WAIT_TIME);
        });

        await test.step('step-2: check the input field placeholders', async () => {
          await MarketoBlock.checkInputPlaceholders(
            marketoBlock.firstName,
            marketoBlock.lastName,
            marketoBlock.email,
            marketoBlock.company,
            marketoBlock.phone,
            marketoBlock.postalCode,
          );
        });

        await test.step('step-3: Submit the form with valid inputs', async () => {
          await marketoBlock.submitFullTemplateForm('Adobe Advertising Cloud');
        });

        await test.step('step-4: Verify the form submission redirect', async () => {
          await expect(page).not.toHaveURL(testPage, { timeout: 10000 });
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

        // Need this wait to avoid failed form submission during parallel runs
        await page.waitForTimeout(WAIT_TIME);
      });

      await test.step('step-2: check the input field placeholders', async () => {
        await MarketoBlock.checkInputPlaceholders(
          marketoBlock.firstName,
          marketoBlock.lastName,
          marketoBlock.email,
          marketoBlock.company,
        );
      });

      await test.step('step-3: Submit the form with valid inputs', async () => {
        await marketoBlock.submitExpandedTemplateForm();
      });

      await test.step('step-4: Verify the form submission redirect', async () => {
        await expect(page).not.toHaveURL(testPage, { timeout: 10000 });
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

        // Need this wait to avoid failed form submission during parallel runs
        await page.waitForTimeout(WAIT_TIME);
      });

      await test.step('step-2: check the input field placeholders', async () => {
        await MarketoBlock.checkInputPlaceholders(
          marketoBlock.firstName,
          marketoBlock.lastName,
          marketoBlock.email,
          marketoBlock.company,
        );
      });

      await test.step('step-3: Submit the form with valid inputs', async () => {
        await marketoBlock.submitEssentialTemplateForm();
      });

      await test.step('step-4: Verify the form submission redirect', async () => {
        await expect(page).not.toHaveURL(testPage, { timeout: 10000 });
      });
    });
  });
});
