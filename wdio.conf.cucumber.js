import { before } from './common/support/hooks/before';
import { after } from './common/support/hooks/after';
import { beforeScenario } from './common/support/hooks/before_scenario';
import { afterScenario } from './common/support/hooks/after_scenario';
import { afterStep } from './common/support/hooks/after_step';
import { onPrepare } from './common/support/hooks/on_prepare';
import { onComplete } from './common/support/hooks/on_complete';

const config = {
  runner: 'local',
  path: '/wd/hub',
  specs: [],
  logLevel: 'info',
  logLevels: {
    webdriver: 'info'
  },
  outputDir: './debug',
  bail: 0,
  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  // Selenium-standalone configurations
  services: [],
  seleniumInstallArgs: {
    drivers: {
      chrome: { version: '85.0.4183.87' },
      firefox: { version: '0.26.0' }
    }
  },
  seleniumArgs: {
    drivers: {
      chrome: { version: '85.0.4183.87' },
      firefox: { version: '0.26.0' }
    },
    requestOpts: {
      timeout: 60000
    }
  },
  seleniumLogs: './debug',
  // Cucumber configurations
  framework: 'cucumber',
  reporters: [
    'spec',
    [
      'cucumberjs-json',
      {
        jsonFolder: 'reports',
        language: 'en'
      }
    ]
  ],
  cucumberOpts: {
    require: [],
    backtrace: true,
    failAmbiguousDefinitions: true,
    requireModule: ['@babel/register'],
    dryRun: false,
    failFast: false,
    format: ['pretty'],
    colors: true,
    snippets: true,
    source: true,
    profile: [],
    strict: true,
    tagExpression: '',
    timeout: 600000,
    ignoreUndefinedDefinitions: false
  },
  onPrepare: onPrepare,
  onComplete: onComplete,
  afterStep: afterStep,
  beforeScenario: beforeScenario,
  afterScenario: afterScenario,
  before: before,
  after: after,
  // Custome Configs:
  layouts: {
    large: '1920x1080',
    desktop: '1440x864',
    tablet: '768x1024',
    phone: '414x864'
  }
};

const baselineRoot = process.env['wdio_image_comparison_baseline_root'];
if (process.env['wdio_enable_image_comparison'] == 1 && baselineRoot) {
  const baselineFolder = process.cwd() + `/screenshots/${baselineRoot}`;
  console.log('Baseline folder: ', baselineFolder);
  config.services.push([
    'image-comparison',
    {
      baselineFolder,
      formatImageName: '{tag}-{logName}-{width}x{height}',
      screenshotPath: process.cwd() + '/tmp',
      savePerInstance: true,
      autoSaveBaseline: true,
      blockOutStatusBar: true,
      blockOutToolBar: true,
      returnAllCompareData: true,
      isHybridApp: true,
      tabbableOptions: {
        circle: {
          size: 18,
          fontSize: 18
          // ...
        },
        line: {
          color: '#ff221a', // hex-code or for example words like `red|black|green`
          width: 3
        }
      }
    }
  ]);
}
exports.config = config;
