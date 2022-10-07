import { expect, test } from '@playwright/test';
import imslogin from '../features/imslogin.spec';
import parse from '../features/parse';
import selectors from '../selectors/imslogin.selectors';

// Parse the feature file into something flat that can be tested separately
const parsed = parse(imslogin);

test.describe(`${parsed.name}`, () => {
  parsed.features.forEach((props) => {
    const title = `${props.name} ${props.env} ${props.tag} on ${props.url}`;

    if(props.tag === '@gnav-signin') {
      test(title, async ({ page }) => {
        await page.goto(props.url);
        
      });
    }

    if(props.tag === '@apple-signin') {
      test(title, async ({ page }) => {
        await page.goto(props.url);
      });
    }

    if(props.tag === '@google-signin') {
      test(title, async ({ page }) => {
        await page.goto(props.url);
      });
    }

    if(props.tag === '@facebook-signin') {
      test(title, async ({ page }) => {
        await page.goto(props.url);
      });
    }
  });

  test.afterEach(async ({ page }) => {
    page.close();
  });
});
