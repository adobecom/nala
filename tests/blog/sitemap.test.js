import { expect, test } from '@playwright/test';
import { features } from '../../features/blog/sitemap.spec.js';

test.describe('Blog sitemaps', () => {

  for (const path of features[0].path) {

    test(`${features[0].name},${path} ${features[0].tags}`, async ({ page, baseURL }) => {
      console.info(`[Test Page]: ${baseURL}${path}`);
  
      await test.step('step-1: verify site map url response', async () => {
        const response = await page.goto(`${baseURL}${path}`, { waitUntil: 'domcontentloaded' });
        const statusCode = response.status();
        expect(statusCode).toBe(200);
        console.info(`HTTP Status Code: ${statusCode}`);
      });

      await test.step('step-2: verify hreflang attribute', async () => {
        let lang = path.split('/')[1];
        lang = (lang === 'jp' ? 'ja' : (lang === 'br' ? 'pt' : lang));
        console.info(`Hreflang Code: ${lang}`);
        await expect(page.locator('urlset url:nth-child(1) link')).toHaveAttribute('hreflang', lang);
      });
    });
  }
});

