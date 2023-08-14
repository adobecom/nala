import { expect, test } from '@playwright/test';
import { features } from '../../features/milo/aside.block.spec.js';
import AsideBlock from '../../selectors/milo/aside.block.page.js';

test.describe('Aside Block test suite', () => {
  // Aside Small Checks:
  test(`${features[0].name}, ${features[0].tags}`, async ({ page, baseURL }) => {
    const Aside = new AsideBlock(page);
    console.info(`[MiloInfo] Checking page: ${baseURL}${features[0].path}`);

    await test.step('Navigate to page with Aside block', async () => {
      await page.goto(`${baseURL}${features[0].path}${features[0].browserParams}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[0].path}${features[0].browserParams}`);
    });

    await test.step('Validate Aside block content', async () => {
      await expect(Aside.asideSmall).toBeVisible();
      await expect(Aside.icon).toBeVisible();
      await expect(Aside.image).toBeVisible();
      await expect(Aside.actionArea).toBeVisible();
      await expect(Aside.detailLabel).toBeVisible();
      await expect(Aside.h2TitleXLarge).toBeVisible();
      await expect(Aside.textFieldSmall).toBeVisible();
      // Check Aside block buttons:
      await expect(Aside.linkTextCta).toBeVisible();
      await expect(Aside.blueButtonCta).toBeVisible();
      await expect(Aside.blackButtonCta).toBeVisible();
      expect(await Aside.actionButtons.count()).toEqual(2);
      // Check Aside block background:
      const bgdColor = await Aside.asideSmall.evaluate(
        (e) => window.getComputedStyle(e).getPropertyValue('background-color'),
      );
      expect(bgdColor).toBe('rgb(238, 238, 238)');
    });
  });

  // Aside Medium Checks:
  test(`${features[1].name}, ${features[1].tags}`, async ({ page, baseURL }) => {
    const Aside = new AsideBlock(page);
    console.info(`[MiloInfo] Checking page: ${baseURL}${features[1].path}`);

    await test.step('Navigate to page with Aside block', async () => {
      await page.goto(`${baseURL}${features[1].path}${features[1].browserParams}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[1].path}${features[1].browserParams}`);
    });

    await test.step('Validate Aside block content', async () => {
      await expect(Aside.asideMedium).toBeVisible();
      await expect(Aside.icon).toBeVisible();
      await expect(Aside.image).toBeVisible();
      await expect(Aside.actionArea).toBeVisible();
      await expect(Aside.detailLabel).toBeVisible();
      await expect(Aside.h3TitleXLarge).toBeVisible();
      await expect(Aside.textFieldSmall).toBeVisible();
      // Check Aside block buttons:
      await expect(Aside.blueButtonCta).not.toBeVisible();
      await expect(Aside.blackButtonCta).toBeVisible();
      await expect(Aside.linkTextCta).toBeVisible();
      expect(await Aside.actionButtons.count()).toEqual(2);
      // Check Aside block background:
      const bgdColor = await Aside.asideMedium.evaluate((e) => window.getComputedStyle(e).getPropertyValue('background-color'));
      expect(bgdColor).toBe('rgb(238, 238, 238)');
    });
  });

  // Aside Large Checks:
  test(`${features[2].name}, ${features[2].tags}`, async ({ page, baseURL }) => {
    const Aside = new AsideBlock(page);
    console.info(`[MiloInfo] Checking page: ${baseURL}${features[2].path}`);

    await test.step('Navigate to page with Aside block', async () => {
      await page.goto(`${baseURL}${features[2].path}${features[2].browserParams}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[2].path}${features[2].browserParams}`);
    });

    await test.step('Validate Aside block content', async () => {
      await expect(Aside.asideLarge).toBeVisible();
      await expect(Aside.icon).toBeVisible();
      await expect(Aside.image).toBeVisible();
      await expect(Aside.actionArea).toBeVisible();
      await expect(Aside.detailLabel).toBeVisible();
      await expect(Aside.h3TitleXLarge).toBeVisible();
      await expect(Aside.textFieldSmall).toBeVisible();
      // Check Aside block buttons:
      await expect(Aside.blueButtonCta).toBeVisible();
      await expect(Aside.blackButtonCta).not.toBeVisible();
      await expect(Aside.linkTextCta).toBeVisible();
      expect(await Aside.actionButtons.count()).toEqual(2);
      // Check Aside block background:
      const bgdColor = await Aside.asideLarge.evaluate((e) => window.getComputedStyle(e).getPropertyValue('background-color'));
      expect(bgdColor).toBe('rgb(238, 238, 238)');
    });
  });

  // Aside Split Small Dark Checks:
  test(`${features[3].name}, ${features[3].tags}`, async ({ page, baseURL }) => {
    const Aside = new AsideBlock(page);
    console.info(`[MiloInfo] Checking page: ${baseURL}${features[3].path}`);

    await test.step('Navigate to page with Aside block', async () => {
      await page.goto(`${baseURL}${features[3].path}${features[3].browserParams}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[3].path}${features[3].browserParams}`);
    });

    await test.step('Validate Aside block content', async () => {
      await expect(Aside.asideSplitSmallDark).toBeVisible();
      await expect(Aside.icon).not.toBeVisible();
      await expect(Aside.image).toBeVisible();
      await expect(Aside.actionArea).toBeVisible();
      await expect(Aside.detailLabel).toBeVisible();
      await expect(Aside.h3TitleXLarge).toBeVisible();
      await expect(Aside.textFieldSmall).toBeVisible();
      // Check Aside block buttons:
      await expect(Aside.blueButtonCta).toBeVisible();
      await expect(Aside.blackButtonCta).toBeVisible();
      await expect(Aside.linkTextCta).not.toBeVisible();
      expect(await Aside.actionButtons.count()).toEqual(2);
      // Check Aside block background:
      const bgdColor = await Aside.asideSplitSmallDark.evaluate((e) => window.getComputedStyle(e).getPropertyValue('background-color'));
      expect(bgdColor).toBe('rgb(17, 17, 17)');
    });
  });

  // Aside Split Small Half Dark Checks:
  test(`${features[4].name}, ${features[4].tags}`, async ({ page, baseURL }) => {
    const Aside = new AsideBlock(page);
    console.info(`[MiloInfo] Checking page: ${baseURL}${features[4].path}`);

    await test.step('Navigate to page with Aside block', async () => {
      await page.goto(`${baseURL}${features[4].path}${features[4].browserParams}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[4].path}${features[4].browserParams}`);
    });

    await test.step('Validate Aside block content', async () => {
      await expect(Aside.asideSplitSmallHalfDark).toBeVisible();
      await expect(Aside.icon).not.toBeVisible();
      await expect(Aside.image).toBeVisible();
      await expect(Aside.actionArea).toBeVisible();
      await expect(Aside.detailLabel).toBeVisible();
      await expect(Aside.h3TitleXLarge).toBeVisible();
      await expect(Aside.textFieldSmall).toBeVisible();
      // Check Aside block buttons:
      await expect(Aside.blueButtonCta).toBeVisible();
      await expect(Aside.blackButtonCta).toBeVisible();
      await expect(Aside.linkTextCta).not.toBeVisible();
      expect(await Aside.actionButtons.count()).toEqual(2);
      // Check Aside block background:
      const bgdColor = await Aside.asideSplitSmallHalfDark.evaluate((e) => window.getComputedStyle(e).getPropertyValue('background-color'));
      expect(bgdColor).toBe('rgb(17, 17, 17)');
    });
  });

  // Aside Split Medium Checks:
  test(`${features[5].name}, ${features[5].tags}`, async ({ page, baseURL }) => {
    const Aside = new AsideBlock(page);
    console.info(`[MiloInfo] Checking page: ${baseURL}${features[5].path}`);

    await test.step('Navigate to page with Aside block', async () => {
      await page.goto(`${baseURL}${features[5].path}${features[5].browserParams}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[5].path}${features[5].browserParams}`);
    });

    await test.step('Validate Aside block content', async () => {
      await expect(Aside.asideSplitMedium).toBeVisible();
      await expect(Aside.icon).not.toBeVisible();
      await expect(Aside.image).toBeVisible();
      await expect(Aside.actionArea).toBeVisible();
      await expect(Aside.detailLabel).toBeVisible();
      await expect(Aside.h3TitleXLarge).toBeVisible();
      await expect(Aside.textFieldSmall).toBeVisible();
      // Check Aside block buttons:
      await expect(Aside.blueButtonCta).toBeVisible();
      await expect(Aside.blackButtonCta).toBeVisible();
      await expect(Aside.linkTextCta).not.toBeVisible();
      expect(await Aside.actionButtons.count()).toEqual(2);
      // Check Aside block background:
      const bgdColor = await Aside.asideSplitMedium.evaluate((e) => window.getComputedStyle(e).getPropertyValue('background-color'));
      expect(bgdColor).toBe('rgb(249, 249, 249)');
    });
  });

  // Aside Split Medium Half Checks:
  test(`${features[6].name}, ${features[6].tags}`, async ({ page, baseURL }) => {
    const Aside = new AsideBlock(page);
    console.info(`[MiloInfo] Checking page: ${baseURL}${features[6].path}`);

    await test.step('Navigate to page with Aside block', async () => {
      await page.goto(`${baseURL}${features[6].path}${features[6].browserParams}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[6].path}${features[6].browserParams}`);
    });

    await test.step('Validate Aside block content', async () => {
      await expect(Aside.asideSplitMedidumHalf).toBeVisible();
      await expect(Aside.icon).not.toBeVisible();
      await expect(Aside.image).toBeVisible();
      await expect(Aside.actionArea).toBeVisible();
      await expect(Aside.detailLabel).toBeVisible();
      await expect(Aside.h3TitleXLarge).toBeVisible();
      await expect(Aside.textFieldSmall).toBeVisible();
      // Check Aside block buttons:
      await expect(Aside.blueButtonCta).toBeVisible();
      await expect(Aside.blackButtonCta).toBeVisible();
      await expect(Aside.linkTextCta).not.toBeVisible();
      expect(await Aside.actionButtons.count()).toEqual(2);
      // Check Aside block background:
      const bgdColor = await Aside.asideSplitMedidumHalf.evaluate((e) => window.getComputedStyle(e).getPropertyValue('background-color'));
      expect(bgdColor).toBe('rgb(249, 249, 249)');
    });
  });

  // Aside Split Large Checks:
  test(`${features[7].name}, ${features[7].tags}`, async ({ page, baseURL }) => {
    const Aside = new AsideBlock(page);
    console.info(`[MiloInfo] Checking page: ${baseURL}${features[7].path}`);

    await test.step('Navigate to page with Aside block', async () => {
      await page.goto(`${baseURL}${features[7].path}${features[7].browserParams}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[7].path}${features[7].browserParams}`);
    });

    await test.step('Validate Aside block content', async () => {
      await expect(Aside.asideSplitLarge).toBeVisible();
      await expect(Aside.icon).not.toBeVisible();
      await expect(Aside.image).toBeVisible();
      await expect(Aside.actionArea).toBeVisible();
      await expect(Aside.detailLabel).toBeVisible();
      await expect(Aside.h3TitleXLarge).toBeVisible();
      await expect(Aside.textFieldSmall).toBeVisible();
      // Check Aside block buttons:
      await expect(Aside.blueButtonCta).toBeVisible();
      await expect(Aside.blackButtonCta).toBeVisible();
      await expect(Aside.linkTextCta).not.toBeVisible();
      expect(await Aside.actionButtons.count()).toEqual(2);
      // Check Aside block background:
      const bgdColor = await Aside.asideSplitLarge.evaluate((e) => window.getComputedStyle(e).getPropertyValue('background-color'));
      expect(bgdColor).toBe('rgb(249, 249, 249)');
    });
  });

  // !Note: Currently, the aside-split-large-half-dark page cannot
  //        be published, thus skipping the next test until fixed.
  //
  // Aside Split Large Half Dark Checks:
  test.skip(`${features[8].name}, ${features[8].tags}`, async ({ page, baseURL }) => {
    const Aside = new AsideBlock(page);
    console.info(`[MiloInfo] Checking page: ${baseURL}${features[8].path}`);

    await test.step('Navigate to page with Aside block', async () => {
      await page.goto(`${baseURL}${features[8].path}${features[8].browserParams}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[8].path}${features[8].browserParams}`);
    });

    await test.step('Validate Aside block content', async () => {
      await expect(Aside.asideSplitLargeHalfDark).toBeVisible();
      await expect(Aside.icon).not.toBeVisible();
      await expect(Aside.image).toBeVisible();
      await expect(Aside.actionArea).toBeVisible();
      await expect(Aside.detailLabel).toBeVisible();
      await expect(Aside.h3TitleXLarge).toBeVisible();
      await expect(Aside.textFieldSmall).toBeVisible();
      // Check Aside block buttons:
      await expect(Aside.blueButtonCta).toBeVisible();
      await expect(Aside.blackButtonCta).toBeVisible();
      await expect(Aside.linkTextCta).not.toBeVisible();
      expect(await Aside.actionButtons.count()).toEqual(2);
      // Check Aside block background:
      const bgdColor = await Aside.asideSplitLargeHalfDark.evaluate((e) => window.getComputedStyle(e).getPropertyValue('background-color'));
      expect(bgdColor).toBe('rgb(17, 17, 17)');
    });
  });

  // Aside Inline Checks:
  test(`${features[9].name}, ${features[9].tags}`, async ({ page, baseURL }) => {
    const Aside = new AsideBlock(page);
    console.info(`[MiloInfo] Checking page: ${baseURL}${features[9].path}`);

    await test.step('Navigate to page with Aside block', async () => {
      await page.goto(`${baseURL}${features[9].path}${features[9].browserParams}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[9].path}${features[9].browserParams}`);
    });

    await test.step('Validate Aside block content', async () => {
      await expect(Aside.asideInline).toBeVisible();
      await expect(Aside.icon).not.toBeVisible();
      await expect(Aside.image).toBeVisible();
      await expect(Aside.actionArea).toBeVisible();
      await expect(Aside.detailLabel).not.toBeVisible();
      await expect(Aside.h3TitleSmall).toBeVisible();
      await expect(Aside.textFieldMedium).toBeVisible();
      // Check Aside block buttons:
      await expect(Aside.blueButtonCta).not.toBeVisible();
      await expect(Aside.blackButtonCta).toBeVisible();
      await expect(Aside.linkTextCta).not.toBeVisible();
      expect(await Aside.actionButtons.count()).toEqual(1);
      // Check Aside block background:
      const bgdColor = await Aside.asideInline.evaluate((e) => window.getComputedStyle(e).getPropertyValue('background-color'));
      expect(bgdColor).toBe('rgb(245, 245, 245)');
    });
  });

  // Aside Inline Dark Checks:
  test(`${features[10].name}, ${features[10].tags}`, async ({ page, baseURL }) => {
    const Aside = new AsideBlock(page);
    console.info(`[MiloInfo] Checking page: ${baseURL}${features[10].path}`);

    await test.step('Navigate to page with Aside block', async () => {
      await page.goto(`${baseURL}${features[10].path}${features[10].browserParams}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[10].path}${features[10].browserParams}`);
    });

    await test.step('Validate Aside block content', async () => {
      await expect(Aside.asideInline).toBeVisible();
      await expect(Aside.icon).not.toBeVisible();
      await expect(Aside.image).toBeVisible();
      await expect(Aside.actionArea).toBeVisible();
      await expect(Aside.detailLabel).not.toBeVisible();
      await expect(Aside.h3TitleSmall).toBeVisible();
      await expect(Aside.textFieldMedium).toBeVisible();
      // Check Aside block buttons:
      await expect(Aside.blueButtonCta).not.toBeVisible();
      await expect(Aside.blackButtonCta).toBeVisible();
      await expect(Aside.linkTextCta).not.toBeVisible();
      expect(await Aside.actionButtons.count()).toEqual(1);
      // Check Aside block background:
      const bgdColor = await Aside.asideInline.evaluate((e) => window.getComputedStyle(e).getPropertyValue('background-color'));
      expect(bgdColor).toBe('rgb(17, 17, 17)');
    });
  });

  // Aside Notification Extra Small Dark:
  test(`${features[11].name}, ${features[11].tags}`, async ({ page, baseURL }) => {
    const Aside = new AsideBlock(page);
    console.info(`[MiloInfo] Checking page: ${baseURL}${features[11].path}`);

    await test.step('Navigate to page with Aside block', async () => {
      await page.goto(`${baseURL}${features[11].path}${features[11].browserParams}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[11].path}${features[11].browserParams}`);
    });

    await test.step('Validate Aside block content', async () => {
      await expect(Aside.asideNotifExtraSmallDark).toBeVisible();
      await expect(Aside.icon).not.toBeVisible();
      await expect(Aside.noImage).toBeVisible();
      await expect(Aside.actionArea).not.toBeVisible();
      await expect(Aside.detailLabel).not.toBeVisible();
      await expect(Aside.h2TitleSmall).not.toBeVisible();
      await expect(Aside.h2TitleXLarge).not.toBeVisible();
      await expect(Aside.h3TitleSmall).not.toBeVisible();
      await expect(Aside.h3TitleXLarge).not.toBeVisible();
      await expect(Aside.textFieldSmall).not.toBeVisible();
      await expect(Aside.textFieldMedium).not.toBeVisible();
      await expect(Aside.textFieldLarge).not.toBeVisible();
      // Check Aside block buttons:
      await expect(Aside.linkTextCta.first()).toBeVisible();
      await expect(Aside.blueButtonCta).not.toBeVisible();
      await expect(Aside.blackButtonCta).not.toBeVisible();
      expect(await Aside.actionLinks.count()).toEqual(2);
      // Check Aside block background:
      const bgdColor = await Aside.asideNotifExtraSmallDark.evaluate((e) => window.getComputedStyle(e).getPropertyValue('background-color'));
      expect(bgdColor).toBe('rgb(17, 17, 17)');
    });
  });

  // Aside Notification Small:
  test(`${features[12].name}, ${features[12].tags}`, async ({ page, baseURL }) => {
    const Aside = new AsideBlock(page);
    console.info(`[MiloInfo] Checking page: ${baseURL}${features[12].path}`);

    await test.step('Navigate to page with Aside block', async () => {
      await page.goto(`${baseURL}${features[12].path}${features[12].browserParams}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[12].path}${features[12].browserParams}`);
    });

    await test.step('Validate Aside block content', async () => {
      await expect(Aside.asideNotifSmall).toBeVisible();
      await expect(Aside.icon).toBeVisible();
      await expect(Aside.image).not.toBeVisible();
      await expect(Aside.actionArea).toBeVisible();
      await expect(Aside.detailLabel).not.toBeVisible();
      await expect(Aside.h2TitleSmall).not.toBeVisible();
      await expect(Aside.h2TitleXLarge).not.toBeVisible();
      await expect(Aside.h3TitleSmall).not.toBeVisible();
      await expect(Aside.h3TitleXLarge).not.toBeVisible();
      await expect(Aside.textFieldMedium).toBeVisible();
      // Check Aside block buttons:
      await expect(Aside.blueButtonCta).not.toBeVisible();
      await expect(Aside.blackButtonCta).toBeVisible();
      await expect(Aside.linkTextCta).toBeVisible();
      expect(await Aside.actionButtons.count()).toEqual(1);
      // Check Aside block background:
      const bgdColor = await Aside.asideNotifSmall.evaluate((e) => window.getComputedStyle(e).getPropertyValue('background-color'));
      expect(bgdColor).toBe('rgb(171, 171, 171)');
    });
  });

  // Aside Notification Medium:
  test(`${features[13].name}, ${features[13].tags}`, async ({ page, baseURL }) => {
    const Aside = new AsideBlock(page);
    console.info(`[MiloInfo] Checking page: ${baseURL}${features[13].path}`);

    await test.step('Navigate to page with Aside block', async () => {
      await page.goto(`${baseURL}${features[13].path}${features[13].browserParams}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[13].path}${features[13].browserParams}`);
    });

    await test.step('Validate Aside block content', async () => {
      await expect(Aside.asideNotifMedium).toBeVisible();
      await expect(Aside.icon).not.toBeVisible();
      await expect(Aside.image).toBeVisible();
      await expect(Aside.actionArea).toBeVisible();
      await expect(Aside.detailLabel).not.toBeVisible();
      await expect(Aside.h3TitleSmall).toBeVisible();
      await expect(Aside.textFieldSmall).toBeVisible();
      // Check Aside block buttons:
      await expect(Aside.blueButtonCta).not.toBeVisible();
      await expect(Aside.blackButtonCta).toBeVisible();
      await expect(Aside.linkTextCta).toBeVisible();
      expect(await Aside.actionButtons.count()).toEqual(1);
      // Check Aside block background:
      const bgdColor = await Aside.asideNotifMedium.evaluate((e) => window.getComputedStyle(e).getPropertyValue('background-color'));
      expect(bgdColor).toBe('rgb(171, 171, 171)');
    });
  });

  // Aside Notification Medium Center:
  test(`${features[13].name}, ${features[13].tags}`, async ({ page, baseURL }) => {
    const Aside = new AsideBlock(page);
    console.info(`[MiloInfo] Checking page: ${baseURL}${features[13].path}`);

    await test.step('Navigate to page with Aside block', async () => {
      await page.goto(`${baseURL}${features[13].path}${features[13].browserParams}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[13].path}${features[13].browserParams}`);
    });

    await test.step('Validate Aside block content', async () => {
      await expect(Aside.asideNotifMedium).toBeVisible();
      await expect(Aside.icon).not.toBeVisible();
      await expect(Aside.image).toBeVisible();
      await expect(Aside.actionArea).toBeVisible();
      await expect(Aside.detailLabel).not.toBeVisible();
      await expect(Aside.h3TitleSmall).toBeVisible();
      await expect(Aside.textFieldSmall).toBeVisible();
      // Check Aside block buttons:
      await expect(Aside.blueButtonCta).not.toBeVisible();
      await expect(Aside.blackButtonCta).toBeVisible();
      await expect(Aside.linkTextCta).toBeVisible();
      expect(await Aside.actionButtons.count()).toEqual(1);
      // Check Aside block background:
      const bgdColor = await Aside.asideNotifMedium.evaluate((e) => window.getComputedStyle(e).getPropertyValue('background-color'));
      expect(bgdColor).toBe('rgb(171, 171, 171)');
    });
  });
});
