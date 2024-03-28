import { expect, test } from '@playwright/test';
import { features } from '../../features/milo/promotions.spec.js';
import PromoPage from '../../selectors/milo/promotions.feature.page.js';

const miloLibs = process.env.MILO_LIBS || '';

test.describe('Promotions feature test suite', () => {
  // @Promo-insert - Validate promo insert text after marquee and before text component 
  test(`${features[0].name},${features[0].tags}`, async ({ page, baseURL }) => {
    const PROMO = new PromoPage(page);
    const testPage = `${baseURL}${features[0].path}${miloLibs}`;
    const data = features[0].data;
    console.info('[Test Page]: ', testPage);

    await test.step('Go to the test page', async () => {
        await page.goto(testPage);
        await page.waitForLoadState('domcontentloaded');
    });

    await test.step('Verify default test page content', async () => {
        await expect(await PROMO.marqueeDefault).toBeVisible();
        await expect(await PROMO.marqueeDefault).toContainText(data.textMarquee);

        await expect(await PROMO.textDefault).toBeVisible();
        await expect(await PROMO.textDefault).toContainText(data.textDefault);

    });

    await test.step('Validate content insert after marquee', async () => {
        await expect(await PROMO.textInsertAfterMarquee).toBeVisible();
        await expect(await PROMO.textInsertAfterMarquee).toContainText(data.textAfterMarquee);
    });

    await test.step('Validate content insert before text component', async () => {
        await expect(await PROMO.textInsertBeforeText).toBeVisible();
        await expect(await PROMO.textInsertBeforeText).toContainText(data.textBeforeText);
    });
  });

  // @Promo-replace - Validate promo replaces marquee and text component
  test(`${features[1].name},${features[1].tags}`, async ({ page, baseURL }) => {
    const PROMO = new PromoPage(page);
    const testPage = `${baseURL}${features[1].path}${miloLibs}`;
    const data = features[1].data;
    console.info('[Test Page]: ', testPage);

    await test.step('Go to the test page', async () => {
        await page.goto(testPage);
        await page.waitForLoadState('domcontentloaded');
    });

    await test.step('Verify default test page content is not visible', async () => {
        await expect(await PROMO.marqueeDefault).not.toBeVisible();
        await expect(await PROMO.textDefault).not.toBeVisible();
    });

    await test.step('Validate marque replace', async () => {
        await expect(await PROMO.marqueeReplace).toBeVisible();
        await expect(await PROMO.marqueeReplace).toContainText(data.textReplaceMarquee);
    });

    await test.step('Validate text component replace', async () => {
        await expect(await PROMO.textReplace).toBeVisible();
        await expect(await PROMO.textReplace).toContainText(data.textReplace);
    });
  });

  // @Promo-remove - Validate promo removes text component
  test(`${features[2].name},${features[2].tags}`, async ({ page, baseURL }) => {
    const PROMO = new PromoPage(page);
    const testPage = `${baseURL}${features[2].path}${miloLibs}`;
    const data = features[2].data;
    console.info('[Test Page]: ', testPage);

    await test.step('Go to the test page', async () => {
        await page.goto(testPage);
        await page.waitForLoadState('domcontentloaded');
    });

    await test.step('Verify only default test page marquee is visible', async () => {
        await expect(await PROMO.marqueeDefault).toBeVisible();
        await expect(await PROMO.marqueeDefault).toContainText(data.textMarquee);
        await expect(await PROMO.textDefault).not.toBeVisible();
    });

    await test.step('Validate text component removed', async () => {
        await expect(await PROMO.textBlock).not.toBeVisible();
    });
  });

  // @Promo-two-manifests - Validate 2 active manifests on the page
  test(`${features[3].name},${features[3].tags}`, async ({ page, baseURL }) => {
    const PROMO = new PromoPage(page);
    const testPage = `${baseURL}${features[3].path}${miloLibs}`;
    const data = features[3].data;
    console.info('[Test Page]: ', testPage);

    await test.step('Go to the test page', async () => {
        await page.goto(testPage);
        await page.waitForLoadState('domcontentloaded');
    });

    await test.step('Verify default test page content is not visible', async () => {
        await expect(await PROMO.marqueeDefault).not.toBeVisible();
        await expect(await PROMO.textDefault).not.toBeVisible();
    });

    await test.step('Validate marque replace', async () => {
        await expect(await PROMO.marqueeReplace).toBeVisible();
        await expect(await PROMO.marqueeReplace).toContainText(data.textReplaceMarquee);
    });

    await test.step('Validate text component replace', async () => {
        await expect(await PROMO.textReplace).toBeVisible();
        await expect(await PROMO.textReplace).toContainText(data.textReplace);
    });

    await test.step('Validate content insert after marquee', async () => {
        await expect(await PROMO.textInsertAfterMarquee).toBeVisible();
        await expect(await PROMO.textInsertAfterMarquee).toContainText(data.textAfterMarquee);
    });

    await test.step('Validate content insert before text component', async () => {
        await expect(await PROMO.textInsertBeforeText).toBeVisible();
        await expect(await PROMO.textInsertBeforeText).toContainText(data.textBeforeText);
    });
  });

  // @Promo-replace-fragment - Validate fragment marquee replace
  test(`${features[4].name},${features[4].tags}`, async ({ page, baseURL }) => {
    const PROMO = new PromoPage(page);
    const testPage = `${baseURL}${features[4].path}${miloLibs}`;
    const data = features[4].data;
    console.info('[Test Page]: ', testPage);

    await test.step('Go to the test page', async () => {
        await page.goto(testPage);
        await page.waitForLoadState('domcontentloaded');
    });

    await test.step('Verify default test page content is not visible', async () => {
        await expect(await PROMO.marqueeFragment).not.toBeVisible();
    });

    await test.step('Validate marque promo replace', async () => {
        await expect(await PROMO.marqueeReplace).toBeVisible();
        await expect(await PROMO.marqueeReplace).toContainText(data.textReplaceMarquee);
    });
  });

  // @Promo-future - Validate active promo scheduled in the future
  test(`${features[5].name},${features[5].tags}`, async ({ page, baseURL }) => {
    const PROMO = new PromoPage(page);
    const testPage = `${baseURL}${features[5].path}${miloLibs}`;
    const data = features[5].data;
    const previewPage =  `${baseURL}${features[5].path}${'?mep='}${data.mepPath}&${miloLibs}`
    console.info('[Test Page]: ', testPage);

    await test.step('Go to the test page', async () => {
        await page.goto(testPage);
        await page.waitForLoadState('domcontentloaded');
    });

    await test.step('Validate manifest is on served on the page but inactive', async () => {
        await PROMO.mepMenuOpen.waitFor({ state: 'visible', timeout: 10000 });
        await PROMO.mepMenuOpen.click();
        await expect(await PROMO.mepManifestList).toBeVisible();
        await expect(await PROMO.mepManifestList).toContainText(data.status);
        await expect(await PROMO.mepManifestList).toContainText(data.manifestFile);
    });

    await test.step('Verify default test page content', async () => {
        await expect(await PROMO.marqueeDefault).toBeVisible();
        await expect(await PROMO.marqueeDefault).toContainText(data.textMarquee);

        await expect(await PROMO.textDefault).toBeVisible();
        await expect(await PROMO.textDefault).toContainText(data.textDefault);
    });

    await test.step('Validate no future insert on the page', async () => {
        await expect(await PROMO.textInsertFuture).not.toBeVisible();
    });

    await test.step('Navigate to the page with applied future promo and validate content', async () => {
        await page.goto(previewPage);
        await page.waitForLoadState('domcontentloaded');
        await expect(page).toHaveURL(previewPage);
        console.info(`[Promo preview Page]: ${previewPage}`);

        await expect(await PROMO.marqueeDefault).toBeVisible();
        await expect(await PROMO.marqueeDefault).toContainText(data.textMarquee);

        await expect(await PROMO.textDefault).toBeVisible();
        await expect(await PROMO.textDefault).toContainText(data.textDefault);

        await expect(await PROMO.textInsertFuture).toBeVisible();
        await expect(await PROMO.textInsertFuture).toContainText(data.textFuture);

    });
  });

  // @Promo-with-personalization - Validate promo together with personalization and target OFF
  test(`${features[6].name},${features[6].tags}`, async ({ page, baseURL }) => {
    const PROMO = new PromoPage(page);
    const testPage = `${baseURL}${features[6].path}${miloLibs}`;
    const data = features[6].data;
    console.info('[Test Page]: ', testPage);

    await test.step('Go to the test page', async () => {
        await page.goto(testPage);
        await page.waitForLoadState('domcontentloaded');
    });

    await test.step('Verify only default test page marquee is visible', async () => {
        await expect(await PROMO.marqueeDefault).toBeVisible();
        await expect(await PROMO.marqueeDefault).toContainText(data.textMarquee);
        await expect(await PROMO.textDefault).not.toBeVisible();
    });

    await test.step('Validate content insert after marquee', async () => {
        await expect(await PROMO.textInsertAfterMarquee).toBeVisible();
        await expect(await PROMO.textInsertAfterMarquee).toContainText(data.textAfterMarquee);
    });

    await test.step('Validate content insert before text component', async () => {
        await expect(await PROMO.textInsertBeforeText).toBeVisible();
        await expect(await PROMO.textInsertBeforeText).toContainText(data.textBeforeText);
    });
  });

  // @Promo-with-personalization-and-target - Validate promo together with personalization and target ON
  test(`${features[7].name},${features[7].tags}`, async ({ page, baseURL }) => {
    const PROMO = new PromoPage(page);
    const testPage = `${baseURL}${features[7].path}${miloLibs}`;
    const data = features[7].data;
    console.info('[Test Page]: ', testPage);

    await test.step('Go to the test page', async () => {
        await page.goto(testPage);
        await page.waitForLoadState('domcontentloaded');
    });

    await test.step('Verify only default test page marquee is visible', async () => {
        await expect(await PROMO.marqueeDefault).toBeVisible();
        await expect(await PROMO.marqueeDefault).toContainText(data.textMarquee);
        await expect(await PROMO.textDefault).not.toBeVisible();
    });

    await test.step('Validate content insert after marquee', async () => {
        await expect(await PROMO.textInsertAfterMarquee).toBeVisible();
        await expect(await PROMO.textInsertAfterMarquee).toContainText(data.textAfterMarquee);
    });

    await test.step('Validate content insert before text component', async () => {
        await expect(await PROMO.textInsertBeforeText).toBeVisible();
        await expect(await PROMO.textInsertBeforeText).toContainText(data.textBeforeText);
    });
  });

  // @Promo-preview - Validate preview functionality
  test(`${features[8].name},${features[8].tags}`, async ({ page, baseURL }) => {
    const PROMO = new PromoPage(page);
    const testPage = `${baseURL}${features[8].path}${miloLibs}`;
    const data = features[8].data;
    let previewPage;
    console.info('[Test Page]: ', testPage);

    await test.step('Go to the test page', async () => {
        await page.goto(testPage);
        await page.waitForLoadState('domcontentloaded');
    });

    await test.step('Validate all manifests are served and active on the page', async () => {
        await PROMO.mepMenuOpen.waitFor({ state: 'visible', timeout: 10000 });
        await PROMO.mepMenuOpen.click();
        await expect(await PROMO.mepManifestList).toBeVisible();
        await expect(await PROMO.mepManifestList).not.toContainText(data.inactiveStatus);
        await expect(await PROMO.mepManifestList).toContainText(data.manifestInsertFile);
        await expect(await PROMO.mepManifestList).toContainText(data.manifestReplaceFile);
    });

    await test.step('Verify promo page content', async () => {
        await expect(await PROMO.marqueeDefault).not.toBeVisible();
        await expect(await PROMO.textDefault).not.toBeVisible();

        await expect(await PROMO.marqueeReplace).toBeVisible();
        await expect(await PROMO.marqueeReplace).toContainText(data.textReplaceMarquee);

        await expect(await PROMO.textReplace).toBeVisible();
        await expect(await PROMO.textReplace).toContainText(data.textReplace);

        await expect(await PROMO.textInsertAfterMarquee).toBeVisible();
        await expect(await PROMO.textInsertAfterMarquee).toContainText(data.textAfterMarquee);

        await expect(await PROMO.textInsertBeforeText).toBeVisible();
        await expect(await PROMO.textInsertBeforeText).toContainText(data.textBeforeText);
    });

    await test.step('Disable insert manifest and preview', async () => {
        await PROMO.mepInsertDefault.waitFor({ state: 'visible', timeout: 10000 });
        await PROMO.mepInsertDefault.click();
        await PROMO.mepPreviewButton.waitFor({ state: 'visible', timeout: 10000 });
        await PROMO.mepPreviewButton.click();

        await page.waitForLoadState('domcontentloaded');
        previewPage = decodeURIComponent(page.url());
        console.info(`[Preview Page]: ${previewPage}`);
        expect(previewPage).toContain(data.mepInsertOff);
        expect(previewPage).toContain(data.mepReplaceOn);

        await expect(await PROMO.marqueeDefault).not.toBeVisible();
        await expect(await PROMO.textDefault).not.toBeVisible();
        
        await expect(await PROMO.textInsertAfterMarquee).not.toBeVisible();
        await expect(await PROMO.textInsertBeforeText).not.toBeVisible();

        await expect(await PROMO.marqueeReplace).toBeVisible();
        await expect(await PROMO.marqueeReplace).toContainText(data.textReplaceMarquee);

        await expect(await PROMO.textReplace).toBeVisible();
        await expect(await PROMO.textReplace).toContainText(data.textReplace);
    
    });

    await test.step('Enable insert and disable replace manifest and preview', async () => {
        await PROMO.mepMenuOpen.waitFor({ state: 'visible', timeout: 10000 });
        await PROMO.mepMenuOpen.click()
        await PROMO.mepInsertAll.waitFor({ state: 'visible', timeout: 10000 });
        await PROMO.mepInsertAll.click();
        await PROMO.mepReplaceDefault.waitFor({ state: 'visible', timeout: 10000 });
        await PROMO.mepReplaceDefault.click();
        await PROMO.mepPreviewButton.waitFor({ state: 'visible', timeout: 10000 });
        await PROMO.mepPreviewButton.click();

        await page.waitForLoadState('domcontentloaded');
        previewPage = decodeURIComponent(page.url());
        console.info(`[Preview Page]: ${previewPage}`);
        expect(previewPage).toContain(data.mepInsertOn);
        expect(previewPage).toContain(data.mepReplaceOff);

        await expect(await PROMO.marqueeDefault).toBeVisible();
        await expect(await PROMO.marqueeDefault).toContainText(data.textMarquee);
        await expect(await PROMO.textDefault).toBeVisible();
        await expect(await PROMO.textDefault).toContainText(data.textDefault);
        
        await expect(await PROMO.textInsertAfterMarquee).toBeVisible();
        await expect(await PROMO.textInsertAfterMarquee).toContainText(data.textAfterMarquee);

        await expect(await PROMO.textInsertBeforeText).toBeVisible();
        await expect(await PROMO.textInsertBeforeText).toContainText(data.textBeforeText);        

        await expect(await PROMO.marqueeReplace).not.toBeVisible();
        await expect(await PROMO.textReplace).not.toBeVisible();
    });  

    await test.step('Desable all manifests and preview', async () => {
        await PROMO.mepMenuOpen.waitFor({ state: 'visible', timeout: 10000 });
        await PROMO.mepMenuOpen.click()
        await PROMO.mepInsertDefault.waitFor({ state: 'visible', timeout: 10000 });
        await PROMO.mepInsertDefault.click();
        await PROMO.mepReplaceDefault.waitFor({ state: 'visible', timeout: 10000 });
        await PROMO.mepReplaceDefault.click();
        await PROMO.mepPreviewButton.waitFor({ state: 'visible', timeout: 10000 });
        await PROMO.mepPreviewButton.click();

        await page.waitForLoadState('domcontentloaded');
        previewPage = decodeURIComponent(page.url());
        console.info(`[Preview Page]: ${previewPage}`);
        expect(previewPage).toContain(data.mepInsertOff);
        expect(previewPage).toContain(data.mepReplaceOff);

        await expect(await PROMO.marqueeDefault).toBeVisible();
        await expect(await PROMO.marqueeDefault).toContainText(data.textMarquee);
        await expect(await PROMO.textDefault).toBeVisible();
        await expect(await PROMO.textDefault).toContainText(data.textDefault);
        
        await expect(await PROMO.textInsertAfterMarquee).not.toBeVisible();
        await expect(await PROMO.textInsertBeforeText).not.toBeVisible();
        await expect(await PROMO.marqueeReplace).not.toBeVisible();
        await expect(await PROMO.textReplace).not.toBeVisible();
    });    
  });

});
