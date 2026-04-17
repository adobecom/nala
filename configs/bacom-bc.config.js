// @ts-check
const { devices } = require('@playwright/test');

const envs = require('../envs/envs.js');

/**
 * Playwright config for Brand Concierge BACOM live page tests.
 *
 * Supports two projects so the same suite can be pointed at prod or stage:
 *   --project=bacom-prod-chrome  -> https://business.adobe.com
 *   --project=bacom-stage-chrome -> https://business.stage.adobe.com
 *
 * @see https://playwright.dev/docs/test-configuration
 * @type {import('@playwright/test').PlaywrightTestConfig}
 */
const config = {
  testDir: '../tests/bacom',
  testMatch: ['brand-concierge.live.test.js'],
  outputDir: '../test-results',
  timeout: 60 * 1000,
  expect: { timeout: 10 * 1000 },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 3 : undefined,
  reporter: process.env.CI
    ? [['github'], ['list'], ['../utils/reporters/base-reporter.js']]
    : [
      ['html', { outputFolder: 'test-html-results', open: 'never' }],
      ['list'],
      ['../utils/reporters/base-reporter.js'],
    ],
  use: {
    actionTimeout: 60000,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'bacom-prod-chrome',
      use: { ...devices['Desktop Chrome'], baseURL: envs['@bacom_prod'] },
    },
    {
      name: 'bacom-stage-chrome',
      use: { ...devices['Desktop Chrome'], baseURL: envs['@bacom_stage'] },
    },
  ],
};

module.exports = config;
