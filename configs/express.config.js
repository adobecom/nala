const { devices } = require('@playwright/test');

const envs = require('../envs/envs.js');

/**
 * @see https://playwright.dev/docs/test-configuration
 * @type {import('@playwright/test').PlaywrightTestConfig}
 */
const config = {
  testDir: '../tests/express',
  outputDir: '../test-results',
  globalSetup: '../global.setup.js',
  /* Maximum time one test can run for. */
  timeout: 45 * 1000,
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
  retries: process.env.CI ? 1 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 4 : 3,
  /* Reporter to use. */
  reporter: process.env.CI
    ? [['github'], ['list'], ['../utils/reporters/base-reporter.js']]
    : [['html', { outputFolder: 'test-html-results' }], ['list'], ['../utils/reporters/base-reporter.js']],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 60000,

    trace: 'on-first-retry',
    // eslint-disable-next-line max-len
    baseURL: envs['@express_live'] || 'https://main--express-milo--adobecom.hlx.live',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'express-live-chromium',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: envs['@express_live'],
      },
    },

    {
      name: 'express-live-firefox',
      use: {
        ...devices['Desktop Firefox'],
        baseURL: envs['@express_live'],
      },
    },

    {
      name: 'express-live-webkit',
      use: {
        ...devices['Desktop Safari'],
        baseURL: envs['@express_live'],
      },
    },
  ],
};

module.exports = config;
