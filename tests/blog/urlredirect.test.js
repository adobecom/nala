import { expect, test } from '@playwright/test';
import { features } from '../../features/blog/urlredirect.spec.js';

let redirectBlogUrl = 'https://blog.adobe.com';
let stepCounter = 0;

test.describe('Blog URL Redirects', () => {
    // Topic URL redirects
    test(`${features[0].name},${features[0].tags}`, async ({ page, baseURL }) => {
      const path = features[0].path;
      stepCounter = 0;

      for (const [url, redirectUrl] of Object.entries(path)) {
        await test.step(`step-${++stepCounter}: verify url '${url}' redirect`, async () => {
          console.info(`[Test Page ${stepCounter}]: ${baseURL}${url}`);
          console.info(`[Redirect Url]: ${redirectBlogUrl}${redirectUrl}\n`);
          await page.goto(`${baseURL}${url}`, { waitUntil: 'domcontentloaded' });
          await expect.soft(page).toHaveURL(`${redirectBlogUrl}${redirectUrl}`);
        });
      }
    }); 

    // Index URL redirects
    test(`${features[1].name},${features[1].tags}`, async ({ page, baseURL }) => {
      const path = features[1].path;
      stepCounter = 0;

      for (const [url, redirectUrl] of Object.entries(path)) {
        await test.step(`step-${++stepCounter}: verify url '${url}' redirect`, async () => {
          console.info(`[Test Page ${stepCounter}]: ${baseURL}${url}`);
          console.info(`[Redirect Url]: ${redirectBlogUrl}${redirectUrl}\n`);
          await page.goto(`${baseURL}${url}`, { waitUntil: 'domcontentloaded' });
          await expect.soft(page).toHaveURL(`${redirectBlogUrl}${redirectUrl}`);
        });
      }
    }); 

    // Author URL redirects
    test(`${features[2].name},${features[2].tags}`, async ({ page, baseURL }) => {
      const path = features[2].path;
      stepCounter = 0;

      for (const [url, redirectUrl] of Object.entries(path)) {
        await test.step(`step-${++stepCounter}: verify url '${url}' redirect`, async () => {
          console.info(`[Test Page ${stepCounter}]: ${baseURL}${url}`);
          console.info(`[Redirect Url]: ${redirectBlogUrl}${redirectUrl}\n`);
          await page.goto(`${baseURL}${url}`, { waitUntil: 'domcontentloaded' });
          await expect.soft(page).toHaveURL(`${redirectBlogUrl}${redirectUrl}`);
        });
      }
    });

    // Publish URL redirects
    test(`${features[3].name},${features[3].tags}`, async ({ page, baseURL }) => {
      const path = features[3].path;
      stepCounter = 0;

      for (const [url, redirectUrl] of Object.entries(path)) {
        await test.step(`step-${++stepCounter}: verify url '${url}' redirect`, async () => {
          console.info(`[Test Page ${stepCounter}]: ${baseURL}${url}`);
          console.info(`[Redirect Url]: ${redirectBlogUrl}${redirectUrl}\n`);
          await page.goto(`${baseURL}${url}`, { waitUntil: 'domcontentloaded' });
          await expect.soft(page).toHaveURL(`${redirectBlogUrl}${redirectUrl}`);
        });
      }
    });
});
