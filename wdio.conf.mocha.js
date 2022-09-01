const mochaTimeout = process.env.DEBUG ? 99999999 : 120000;
const baseAccount = require('./feds/config/accounts').euro_basic;
const authorInstance = process.env.AUTHOR ? process.env.AUTHOR : 'acom';

let baseUrl = 'https://www.adobe.com', authorUrl = '';
let pageRoute = 'products/photoshop.html';
let testrailData = {}, targetSegmentationUrl = '';

// Supply 'pageRoute' via ENV variable, or directly passing it above!
pageRoute = process.env.ROUTE ? process.env.ROUTE : pageRoute;

// =================
// Environment Setup
// =================
// !Note: The default testing environment is PRODUCTION!
if (process.env.ENV) {
  switch (process.env.ENV) {
    case 'local':
      baseUrl = 'https://www.local.adobe.com';
      authorUrl = `https://${authorInstance}-author.stage.corp.adobe.com`;
      break;
    case 'stage':
      baseUrl = 'https://www.stage.adobe.com';
      authorUrl = `https://${authorInstance}-author.stage.corp.adobe.com`;
      break;
    default:
      baseUrl = `https://${process.env.ENV}.adobe.com`;
      authorUrl = `https://${authorInstance}-author.${process.env.ENV}.corp.adobe.com`;
  }
} else {
  baseUrl = 'https://www.adobe.com';
}
targetSegmentationUrl = `${baseUrl}/etc.clientlibs/globalnav/clientlibs/base/feds.js`;

exports.config = {
  runner: 'local',
  path: '/wd/hub',
  specs: [],
  suites: {},
  // !Note: For debug purposes.
  exclude: [],
  logLevel: 'info',
  logLevels: {
    webdriver: 'info'
  },
  outputDir: './debug',
  bail: 0,
  baseUrl: 'https://wwww.adobe.com',
  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  // Selenium-standalone configurations
  //services: ['selenium-standalone'],
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
  framework: 'mocha',
  reporters: [
    'spec'
  ],
  mochaOpts: {
    ui: 'bdd',
    timeout: mochaTimeout,
    require: ['@babel/register']
  },
  onPrepare: function (config, capabilities) {},
  beforeSession: function (config, capabilities, specs) {},
  before: function (capabilities, specs) {
    // =================
    // Assertion Library
    // =================
    require('expect-webdriverio').setOptions({ wait: 10000 });
    // =============================
    // Your Global Variables Go Here
    // =============================
    global.baseUrl = baseUrl,
    global.pageRoute = pageRoute,
    global.globalTimeout = mochaTimeout,
    global.request = require('superagent');
    global.allowedStatusCodes = [200, 301, 302, 401];
    //
    // ===============
    // Custom Commands
    // ===============
  },
  beforeSuite: function (suite) {},
  beforeTest: function (test) {},
  afterTest: async function (test) {},
  afterSuite: function (suite) {},
  after: async function (result, capabilities, specs) {},
  afterSession: function (config, capabilities, specs) {},
  // Custome Configs:
  layouts: {
    large: "1920x1080",
    desktop: "1440x864",
    tablet: "768x1024",
    phone: "414x864"
  }
};
