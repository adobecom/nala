import { test } from '@playwright/test';
import fs from 'fs';
import Sharepoint from '../../selectors/bacom-blog/sharepoint.page.js';

const sharepointBacomBlogDrafts = 'https://adobe.sharepoint.com/sites/BizWeb/Shared%20Documents/Forms/AllItems.aspx';
const bacomBlogAdminUrl = 'https://admin.hlx.page/status/adobecom/bacom-blog/main';
const data = JSON.parse(fs.readFileSync('./data/bacom-blog/stagedBlogUrls.json', 'utf8'));
const testPages = Object.keys(data).map((key) => data[key][1]);

let page;
let context;
let sharepoint;

const authFile = 'tests/bacom-blog/.auth/user.json';

test.describe('Sharepoint editing', { tag: '@sp' }, async () => {
  test.beforeAll(async ({ browser }) => {
    const options = fs.existsSync(authFile) ? { storageState: authFile } : {};
    context = await browser.newContext(options);
    page = await context.newPage();
    sharepoint = new Sharepoint(page);

    // TODO: Automated okta login
    // For now, we need to sign into okta manually
    await page.goto(sharepointBacomBlogDrafts);
    await page.waitForURL(sharepointBacomBlogDrafts, { timeout: 1000 * 60 * 2 });

    await context.storageState({ path: authFile });
  });

  test.afterAll(async () => {
    await page.close();
  });

  testPages.forEach(async (url) => {
    await test(`Editing a docx in sharepoint - ${url} `, async () => {
      await test.setTimeout(1000 * 60 * 2); // Set each test timeout to 2 minutes

      await test.step('1. Go to the docx.', async () => {
        const { pathname } = new URL(url);
        const adminPage = `${bacomBlogAdminUrl}${pathname}?editUrl=auto`;
        const response = await page.evaluate(async (api) => fetch(api)
          .then((req) => (req.ok ? req.json() : Promise.reject(req))), adminPage);
        const docxUrl = response?.edit.url;

        console.log(`[Test page]: ${url}`);
        console.log(`[Admin page]: ${adminPage}`);
        console.log(`[Docx Url]: ${docxUrl}\n`);

        if (docxUrl === undefined) {
          console.log(`Unable to find edit url for ${url}\n`);
          test.skip(true, 'Unable to find edit url');
        }
        await page.goto(docxUrl);
      });

      await test.step('2. Load the docx.', async () => {
        const loaded = await sharepoint.waitForLoad();
        if (!loaded) {
          const status = await sharepoint.getDialogText();
          console.log(status);
          test.skip(true, status);
        }
      });

      await test.step('3. Make an edit.', async () => {
        await sharepoint.addPageBreak();
      });

      await test.step('4. save document.', async () => {
        await sharepoint.saveFile();
      });

      await test.step('5. Undo the change.', async () => {
        await sharepoint.undoChanges();
      });

      await test.step('6. save document.', async () => {
        await sharepoint.saveFile();
      });
    });
  });
});
