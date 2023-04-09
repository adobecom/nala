// @ts-check
const { devices } = require('@playwright/test');

const envs = require('../envs/envs.js');

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * @see https://playwright.dev/docs/test-configuration
 * @type {import('@playwright/test').PlaywrightTestConfig}
 */
const config = {
  testDir: '../tests',
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
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: process.env.CI
    ? [['github'], ['../utils/reporters/json-reporter.js'], ['../utils/reporters/json-reporter.js']]
    : [['html', { outputFolder: 'test-html-results' }], ['../utils/reporters/json-reporter.js']],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 60000,
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    baseURL: process.env.BASE_URL || envs['@feds_live'] || 'https://gnav--milo--adobecom.hlx.live',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'feds_live-chrome',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: envs['@feds_live'],
      },
    },
    {
      name: 'feds_live-firefox',
      use: {
        ...devices['Desktop Firefox'],
        baseURL: envs['@feds_live'],
      },
    },

    {
      name: 'feds_live-webkit',
      use: {
        ...devices['Desktop Safari'],
        baseURL: envs['@feds_live'],
      },
    },
    {
      name: 'feds_preview-chrome',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: envs['@feds_preview'],
      },
    },

    {
      name: 'feds_preview-firefox',
      use: {
        ...devices['Desktop Firefox'],
        baseURL: envs['@feds_preview'],
      },
    },

    {
      name: 'feds_preview-webkit',
      use: {
        ...devices['Desktop Safari'],
        baseURL: envs['@feds_preview'],
      },
    },
  ],
};
module.exports = config;
