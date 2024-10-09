import { expect, test } from '@playwright/test';
import { features } from '../../features/bacom/redirects.spec.js';
import { WebUtil } from '../../libs/webutil.js';

const [test1, test2] = features;

test.describe('BACOM Redirects tests', () => {
  test.beforeAll(async () => {
    // TODO: Investigate why this test fails on GH Actions.
    if (process.env.GITHUB_ACTIONS) test.skip('Fails when ran on GH Actions.');
  });

  test1.path.forEach((path) => {
    test(
      `Verifying redirects for URLs without trailing slashes, path: ${path} tags: ${test1.tags}`,
      async () => {
        const pathWithoutTrailingSlash = path.endsWith('/') ? path.slice(0, -1) : path;
        const testPage = `https://business.adobe.com${pathWithoutTrailingSlash}`;
        const response = await WebUtil.getRequest(testPage);

        expect(response.url().slice(-1)).toBe('/');
        expect(response.status()).toBe(200);
      },
    );
  });

  test2.path.forEach((path) => {
    test(
      `Verifying URLs get .html appended, path: ${path} tags: ${test1.tags}`,
      async () => {
        const pathWithoutHtml = path.endsWith('.html') ? path.slice(0, -5) : path;
        console.log(`pathWithoutHtml: ${pathWithoutHtml}`);
        const testPage = `https://business.adobe.com${pathWithoutHtml}`;
        const response = await WebUtil.getRequest(testPage);

        expect(response.url().slice(-5)).toBe('.html');
        expect(response.status()).toBe(200);
      },
    );
  });
});
