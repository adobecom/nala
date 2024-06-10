import { test } from '@playwright/test';
import { features } from '../../features/feds/prodSanity/creativeCloudUnavSanity.spec.js';
import CreativeCloudUnavSanity from '../../selectors/feds/feds.creativeCloudUnavSanity.page.js';
// eslint-disable-next-line
import creativeCloudUnav from '../../features/feds/locales/creativeCloudUnav.json';

test.describe('Test Suite for Creative Cloud Page Components', () => {
  features.forEach((props) => {
    test(`${props.name}, ${props.tags}`, async ({ page, baseURL }) => {
      const creativeCloud = new CreativeCloudUnavSanity(page);
      await creativeCloud.validatingCreativeCloudUnavPages(page, baseURL, props.tcid, props.country, creativeCloudUnav);
    });
  });
});
