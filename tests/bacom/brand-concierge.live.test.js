import { expect, test } from '@playwright/test';
import { features } from '../../features/bacom/brand-concierge.live.spec.js';
import BrandConciergeBlock from '../../selectors/milo/brand-concierge.block.page.js';

let bc;

const BC_RENDER_TIMEOUT = 20000;

test.describe('Brand Concierge - BACOM live pages', () => {
  test.beforeEach(async ({ page }) => {
    bc = new BrandConciergeBlock(page);
  });

  features.forEach((feature) => {
    test(
      `[Test Id - ${feature.tcid}] ${feature.name}, ${feature.tags}`,
      async ({ page, baseURL }) => {
        const testUrl = `${baseURL}${feature.path}`;
        const { data } = feature;
        console.info(`[Test Page]: ${testUrl}`);

        await test.step('step-1: Navigate to BACOM live page', async () => {
          await page.goto(testUrl);
          await page.waitForLoadState('domcontentloaded');
        });

        if (data.variant === 'inline') {
          await test.step('step-2: Inline block is attached, scrolled into view, visible', async () => {
            await expect(bc.block).toBeAttached({ timeout: BC_RENDER_TIMEOUT });
            await bc.block.scrollIntoViewIfNeeded();
            await expect(bc.block).toBeVisible({ timeout: BC_RENDER_TIMEOUT });
          });

          await test.step('step-3: Inline variant has input field and prompt buttons', async () => {
            await bc.inputField.first().waitFor({ state: 'attached', timeout: BC_RENDER_TIMEOUT });
            await expect(bc.inputField.first()).toBeVisible({ timeout: 10000 });
            await expect(bc.promptButtons.first()).toBeVisible({ timeout: 10000 });
          });
        }

        if (data.variant === 'floating') {
          await test.step('step-2: Floating button is attached to the page', async () => {
            await expect(bc.floatingButton).toBeAttached({ timeout: BC_RENDER_TIMEOUT });
          });
        }

        await test.step('step-final: Verify BC web client script is injected', async () => {
          await expect(bc.webClientScript.first()).toBeAttached({ timeout: BC_RENDER_TIMEOUT });
        });
      },
    );
  });
});
