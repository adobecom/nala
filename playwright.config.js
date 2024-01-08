const { devices } = require('@playwright/test');

const envs = require('./envs/envs.js');

/**
 * @see https://playwright.dev/docs/test-configuration
 * @type {import('@playwright/test').PlaywrightTestConfig}
 */
const config = {
  testDir: './tests/milo',
  outputDir: './test-results',
  globalSetup: './global.setup_1.js',
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
  workers: process.env.CI ? 4 : 3,
  /* Reporter to use.*/
  reporter: process.env.CI
    ? [['github'], ['list'], ['./utils/reporters/base-reporter.js']]
    : [['html', { outputFolder: 'test-html-results' }],['list'],['./utils/reporters/base-reporter.js']],
  /* Shared settings for all the projects below */
  use: {
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 60000,

    trace: 'on-first-retry',
    baseURL: process.env.PR_BRANCH_LIVE_URL || ( process.env.LOCAL_TEST_LIVE_URL || 'https://main--milo--adobecom.hlx.live'),
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'milo-live-chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },

    {
      name: 'milo-live-firefox',
      use: {
        ...devices['Desktop Firefox'],
      },
    },
    /** 
    {
      name: 'milo-live-webkit',
      use: {
        ...devices['Desktop Safari'],
      },
    }, 
  */
  ],
};

module.exports = config;
