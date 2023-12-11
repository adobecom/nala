// @ts-check
const { devices } = require('@playwright/test');

const envs = require('../envs/envs.js');

/**
 * @see https://playwright.dev/docs/test-configuration
 * @type {import('@playwright/test').PlaywrightTestConfig}
 */
const config = {
  testDir: '../tests/uar',
  outputDir: '../test-results',
  /* Maximum time one test can run for. */
  timeout: 30 * 1000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 5000,
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 2 : undefined,
  /* Reporter to use.*/
  reporter: process.env.CI
    ? [['github'], ['list'], ['../utils/reporters/base-reporter.js']]
    : [['list'],['./utils/reporters/base-reporter.js']],
  /* Shared settings for all the projects below*/
  use: {
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 15000,

    /* Collect trace when retrying the failed test*/
    trace: 'on-first-retry',
    baseURL: process.env.BASE_URL || envs['@adobe_stage'] || 'https://www.stage.adobe.com',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'uar-live-chrome',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: envs['@uar_live'],
      },
    },
    {
      name: 'uar-live-firefox',
      use: {
        ...devices['Desktop Firefox'],
        baseURL: envs['@uar_live'],
      },
    },
    {
      name: 'uar-live-webkit',
      use: {
        ...devices['Desktop Safari'],
        baseURL: envs['@uar_live'],
      },
    },
  ],
};
module.exports = config;
