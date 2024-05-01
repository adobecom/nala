import { test } from '@playwright/test';
import fs from 'fs';
import Sharepoint from '../../selectors/bacom-blog/sharepoint.page.js';

const sharepointBacomBlogDrafts = 'https://adobe.sharepoint.com/sites/BizWeb/Shared%20Documents/Forms/AllItems.aspx';
const bacomBlogAdminUrl = 'https://admin.hlx.page/status/adobecom/bacom-blog/main/';
const bacomBlogHlx = 'https://main--bacom-blog--adobecom.hlx.live/';
const data = JSON.parse(fs.readFileSync('./data/bacom-blog/stagedBlogUrls.json', 'utf8'));
const testPages = Object.keys(data).map((key) => data[key][1]);

let page;
let sharepoint;

test.describe('Sharepoint editing', { tag: '@sp' }, async () => {
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    sharepoint = new Sharepoint(page);

    // TODO: Automated okta login
    // For now, we need to sign into okta manually
    await page.goto(sharepointBacomBlogDrafts);
    await page.waitForTimeout(160000);
  });

  testPages.forEach(async (url) => {
    await test(`Editing a docx in sharepoint - ${url} `, async () => {
      await test.setTimeout(10000 * 1000);

      await test.step('1. Go to the docx.', async () => {
        const relative = url.replace(bacomBlogHlx, '');
        const adminPage = `${bacomBlogAdminUrl}${relative}?editUrl=auto`;
        await page.goto(adminPage);
        await page.waitForLoadState('domcontentloaded');
        const adminPageContent = await page.locator('pre').textContent();
        const docxUrl = JSON.parse(adminPageContent).edit.url;

        console.log(`[Test page]: ${url}`);
        console.log(`[Admin page]: ${adminPage}`);
        console.log(`[Docx Url]: ${docxUrl}\n`);

        if (docxUrl === undefined) {
          console.log(`Unable to find edit url for ${url}\n`);
          test.skip();
        }

        await page.goto(docxUrl);
        await page.waitForLoadState('domcontentloaded');
      });

      await test.step('2. Make an edit and save.', async () => {
        await sharepoint.addPageBreak();
      });

      await test.step('3. Undo the change and save.', async () => {
        await sharepoint.undoChanges();
      });
    });
  });
});
