import { expect, test } from '@playwright/test';
import { features } from '../../features/milo/figure.block.spec.js';
import FigureBlock from '../../selectors/milo/figure.block.page.js';

let figureBlock;

test.describe('Milo Figure Block test suite', () => {
  test.beforeEach(async ({ page }) => {
    figureBlock = new FigureBlock(page);
  });

  test(`${features[0].name},${features[0].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[0].path}`);

    await test.step('step-1: Go to figure Block test page', async () => {
      await page.goto(`${baseURL}${features[0].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[0].path}`);
    });

    await test.step('step-2: Verify figure block ', async () => {
      const { data } = features[0];
      await expect(await figureBlock.figure).toBeVisible();
      await expect(await figureBlock.image).toBeVisible();
      await expect(await figureBlock.figCaption).toContainText(data.figCaption);
    });
  });

  test(`${features[1].name},${features[1].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[0].path}`);

    await test.step('step-1: Go to figure block test page', async () => {
      await page.goto(`${baseURL}${features[1].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[1].path}`);
    });

    await test.step('step-2: Verify figure block multiple images with caption ', async () => {
      const { data } = features[1];
      await expect(await figureBlock.figure).toHaveCount(data.figBlockCount);
      
      await expect(await figureBlock.image.nth(0)).toBeVisible();
      await expect(await figureBlock.figCaption.nth(0)).toContainText(data.figCaption_1);

      await expect(await figureBlock.image.nth(1)).toBeVisible();
      await expect(await figureBlock.figCaption.nth(1)).toContainText(data.figCaption_2);

    });
  });
});
