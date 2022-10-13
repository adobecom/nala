import { expect, test } from '@playwright/test';
import buildUrl from '../features/parse';
import selectors from '../selectors/failedblock.selectors';

// Parse the consumer key URL file into something flat that can be tested separately
const parsed = JSONParse();

test.describe('Failed Block Check', () => {
  parsed.features.forEach((keyUrls) => {
    const env = `@${keyUrls.env}`;
    const url = buildUrl(keyUrls.path, env);
    const title = `Failed Block ${env} on ${url}`;

    if(keyUrls.available === 'yes') {
      test(title, async ({ page }) => {
        await page.goto(url);
        const failedBlocks = await page.$$(selectors['@failed-block']);
        if(failedBlocks !== null) {
          failedBlocks.forEach((failedBlock) => {
            const failedMessage = failedBlock.innerText();
            console.log(`Failed Block Message: ${failedMessage} : on page: ${url}`);
          });
        }
        expect(failedBlocks).toBeNull();
      });
    }
  });
});

async function JSONParse() {
  const resp = await fetch('https://milo.adobe.com/test/consumer-keyurls.json?limit=-1');
  expect(resp.ok).toBe(true);
  const json = await resp.json();
  const keyUrls = (Array.isArray(json) ? json : json.data)
  return keyUrls;
}
