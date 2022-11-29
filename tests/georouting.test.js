import { expect, test } from '@playwright/test';
import georouting from '../features/georouting.spec.js';
import parse from '../features/parse.js';
import selectors from '../selectors/georouting.selectors.js';

// Parse the feature file into something flat that can be tested separately
const { name, features } = parse(georouting);

test.describe(`${name}`, () => {
  test.use({
    geolocation: { longitude: 40.572240, latitude: -102.810059 }, // US
    permissions: ['geolocation'],
  });
  features.forEach((props) => {
    // Test georouting features
    // lang="de-DE" lang="en-US"
    test(props.title, async ({ page, context }) => {
      context.setGeolocation({ longitude: 51.089960, latitude: 10.627522 }); // Germany
      await page.goto(props.url);
      const geoModal = page.locator(selectors['@dialog-modal']);
      expect(geoModal).toBeVisible();

      expect(page).toHaveURL(props.url);
    });
  });
});
