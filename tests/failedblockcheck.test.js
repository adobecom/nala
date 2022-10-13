import { expect, test } from '@playwright/test';
import failedBlock from '../features/failedblock.spec';
import parse from '../features/parse';
import selectors from '../selectors/failedblock.selectors';

// Parse the feature file into something flat that can be tested separately
const parsed = parse(failedBlock);

test.describe(`${parsed.name}`, () => {
  parsed.features.forEach((props) => {
    const title = `${props.name} ${props.env} ${props.tag} on ${props.url}`;

    if(props.env === '@bacom' || props.env === '@stock') {
      test(title, async ({ page }) => {
        await page.goto(props.url);
        const failedBlocks = await page.$$(selectors[props.tag]);
        if(failedBlocks !== null) {
          failedBlocks.forEach((failed) => {
            const failedMessage = failed.innerText();
            console.error(`Failed Block Message: ${failedMessage} : on page: ${props.url}`);
          });
        }
        expect(failedBlocks).toBeNull();
      });
    }
  });
});
