import { expect, test } from '@playwright/test';
import { features } from '../../features/acom/brand-concierge.live.spec.js';
import BrandConciergeBlock from '../../selectors/milo/brand-concierge.block.page.js';

let bc;

const BC_RENDER_TIMEOUT = 20000;

test.describe('Brand Concierge - ACOM live pages', () => {
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

        await test.step('step-1: Navigate to the live page with ?promoid=brandcon', async () => {
          await page.goto(testUrl);
          await page.waitForLoadState('domcontentloaded');
        });

        await test.step('step-2: Verify Brand Concierge block renders on the page', async () => {
          // Live pages carry a full gnav + footer and BC is injected by
          // Target / lazily loaded. Wait for attached first, then scroll
          // the block into view so visibility checks are reliable.
          await expect(bc.block).toBeAttached({ timeout: BC_RENDER_TIMEOUT });
          await bc.block.scrollIntoViewIfNeeded();
          await expect(bc.block).toBeVisible({ timeout: BC_RENDER_TIMEOUT });
        });

        if (data.variant === 'inline') {
          await test.step('step-3: Inline variant shows input field and prompt buttons', async () => {
            await bc.inputField.first().waitFor({ state: 'attached', timeout: BC_RENDER_TIMEOUT });
            await expect(bc.inputField.first()).toBeVisible({ timeout: 10000 });
            await expect(bc.promptButtons.first()).toBeVisible({ timeout: 10000 });
          });
        }

        if (data.variant === 'hero') {
          await test.step('step-3: Hero variant renders with input field', async () => {
            await expect(bc.brandConciergeHero).toBeVisible({ timeout: BC_RENDER_TIMEOUT });
            await bc.inputField.first().waitFor({ state: 'attached', timeout: BC_RENDER_TIMEOUT });
            await expect(bc.inputField.first()).toBeVisible({ timeout: 10000 });
          });
        }

        if (data.variant === 'floating') {
          await test.step('step-3: Floating button is attached to the page', async () => {
            await expect(bc.floatingButton).toBeAttached({ timeout: BC_RENDER_TIMEOUT });
          });
        }

        await test.step('step-4: Verify BC web client script is injected', async () => {
          await expect(bc.webClientScript.first()).toBeAttached({ timeout: BC_RENDER_TIMEOUT });
        });
      },
    );
  });
});
