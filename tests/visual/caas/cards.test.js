/* eslint-disable import/named */
import { test } from '@playwright/test';
import { features } from '../../../features/visual/caas/cards.spec.js';
import { takeTwo } from '../../../libs/screenshot/take.js';
import { writeResultsToFile } from '../../../libs/screenshot/utils.js';

const envs = require('../../../envs/envs.js');

const folderPath = 'screenshots/caas';
const results = {};

test.describe('Milo Caas block visual comparison test suite', () => {
  // eslint-disable-next-line no-restricted-syntax
  for (const feature of features) {
    // eslint-disable-next-line no-loop-func
    test(`${feature.name},${feature.tags}`, async ({ page }, testInfo) => {
      const name = `${feature.name}-${testInfo.project.name}`;
      const stableURL = `${envs[feature.stable]}${feature.path}`;
      console.info(stableURL);
      const betaURL = `${envs[feature.beta]}${feature.path}`;
      console.info(betaURL);
      const result = await takeTwo(
        page,
        stableURL,
        async () => { await page.waitForTimeout(3000); },
        betaURL,
        async () => { await page.waitForTimeout(3000); },
        folderPath,
        name,
      );
      results[name] = [result];

      writeResultsToFile(folderPath, testInfo, results);
    });
  }
});
