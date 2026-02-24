// @ts-check
const { devices } = require('@playwright/test');
const path = require('path');

/**
 * DA Bacom Configuration
 * For testing DA (Document Authoring) features on da.live
 *
 * Usage:
 *   1. First run setup to login manually:
 *      npx playwright test --config=configs/da-bacom.config.js --project=da-setup
 *
 *   2. Then run tests (will reuse your login session):
 *      npx playwright test tests/bacom/blocks/ppn-dropdown.test.js --config=configs/da-bacom.config.js --project=da-chrome
 *
 * @see https://playwright.dev/docs/test-configuration
 * @type {import('@playwright/test').PlaywrightTestConfig}
 */

const DA_LIVE_URL = 'https://da.live';
const AUTH_FILE = path.join(__dirname, '../.auth/da-user.json');

const config = {
  testDir: '../tests/',
  testMatch: ['bacom/**/*.test.js'],
  outputDir: '../test-results',

  /* Global setup for authentication */
  globalSetup: require.resolve('../utils/da-global-setup.js'),

  /* Maximum time one test can run for - increased for DA UI */
  timeout: 120 * 1000, // 2 minutes

  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * Increased for DA UI which can be slower to respond.
     */
    timeout: 30 * 1000,
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
    ? [['github'], ['list'], ['../utils/reporters/base-reporter.js']]
    : [
      [
        'html',
        {
          outputFolder: 'test-html-results',
          open: 'never',
        },
      ],
      ['list'],
      ['../utils/reporters/base-reporter.js'],
      ['json', { outputFile: '../test-json-results/test-results.json' }],
    ],

  /* Shared settings for all the projects below. */
  use: {
    /* Maximum time each action such as `click()` can take. */
    actionTimeout: 60000,

    /* Base URL for DA Live */
    baseURL: process.env.DA_BASE_URL || DA_LIVE_URL,

    /* Collect trace when retrying the failed test. */
    trace: 'on-first-retry',

    /* Screenshot on failure */
    screenshot: 'only-on-failure',

    /* Video on failure */
    video: 'on-first-retry',

    /* Reuse authenticated state */
    storageState: AUTH_FILE,
  },

  /* Configure projects for DA Live testing
   *
   * Before running tests, login first using:
   *   node scripts/da-login.js
   */
  projects: [
    {
      name: 'da-chrome',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: DA_LIVE_URL,
        storageState: AUTH_FILE,
      },
    },
    {
      name: 'da-firefox',
      use: {
        ...devices['Desktop Firefox'],
        baseURL: DA_LIVE_URL,
        storageState: AUTH_FILE,
      },
    },
    {
      name: 'da-webkit',
      use: {
        ...devices['Desktop Safari'],
        baseURL: DA_LIVE_URL,
        storageState: AUTH_FILE,
      },
    },
    {
      name: 'da-edge',
      use: {
        ...devices['Desktop Edge'],
        baseURL: DA_LIVE_URL,
        storageState: AUTH_FILE,
      },
    },
  ],
};

module.exports = config;
