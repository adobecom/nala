import { test } from '@playwright/test';
import { features } from '../../../features/visual/bacom/sot.spec.js';
import { takeTwo } from '../../../libs/screenshot/take.js';
import { writeResultsToFile } from '../../../libs/screenshot/utils.js';
import Visual from '../../../selectors/visual/visual.page.js';

const yaml = require('js-yaml');
const fs = require('fs');

const folderPath = 'screenshots/bacom';
const results = {};
const MILO_LIBS = '?milolibs=stage';

const allPages = [];
for (const feature of features) {
  const testdata = yaml.load(fs.readFileSync(feature.data, 'utf8'));
  for (const [key, url] of Object.entries(testdata)) {
    allPages.push({ feature, key, url });
  }
}

test.describe('BACOM SOT visual comparison test suite', () => {
  test.setTimeout(8 * 60 * 1000);

  for (const { feature, key, url } of allPages) {
    test(`${feature.name} - ${key},${feature.tags}`, async ({ page }, testInfo) => {
      const visual = new Visual(page);
      let browserType = page.context().browser()?.browserType()?.name();
      if (!browserType) {
        const ua = await page.evaluate(() => navigator.userAgent);
        if (ua.includes('Firefox')) browserType = 'firefox';
        else if (ua.includes('Chrome')) browserType = 'chromium';
        else browserType = 'webkit';
      }
      const name = `${feature.name}-${key}-${browserType}-${testInfo.project.name}`;
      const result = await takeTwo(
        page,
        url,
        async () => { await visual.scrollToBottom(); },
        url + MILO_LIBS,
        async () => { await visual.scrollToBottom(); },
        folderPath,
        name,
        { fullPage: true },
      );
      results[name] = [result];
      writeResultsToFile(folderPath, testInfo, results);
    });
  }
});
