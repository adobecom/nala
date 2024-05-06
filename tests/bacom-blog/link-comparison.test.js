import fs from 'fs';
import { test } from '@playwright/test';
import { findLinks, checkForDiff } from '../../utils/linkComparison.js';

const data = JSON.parse(fs.readFileSync('./data/bacom-blog/stagedBlogUrls.json', 'utf8'));
const testPages = Object.keys(data).map((key) => data[key]);

test.describe('Link comparison', { tag: '@linkComparison' }, async () => {
  const results = {};

  test.afterAll(async () => {
    const datetime = new Date().toLocaleString().replace(/[^apm\d]+/gi, '-');
    fs.writeFile(
      `./results/bacom-blog/linkComparisonResults_${datetime}.json`,
      JSON.stringify(results),
      (err) => {
        if (err) console.log('error', err);
      },
    );
  });

  const getLinks = async (url, page) => {
    console.log(`Test page: ${url}`);
    const res = await page.goto(url);

    if (res.status() === 404) {
      results[url] = 404;
      test.skip();
    }

    await page.waitForLoadState('domcontentloaded');
    const links = await findLinks(page);
    return links;
  };

  testPages.forEach(async (url) => {
    const urlA = url[0];
    const urlB = url[1];
    let linksA;
    let linksB;

    await test(`Comparing links in ${urlA} vs ${urlB}`, async ({ page }) => {
      await test.step('1. Get links from url A', async () => {
        linksA = await getLinks(urlA, page);
      });

      await test.step('2. Get links from url B', async () => {
        linksB = await getLinks(urlB, page);
      });

      await test.step('3. Verify that the links are the same in url A and B', async () => {
        const diffResults = await checkForDiff(linksA, linksB);
        results[`Comparing ${urlA} to ${urlB} `] = diffResults;
      });
    });
  });
});
