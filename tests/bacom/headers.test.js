import { expect, test } from '@playwright/test';
import { features } from '../../features/bacom/headers.spec.js';
import { WebUtil } from '../../libs/webutil.js';

const [bacomHelixPages, aemDxPages] = features;

test.describe('BACOM Headers tests', () => {
  bacomHelixPages.path.forEach((path) => {
    test(`Checking the response header X-Adobe-Content for ${path} tags: ${bacomHelixPages.tags}`, async () => {
      const testPage = `https://business.adobe.com${path}`;
      const response = await WebUtil.getRequest(testPage);

      expect(response.status()).toBe(200);
      expect(response.headers()['x-adobe-content']).toBe('Helix BACOM');
    });
  });

  aemDxPages.path.forEach((path) => {
    test(`Checking the response header X-Adobe-Content for ${path} tags: ${aemDxPages.tags}`, async () => {
      const testPage = `https://business.adobe.com${path}`;
      const response = await WebUtil.getRequest(testPage);

      expect(response.status()).toBe(200);
      expect(response.headers()['x-adobe-content']).toBe('AEM-dx');
    });
  });
});
