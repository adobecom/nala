import { test } from '@playwright/test';
import { features } from '../../features/bacom-blog/language-menu.spec.js';
import LanguageMenu from '../../selectors/bacom-blog/language-menu.page.js';

let languageMenu;

const miloLibs = process.env.MILO_LIBS || '';

test.describe('Bacom Blog Language Menu test suite', () => {
  test.beforeEach(async ({ page }) => {
    languageMenu = new LanguageMenu(page);
  });

  test(`0: Selecting language menu options, ${features[0].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[0].path}${miloLibs}`);
    await page.goto(`${baseURL}${features[0].path}${miloLibs}`);
    await page.waitForLoadState('domcontentloaded');

    await test.step('Click the region menu to view menu options.', async () => {
      await languageMenu.openLanguageMenu();
    });

    await test.step('Close region menu by clicking the region menu button.', async () => {
      await languageMenu.closeLanguageMenu();
    });

    await test.step('Changing regions by selecting a language menu option', async () => {
      await languageMenu.openLanguageMenu();
      await languageMenu.changeFromUsToRegion('jp');
    });
  });
});
