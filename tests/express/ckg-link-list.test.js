/* eslint-disable no-plusplus */
import { expect, test } from '@playwright/test';
import { features } from '../../features/express/ckg-link-list.spec.js';
import CkgLinkList from '../../selectors/express/ckg-link-list.page.js';

let ckgLinkList;

test.describe('Ckg Link List Block Test Suite', () => {
  // before each test block
  test.beforeEach(async ({ page }) => {
    ckgLinkList = new CkgLinkList(page);
  });

  test(`${features[0].name},${features[0].tags}`, async ({ page, baseURL }) => {
    console.info(`${baseURL}${features[0].path}`);

    await test.step('Go to CLL block test page', async () => {
      await page.goto(`${baseURL}${features[0].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[0].path}`);
      await page.waitForTimeout(3000);
    });

    await test.step('Verify pills are displayed ', async () => {
      await page.waitForLoadState();
      await ckgLinkList.ckgLinkList.scrollIntoViewIfNeeded();
      await expect(ckgLinkList.ckgLinkList).toBeVisible();
      const totalPills = await ckgLinkList.pill.count();
      expect(totalPills).toBeTruthy();

      for (let i = 0; i < totalPills; i++) {
        const text = await ckgLinkList.pill.nth(i).innerText();
        expect(text.length).toBeTruthy();
      }
    });

    await test.step('Verify arrow buttons', async () => {
      await ckgLinkList.carouselArrowLeftHidden.waitFor();
      await ckgLinkList.carouselArrowRightShow.waitFor();
      await expect(ckgLinkList.carouselArrowRightShow).toHaveCount(1);
      await expect(ckgLinkList.carouselArrowLeftHidden).toHaveCount(1);
    });

    await test.step('Verify scroll using buttons', async () => {
      await page.waitForLoadState();
      await ckgLinkList.ckgLinkList.scrollIntoViewIfNeeded();
      const totalPills = await ckgLinkList.pill.count();
      if (totalPills) {
        await ckgLinkList.rightArrowBtn.click();
        await page.waitForLoadState('domcontentloaded');
        await page.waitForTimeout(2000);
        await ckgLinkList.carouselArrowLeftShow.waitFor();
        await ckgLinkList.carouselArrowRightShow.waitFor();
        expect(ckgLinkList.carouselArrowLeftShow).toHaveCount(1);
        expect(ckgLinkList.carouselArrowRightShow).toHaveCount(1);

        await ckgLinkList.leftArrowBtn.click();
        await ckgLinkList.carouselArrowLeftHidden.waitFor();
        await ckgLinkList.carouselArrowRightShow.waitFor();
        await expect(ckgLinkList.carouselArrowRightShow).toHaveCount(1);
        await expect(ckgLinkList.carouselArrowLeftHidden).toHaveCount(1);
      }
    });

    await test.step('Click pill and go to page ', async () => {
      await ckgLinkList.ckgLinkList.scrollIntoViewIfNeeded();
      await page.waitForLoadState();
      const totalPills = await ckgLinkList.pill.count();

      if (totalPills) {
        const btnText = await ckgLinkList.pill.nth(0).innerText();
        const pageColor = btnText.toLowerCase().replace(' ', '-');
        await ckgLinkList.pill.nth(0).click();
        await page.waitForLoadState('domcontentloaded');
        await expect(page).toHaveURL(`${baseURL}/colors/${pageColor}`);
      }
    });

    // await test.step('Resize and check arrow buttons ', async () => {
    //   await page.setViewportSize({ width: 600, height: 350 });
    //   await ckgLinkList.ckgLinkList.scrollIntoViewIfNeeded();
    //   await page.waitForLoadState();
    //   await page.waitForTimeout(3000);
    //   await ckgLinkList.carouselArrowLeftHidden.waitFor();
    //   await ckgLinkList.carouselArrowRightShow.waitFor();
    //   expect(ckgLinkList.carouselArrowLeftHidden).toHaveCount(1);
    //   expect(ckgLinkList.carouselArrowRightShow).toHaveCount(1);
    // });
  });
});
