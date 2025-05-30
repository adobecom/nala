/* eslint-disable no-plusplus */
import { expect, test } from '@playwright/test';
import { features } from '../../features/express/ax-columns.spec.js';
import AxColumns from '../../selectors/express/ax-columns.page.js';

let axColumns;

test.describe('ax-columns test suite', () => {
  test.beforeEach(async ({ page }) => {
    axColumns = new AxColumns(page);
  });

  features[0].path.forEach((path) => {
    test(`${features[0].name}, path: ${path},`, async ({ baseURL }) => {
      const testPage = `${baseURL}${path}`;
      await axColumns.gotoURL(testPage);
      await axColumns.scrollToAxColumns();

      await test.step('validate elements in block', async () => {
        await expect(axColumns.axColumnsCenterVariant).toBeVisible();
        await expect(axColumns.centerVariantHeading).toBeVisible();
        const contentCount = await axColumns.centerVariantContent.count();
        for (let i = 0; i < contentCount; i++) {
          await expect(axColumns.centerVariantContent.nth(i)).toBeVisible();
          const text = await axColumns.centerVariantContent.nth(i).innerText();
          expect(text.length).toBeTruthy();
        }
      });
    });
  });

  features[1].path.forEach((path) => {
    test(`${features[1].name}, path: ${path}`, async ({ baseURL, page }) => {
      const testPage = `${baseURL}${path}`;
      await axColumns.gotoURL(testPage);
      await axColumns.scrollToAxColumns();

      await test.step('validate elements in block ', async () => {
        await expect(axColumns.axColumnsHighlightVariant.first()).toBeVisible();
        await expect(axColumns.hightlightVariantImage.first()).toBeVisible();
        await expect(axColumns.highlightVariantColumnHeading.first()).toBeVisible();
        const contentCount = await axColumns.highlightVariantColumnContent.count();
        for (let i = 0; i < contentCount; i++) {
          await expect(axColumns.highlightVariantColumnContent.nth(i)).toBeVisible();
          const text = await axColumns.highlightVariantColumnContent.nth(i).innerText();
          expect(text.length).toBeTruthy();
        }
        await expect(axColumns.highlightVariantWatchNowButton.first()).toBeVisible();
        await expect(axColumns.highlightVariantAlternativeVideoSourceWebMButton.first()).toBeVisible();
        await expect(axColumns.highlightVariantAlternateVideoSourceMP4Button.first()).toBeVisible();
      });

      await test.step('test button click', async () => {
        await axColumns.gotoURL(testPage);
        await axColumns.clickHighlightVariantWatchNowButton();
        expect(page.url()).not.toBe(testPage);

        await axColumns.gotoURL(testPage);
        await axColumns.clickAlternativeVideoSourceWebMButton();
        expect(page.url()).not.toBe(testPage);

        await axColumns.gotoURL(testPage);
        await axColumns.clickAlternateVideoSourceMP4Button();
        expect(page.url()).not.toBe(testPage);
      });
    });
  });

  features[2].path.forEach((path) => {
    test(`${features[2].name}, path: ${path}`, async ({ baseURL }) => {
      const testPage = `${baseURL}${path}`;
      await axColumns.gotoURL(testPage);
      await axColumns.scrollToAxColumns();

      await test.step('validate elements in block ', async () => {
        await expect(axColumns.axColumnsCenteredVariant.first()).toBeVisible();
        await expect(axColumns.centeredVariantColumnsVideo.first()).toBeVisible();
        await expect(axColumns.centeredVariantColumn.first()).toBeVisible();
        await expect(axColumns.centeredVariantColumnVideo.first()).toBeVisible();
        await expect(axColumns.centeredVariantColumnPicture.first()).toBeVisible();
        await expect(axColumns.centeredVariantColumnHeading.first()).toBeVisible();
        const contentCount = await axColumns.centerVariantContent.count();
        for (let i = 0; i < contentCount; i++) {
          await expect(axColumns.centeredVariantColumnContent.nth(i)).toBeVisible();
          const text = await axColumns.centeredVariantColumnContent.nth(i).innerText();
          expect(text.length).toBeTruthy();
        }
        await expect(axColumns.centeredVariantVideo.first()).toBeVisible();
        await expect(axColumns.centeredVariantPicture.first()).toBeVisible();
        await expect(axColumns.centeredVariantImage.first()).toBeVisible();
      });
    });
  });

  features[3].path.forEach((path) => {
    test(`${features[3].name}, path: ${path}`, async ({ baseURL }) => {
      const testPage = `${baseURL}${path}`;
      await axColumns.gotoURL(testPage);
      await axColumns.scrollToAxColumns();

      await test.step('validate elements in block ', async () => {
        await expect(axColumns.axColumnsTopCenterVariant).toBeVisible();
        const columnsCount = await axColumns.topCenterVariantColumn.count();
        expect(columnsCount).toEqual(3);
        await expect(axColumns.topCenterVariantColumn.first()).toBeVisible();
        await expect(axColumns.topCenterVariantPicture.first()).toBeVisible();
        await expect(axColumns.topCenterVariantColumnHeading.first()).toBeVisible();
        const contentCount = await axColumns.topCenterVariantContent.first().count();
        expect(contentCount).toBeGreaterThanOrEqual(0);
        await expect(axColumns.topCenterVariantContent.last()).toBeVisible();
        const text = await axColumns.topCenterVariantContent.last().innerText();
        expect(text.length).toBeTruthy();
      });
    });
  });

  features[4].path.forEach((path) => {
    test(`${features[4].name}, path: ${path}`, async ({ baseURL, page }) => {
      const testPage = `${baseURL}${path}`;
      await axColumns.gotoURL(testPage);
      await axColumns.scrollToAxColumns();

      await test.step('validate elements in block ', async () => {
        await expect(axColumns.axColumnsFullsizeVariant).toBeVisible();
        await expect(axColumns.fullsizeVariantColumn.first()).toBeVisible();
        await expect(axColumns.fullsizeVariantColumn.last()).toBeVisible();
        await expect(axColumns.fullsizeVariantColumnHeading).toBeVisible();
        const contentCount = await axColumns.fullsizeVariantColumnContent.count();
        expect(contentCount).toBeGreaterThanOrEqual(0);
        await expect(axColumns.fullsizeVariantPicture).toBeVisible();
      });

      await test.step('test button click', async () => {
        await axColumns.gotoURL(testPage);
        await axColumns.clickFullsizeVariantDesignNowButton();
        expect(page.url()).not.toBe(testPage);
      });
    });
  });

  features[5].path.forEach((path) => {
    test(`${features[5].name}, path: ${path}`, async ({ baseURL, page }) => {
      const testPage = `${baseURL}${path}`;
      await axColumns.gotoURL(testPage);
      await axColumns.scrollToAxColumns();

      await test.step('validate elements in block ', async () => {
        await expect(axColumns.fullsizeCenterVariantColumnsVideo.first()).toBeVisible();
        await expect(axColumns.fullsizeCenterVariantColumn.first()).toBeVisible();
        await expect(axColumns.fullsizeCenterVariantColumnHeading.first()).toBeVisible();
        const contentCount = await axColumns.fullsizeCenterVariantColumnContent.count();
        expect(contentCount).toBeGreaterThanOrEqual(0);
        expect(axColumns.fullsizeCenterVariantMakeYourLogoNowButton).toBeEnabled();
      });

      await test.step('test button click', async () => {
        await axColumns.gotoURL(testPage);
        await axColumns.clickFullsizeCenterVariantMakeYourLogoNowButton();
        expect(page.url()).not.toBe(testPage);
      });
    });
  });

  features[6].path.forEach((path) => {
    test(`${features[6].name}, path: ${path}`, async ({ baseURL }) => {
      const testPage = `${baseURL}${path}`;
      await axColumns.gotoURL(testPage);
      await axColumns.scrollToAxColumns();

      await test.step('validate elements in block ', async () => {
        await expect(axColumns.darkVariantColumn.first()).toBeVisible();
        await expect(axColumns.darkVariantColumn.last()).toBeVisible();
        await expect(axColumns.darkVariantColumnPicture.first()).toBeVisible();
        await expect(axColumns.darkVariantPicture.first()).toBeVisible();
        await expect(axColumns.darkVariantImage.first()).toBeVisible();
      });
    });
  });

  features[7].path.forEach((path) => {
    test(`${features[7].name}, path: ${path}`, async ({ baseURL, page }) => {
      const testPage = `${baseURL}${path}`;
      await axColumns.gotoURL(testPage);
      await axColumns.scrollToAxColumns();

      await test.step('validate elements in block ', async () => {
        await expect(axColumns.axColumnsLightVariant).toBeVisible();
        await expect(axColumns.lightVariantColumn.first()).toBeVisible();
        await expect(axColumns.lightVariantColumn.last()).toBeVisible();
        await expect(axColumns.lightVariantColumnPicture.first()).toBeVisible();
        await expect(axColumns.lightVariantPicture.first()).toBeVisible();
        await expect(axColumns.lightVariantImage.first()).toBeVisible();
        const contentCount = await axColumns.lightVariantColumnContent.count();
        expect(contentCount).toBeGreaterThanOrEqual(0);
        await expect(axColumns.lightVariantPicture).toBeVisible();
      });

      await test.step('test button click', async () => {
        await axColumns.gotoURL(testPage);
        await axColumns.clickLightVariantStartNowItsFreeButton();
        expect(page.url()).not.toBe(testPage);
      });
    });
  });

  features[8].path.forEach((path) => {
    test(`${features[8].name}, path: ${path}`, async ({ baseURL }) => {
      const testPage = `${baseURL}${path}`;
      await axColumns.gotoURL(testPage);
      await axColumns.scrollToAxColumns();

      await test.step('validate elements in block ', async () => {
        await expect(axColumns.axColumnsNumbered30Variant).toBeVisible();
        const columnCount = await axColumns.numbered30VariantColumn.count();
        expect(columnCount).toEqual(4);
        const columnHeading = await axColumns.numbered30VariantColumnHeading.count();
        expect(columnHeading).toEqual(2);
        await expect(axColumns.numbered30VariantColumn.first()).toBeVisible();
        await expect(axColumns.numbered30VariantColumn.nth(1)).toBeVisible();
        await expect(axColumns.numbered30VariantColumn.nth(2)).toBeVisible();
        await expect(axColumns.numbered30VariantColumn.last()).toBeVisible();
        await expect(axColumns.numbered30VariantColumnHeading.first()).toBeVisible();
        await expect(axColumns.numbered30VariantColumnHeading.last()).toBeVisible();
      });
    });
  });
});
