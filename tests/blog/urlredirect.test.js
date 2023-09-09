import { expect, test } from '@playwright/test';
import { features } from '../../features/blog/urlredirect.spec.js';

let redirectBlogUrl = 'https://blog.adobe.com';
let stepCounter = 0;
const errors = [];

test.describe('Blog URL Redirects', () => {
    // Topic URL redirects
    test(`${features[0].name},${features[0].tags}`, async ({ page, baseURL }) => {
      const path = features[0].path;
      stepCounter = 0;
      errors.length = 0;

      for (const [url, redirectUrl] of Object.entries(path)) {
        try {
          await test.step(`step-${++stepCounter}: verify url '${url}' redirect`, async () => {
            console.info(`[Test Page ${stepCounter}]: ${baseURL}${url}`);
            console.info(`[Redirect Url]: ${redirectBlogUrl}${redirectUrl}\n`);
            await page.goto(`${baseURL}${url}`, { waitUntil: 'domcontentloaded' });
            await expect(page).toHaveURL(`${redirectBlogUrl}${redirectUrl}`);
          });
        } catch (error) {
          console.info(`Error in Step ${stepCounter} : ${url}`);
          errors.push(`Error in Step ${stepCounter} : ${url}`);
        }
      }
      if(errors.length > 0) {
        throw new Error('Test is failed due to issue in one or more url redirects.');
      }
    }); 

    // Index URL redirects
    test(`${features[1].name},${features[1].tags}`, async ({ page, baseURL }) => {
      const path = features[1].path;
      stepCounter = 0;
      errors.length = 0;

      for (const [url, redirectUrl] of Object.entries(path)) {
        try {
          await test.step(`step-${++stepCounter}: verify url '${url}' redirect`, async () => {
            console.info(`[Test Page ${stepCounter}]: ${baseURL}${url}`);
            console.info(`[Redirect Url]: ${redirectBlogUrl}${redirectUrl}\n`);
            await page.goto(`${baseURL}${url}`, { waitUntil: 'domcontentloaded' });
            await expect(page).toHaveURL(`${redirectBlogUrl}${redirectUrl}`);
          });
        } catch (error) {
          console.info(`Error in Step ${stepCounter} : ${url}`);
          errors.push(`Error in Step ${stepCounter} : ${url}`);
        }
      }
      if(errors.length > 0) {
        throw new Error('Test is failed due to issue in one or more url redirects.');
      }
    }); 

    // Author URL redirects
    test(`${features[2].name},${features[2].tags}`, async ({ page, baseURL }) => {
      const path = features[2].path;
      stepCounter = 0;
      errors.length = 0;

      for (const [url, redirectUrl] of Object.entries(path)) {
        try {
          await test.step(`step-${++stepCounter}: verify url '${url}' redirect`, async () => {
            console.info(`[Test Page ${stepCounter}]: ${baseURL}${url}`);
            console.info(`[Redirect Url]: ${redirectBlogUrl}${redirectUrl}\n`);
            await page.goto(`${baseURL}${url}`, { waitUntil: 'domcontentloaded' });
            await expect(page).toHaveURL(`${redirectBlogUrl}${redirectUrl}`);
          });
        } catch (error) {
          console.info(`Error in Step ${stepCounter} : ${url}`);
          errors.push(`Error in Step ${stepCounter} : ${url}`);
        }
      }
      if(errors.length > 0) {
        throw new Error('Test is failed due to issue in one or more url redirects.');
      }
    });

    // Publish URL redirects
    test(`${features[3].name},${features[3].tags}`, async ({ page, baseURL }) => {
      const path = features[3].path;
      stepCounter = 0;
      errors.length = 0;

      for (const [url, redirectUrl] of Object.entries(path)) {
        try {
          await test.step(`step-${++stepCounter}: verify url '${url}' redirect`, async () => {
            console.info(`[Test Page ${stepCounter}]: ${baseURL}${url}`);
            console.info(`[Redirect Url]: ${redirectBlogUrl}${redirectUrl}\n`);
            await page.goto(`${baseURL}${url}`, { waitUntil: 'domcontentloaded' });
            await expect(page).toHaveURL(`${redirectBlogUrl}${redirectUrl}`);
          });
        } catch (error) {
          console.info(`Error in Step ${stepCounter} : ${url}`);
          errors.push(`Error in Step ${stepCounter} : ${url}`);
        }
      }
      if(errors.length > 0) {
        throw new Error('Test is failed due to issue in one or more url redirects.');
      }
    });
});
