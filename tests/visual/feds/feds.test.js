/* eslint-disable import/named */
import { expect, test } from '@playwright/test';
import { features } from '../../../features/visual/feds/feds.spec.js';
import { takeTwo } from '../../../libs/screenshot/take.js';
import { writeResultsToFile } from '../../../libs/screenshot/utils.js';
import FedsHeader from '../../../selectors/feds/feds.header.page.js';

const envs = require('../../../envs/envs.js');

const folderPath = 'screenshots/feds';
let Header;
const results = {};

test.describe('Feds blocks visual comparison test suite', () => {
  test.beforeEach(async ({ page }) => {
    Header = new FedsHeader(page);
  });

  test(`${features[0].name}, ${features[0].tags}`, async ({ page }, testInfo) => {
    const name = `${features[0].name}-${testInfo.project.name}`;
    const stableURL = `${envs[features[0].stable]}${features[0].path}${features[0].browserParams}`;
    console.info(stableURL);
    const betaURL = `${envs[features[0].beta]}${features[0].path}${features[0].browserParams}`;
    console.info(betaURL);
    const result = await takeTwo(
      page,
      stableURL,
      async () => {
        await page.waitForSelector('.feds-footer-privacyLink');
        if (testInfo.project.name === 'ipad' || testInfo.project.name === 'iphone') {
          await page.locator('.feds-toggle').click();
        }
        await Header.megaMenuToggle.click();
        await expect(Header.megaMenuContainer).toBeVisible();
      },
      betaURL,
      async () => {
        await page.waitForSelector('.feds-footer-privacyLink');
        if (testInfo.project.name === 'ipad' || testInfo.project.name === 'iphone') {
          await page.locator('.feds-toggle').click();
        }
        await Header.megaMenuToggle.click();
        await expect(Header.megaMenuContainer).toBeVisible();
      },
      folderPath,
      name,
    );

    results[name] = [result];
    writeResultsToFile(folderPath, testInfo, results);
  });

  test(`${features[1].name}, ${features[1].tags}`, async ({ page }, testInfo) => {
    const name = `${features[1].name}-${testInfo.project.name}`;
    const stableURL = `${envs[features[1].stable]}${features[1].path}${features[1].browserParams}`;
    console.info(stableURL);
    const betaURL = `${envs[features[1].beta]}${features[1].path}${features[1].browserParams}`;
    console.info(betaURL);
    const result = await takeTwo(
      page,
      stableURL,
      async () => { await page.waitForSelector('.feds-footer-privacyLink'); },
      betaURL,
      async () => { await page.waitForSelector('.feds-footer-privacyLink'); },
      folderPath,
      name,
      { selector: '.global-footer' },
    );

    results[name] = [result];
    writeResultsToFile(folderPath, testInfo, results);
  });
});
