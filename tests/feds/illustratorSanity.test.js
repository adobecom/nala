import { test } from '@playwright/test';
import { features } from '../../features/feds/prodSanity/illustratorsanity.spec.js';
import IllustratorPageSanity from '../../selectors/feds/feds.illustratorsanity.page.js';
// eslint-disable-next-line
import illustrator from '../../features/feds/locales/illustratorPage.json';

test.describe('Test Suite for Illustrator Page Components', () => {
  features.forEach((props) => {
    test(`${props.name}, ${props.tags}`, async ({ page, baseURL }) => {
      const illu = new IllustratorPageSanity(page);
      await illu.validatingIllustratorPage(page, baseURL, props.tcid, props.country, illustrator);
    });
  });
});
