// @ts-check
/**
 * =============================================================================
 * Summit 2026 Floodgate Migration - Playwright Configuration
 * =============================================================================
 *
 * Run all floodgate tests:
 *   npx playwright test --config=configs/floodgate.config.js
 *
 * Run specific phase:
 *   npx playwright test --config=configs/floodgate.config.js --grep "@before-event"
 *   npx playwright test --config=configs/floodgate.config.js --grep "@during-event"
 *   npx playwright test --config=configs/floodgate.config.js --grep "@after-event"
 *
 * Run security tests:
 *   npx playwright test --config=configs/floodgate.config.js --grep "@security"
 *
 * Run cache tests:
 *   npx playwright test --config=configs/floodgate.config.js --grep "@cache"
 *
 * Run smoke tests:
 *   npx playwright test --config=configs/floodgate.config.js --grep "@smoke"
 *
 * Environment Variables:
 *   FG_ENV=stage|prod (default: stage)
 *
 * =============================================================================
 */

const { devices } = require('@playwright/test');
const envs = require('../envs/envs.js');

/**
 * @see https://playwright.dev/docs/test-configuration
 * @type {import('@playwright/test').PlaywrightTestConfig}
 */
const config = {
  testDir: '../tests/',
  testMatch: ['floodgate/**/*.test.js'],
  outputDir: '../test-results/floodgate',

  /* Maximum time one test can run for */
  timeout: 60 * 1000, // 60 seconds

  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     */
    timeout: 15 * 1000, // 15 seconds
  },

  /* Run tests in files in parallel */
  fullyParallel: false,

  /* Fail the build on CI if you accidentally left test.only in the source code */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,

  /* Opt out of parallel tests on CI */
  workers: process.env.CI ? 2 : undefined,

  /* Reporter configuration */
  reporter: process.env.CI
    ? [
      ['github'],
      ['list'],
      ['../utils/reporters/base-reporter.js'],
      ['html', { outputFolder: '../test-html-results/floodgate', open: 'never' }],
      ['json', { outputFile: '../test-json-results/floodgate-results.json' }],
    ]
    : [
      ['html', { outputFolder: 'test-html-results/floodgate', open: 'never' }],
      ['list'],
      ['../utils/reporters/base-reporter.js'],
      ['json', { outputFile: '../test-json-results/floodgate-results.json' }],
    ],

  /* Shared settings for all projects */
  use: {
    /* Maximum time each action such as `click()` can take */
    actionTimeout: 30000,

    /* Collect trace when retrying the failed test */
    trace: 'on-first-retry',

    /* Screenshot on failure */
    screenshot: 'only-on-failure',

    /* Video on failure */
    video: 'retain-on-failure',

    /* Base URL - defaults to stage */
    baseURL:
      process.env.BASE_URL
      || (process.env.FG_ENV === 'prod' ? envs['@bacom_prod'] : envs['@bacom_stage'])
      || 'https://business.stage.adobe.com',
  },

  /* Configure projects for browsers and environments */
  projects: [
    // ==========================================================================
    // STAGE ENVIRONMENT
    // ==========================================================================
    {
      name: 'floodgate-stage-chrome',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: envs['@bacom_stage'] || 'https://business.stage.adobe.com',
      },
    },
    {
      name: 'floodgate-stage-firefox',
      use: {
        ...devices['Desktop Firefox'],
        baseURL: envs['@bacom_stage'] || 'https://business.stage.adobe.com',
      },
    },
    {
      name: 'floodgate-stage-webkit',
      use: {
        ...devices['Desktop Safari'],
        baseURL: envs['@bacom_stage'] || 'https://business.stage.adobe.com',
      },
    },

    // ==========================================================================
    // STAGE MOBILE
    // ==========================================================================
    {
      name: 'floodgate-stage-mobile-chrome',
      use: {
        ...devices['Pixel 5'],
        baseURL: envs['@bacom_stage'] || 'https://business.stage.adobe.com',
      },
    },
    {
      name: 'floodgate-stage-mobile-safari',
      use: {
        ...devices['iPhone 13'],
        baseURL: envs['@bacom_stage'] || 'https://business.stage.adobe.com',
      },
    },

    // ==========================================================================
    // PRODUCTION ENVIRONMENT
    // ==========================================================================
    {
      name: 'floodgate-prod-chrome',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: envs['@bacom_prod'] || 'https://business.adobe.com',
      },
      // Runs all tests on production (use with FG_ENV=prod)
    },
    {
      name: 'floodgate-prod-smoke',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: envs['@bacom_prod'] || 'https://business.adobe.com',
      },
      // Only run smoke tests in production (safe default)
      grep: /@smoke/,
    },

    // ==========================================================================
    // SECURITY FOCUSED PROJECT
    // ==========================================================================
    {
      name: 'floodgate-security',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: envs['@bacom_stage'] || 'https://business.stage.adobe.com',
      },
      grep: /@security/,
    },

    // ==========================================================================
    // CACHE FOCUSED PROJECT
    // ==========================================================================
    {
      name: 'floodgate-cache',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: envs['@bacom_stage'] || 'https://business.stage.adobe.com',
      },
      grep: /@cache/,
    },
  ],

  /* Global setup/teardown */
  // globalSetup: require.resolve('../global.setup.js'),
};

module.exports = config;
