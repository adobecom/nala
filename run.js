// Use "npm start -- ", "yarn start" or "node" command
// Arguments:
//  -t, --tags,    Execute scenarios with the tags
//  -d, --dry-run, Dry run
//  --browser,     Browser (chrome, firefox, safari, ...)
//
'use strict';

const yargs = require('yargs');
const Launcher = require('@wdio/cli').default;
const os = require('os');
const fs = require('fs');
const yaml = require('js-yaml');
const path = require('path');
const glob = require('glob');
const urljoin = require('url-join');
const FirefoxProfile = require('firefox-profile');
const {
  getIosDeviceVersion,
  getIosDeviceModels
} = require('./tools/get_xcode_info');
const { getLatestAvd, getAvdSnapshot } = require('./tools/get_avd_info');
const {
  getEdgeVersion,
  getChromeVersion,
  getMatchedChromeDriverVersion
} = require('./tools/get_browser_info');
const { getChromedriver } = require('./tools/get_chromedriver');
const { processFeatureOutlines } = require('./tools/feature_outline');
const { getBuildInfo } = require('./tools/build_info');
const { getTestCases } = require('./tools/get_test_cases');

const debugFolder = 'debug';

const getFirefoxProfile = profile => {
  let fp = new FirefoxProfile();
  fp.setPreference('network.stricttransportsecurity.preloadlist', false);
  fp.setPreference('browser.helperApps.neverAsk.saveToDisk', 'application/pdf');
  fp.setPreference('pdfjs.disabled', true);
  if (profile.enableAnalytics) {
    fp.setPreference('network.proxy.type', 1);
    fp.setPreference('network.proxy.http', 'localhost');
    fp.setPreference('network.proxy.http_port', 8001);
    fp.setPreference('network.proxy.https', 'localhost');
    fp.setPreference('network.proxy.https_port', 8001);
    fp.setPreference('network.proxy.ssl', 'localhost');
    fp.setPreference('network.proxy.ssl_port', 8001);
    fp.setPreference('network.proxy.socks', 'localhost');
    fp.setPreference('network.proxy.socks_port', 8001);
  }
  if (profile.browserLocale) {
    fp.setPreference('intl.accept_languages', profile.browserLocale);
  }
  fp.updatePreferences();
  return new Promise((resolve, reject) => {
    fp.encoded((err, zipped) => {
      if (err) {
        reject();
      }
      resolve(zipped);
    });
  });
};

const normalizeProfile = profile => {
  if (!profile.browser) {
    profile.browser = 'chrome';
  }
  return profile;
};

const parseBrowser = text => {
  // Browser name could be chrome-mac-headless
  let parts = text.split('-');

  let platform = 'Windows 10';
  let browser = parts[0];
  let headless = parts.includes('headless');

  if (browser.match(/ie/)) {
    browser = 'internet explorer';
  }

  if (browser.match(/safari/)) {
    platform = 'macOS 10.15';
  }

  if (
    parts.includes('mac') ||
    parts.includes('catalina') ||
    parts.includes('mac15')
  ) {
    platform = 'macOS 10.15';
  } else if (parts.includes('bigsur')) {
    platform = 'macOS 11.2';
  } else if (parts.includes('mojave') || parts.includes('mac14')) {
    platform = 'macOS 10.14';
  } else if (parts.includes('win7')) {
    platform = 'Windows 7';
  } else if (parts.includes('win8')) {
    platform = 'Windows 8';
  } else if (parts.includes('win10')) {
    platform = 'Windows 10';
  }

  return { browser: browser, platform: platform, headless: headless };
};

const processAccounts = accounts => {
  for (let account of Object.values(accounts)) {
    let fields = ['passwordx', 'p6d', 'usernamex', 'u6e'];
    for (let f of fields) {
      if (account[f]) {
        account[{p: 'password', u: 'username'}[f[0]]] = Buffer.from(account[f], 'base64').toString();
        delete account[f];
      }
    }
  }
};

const setSauceLabsCaps = (cap, rawCaps) => {
  let opt = {};
  cap['sauce:options'] = opt;
  if (rawCaps.platform.startsWith('Windows')) {
    cap.platformName = rawCaps.platform;
    cap.browserVersion = 'latest';
    opt.screenResolution = '1280x1024';
  } else if (rawCaps.platform.startsWith('macOS')) {
    cap.platformName = rawCaps.platform;
    cap.browserVersion = 'latest';
    opt.screenResolution = '1280x960';
  }
  if (cap.browserName.match(/^iphone|^ipad/)) {
    delete opt.screenResolution;
    cap['appium:deviceName'] = {
      iphone: 'iPhone Simulator',
      ipad: 'iPad Simulator'
    }[cap.browserName];
    cap['appium:platformVersion'] = '15.0';
    opt.appiumVersion = '1.22.0';
  } else if (cap.browserName.match(/^aphone|^android/)) {
    cap.platformName = 'Android';
    delete opt.screenResolution;
    cap['appium:deviceName'] = {
      android: 'Google Pixel 3 GoogleAPI Emulator',
      aphone: 'Google Pixel 3 GoogleAPI Emulator',
      apad: ''
    }[cap.browserName];
    cap['appium:platformVersion'] = '11.0';
    opt.appiumVersion = '1.20.2';
  }
};

const setBrowserStackCaps = (cap, rawCaps) => {
  let opt = {};
  cap['bstack:options'] = opt;
  if (rawCaps.platform.startsWith('Windows')) {
    opt.os = 'Windows';
    opt.resolution = '1920x1080';
    let m = rawCaps.platform.match(/(\d+)$/);
    opt.osVersion = m[1];
  } else if (rawCaps.platform.startsWith('macOS 10')) {
    opt.os = 'OS X';
    opt.resolution = '1920x1080';
    let m = rawCaps.platform.match(/.(\d+)$/);
    opt.osVersion = {
      15: 'Catalina',
      14: 'Mojave',
      13: 'High Sierra',
      12: 'Sierra',
      11: 'El Capitan',
      10: 'Yosemite'
    }[m[1]];
  } else if (rawCaps.platform.startsWith('macOS 11')) {
    opt.os = 'OS X';
    opt.osVersion = 'Big Sur';
  }
  if (cap.browserName.match(/^iphone|^ipad/)) {
    delete opt.os;
    delete opt.resolution;
    opt.osVersion = '14';
    opt.deviceName = 'iPhone 12';
    opt.realMobile = 'true';
  } else if (cap.browserName.match(/^aphone|^android/)) {
    delete opt.os;
    delete opt.resolution;
    opt.osVersion = '10.0';
    opt.deviceName = 'Google Pixel 4';
    opt.realMobile = 'true';
    cap.browserName = 'Android';
  }
};

const main = async () => {
  let yargsOpts = yargs
    .options('profile', { alias: 'p' })
    .options('tags', { alias: 't' })
    .options('browser', { alias: 'b' })
    .options('locale', { alias: 'l' })
    .options('dryRun', {
      alias: 'd',
      type: 'boolean',
      description: 'Verify step definitions'
    })
    .option('headless', {
      type: 'boolean',
      description: 'Use headless browser'
    })
    .option('exit', {
      description: 'Force exit code'
    })
    .parserConfiguration({ 'strip-aliased': true });

  // command line arguments
  let argv = yargsOpts.argv;

  // A site must be specified
  let site = argv._[0];
  if (site == undefined) {
    console.log('Please specify a site directory. e.g. acom or helpx');
    process.exit(1);
  }

  const commonModule = 'node_modules/@mwp/common-automation';
  process.env.NODE_EXTRA_CA_CERTS = 'tools/certs/DigiCert_Intermediate.pem';

  // Need the extra cert that is not in NodeJS
  if (fs.existsSync(commonModule)) {
    process.env.NODE_EXTRA_CA_CERTS = [
      commonModule,
      process.env.NODE_EXTRA_CA_CERTS
    ].join('/');
  }

  processFeatureOutlines(site);

  // Find framework to use 'cucumber' or 'mocha'
  let framework = null;
  let features = argv._.slice(1).filter(x => x.trim() !== '');

  if (features.length === 0) {
    if (fs.existsSync(path.join(site, 'features'))) {
      framework = 'cucumber';
      console.info('Using Cucumber as the testrunner');
    } else if (fs.existsSync(path.join(site, 'specs'))) {
      framework = 'mocha';
      console.info('Using Mocha as the testrunner');
    } else {
      throw `No features or specs directory is found in ${site}`;
    }
    if (framework === 'cucumber') {
      features = [path.join(site, 'features', '**', '*.feature')];
    } else if (framework == 'mocha') {
      features = [path.join(site, 'specs', '**', '*.js')];
    }
  } else {
    if (features[0].startsWith('features')) {
      framework = 'cucumber';
    } else if (features[0].match(/^(?:specs|tools)/)) {
      framework = 'mocha';
    } else {
      console.log(`Spec/feature folder: ${features[0]}`);
      throw `Unable to decide to use Cucumber or Mocha test framework`;
    }
    let ext = { cucumber: 'feature', mocha: 'js' }[framework];
    features = features.map(item => {
      try {
        if (fs.lstatSync(path.join(site, item)).isDirectory()) {
          return path.join(site, item, '**', `*.${ext}`);
        } else {
          return path.join(site, item);
        }
      } catch (e) {
        if (e.code == 'ENOENT') {
          console.error(`No such file or directory '${item}'`);
          process.exit(1);
        }
      }
    });
  }
  // simple filter to get around WDIO performance issue.
  // Can't handle "not" in tags.
  if (argv.tags) {
    let tags = null;
    if (framework === 'cucumber') {
      // multiple tags: "@tag1 or tag2" or "@tag1,@tag2"
      argv.tags = argv.tags.replace(/,/g, ' or ');
      tags = argv.tags.split(/\s+/).filter(x => {
        return x[0] === '@';
      });
      let files = new Set();
      let matchedTags = new Set();
      for (let ftr of features) {
        let testCases = await getTestCases(ftr);
        for (let tc of testCases) {
          for (let tag of tags) {
            if (tag.includes('*')) {
              let reTag = new RegExp(tag.replace(/\*/g, '.*'));
              let matched = tc.pickle.tags.filter(x => x.name.match(reTag));
              if (matched.length > 0) {
                files.add(tc.uri);
                matchedTags.add(...matched.map(x => x.name));
              }
            } else {
              if (tc.pickle.tags.map(x => x.name).includes(tag)) {
                files.add(tc.uri);
                matchedTags.add(tag);
              }
            }
          }
        }
      }
      features = Array.from(files);
      tags = Array.from(matchedTags);
      argv.tags = tags.join(' or ');
    } else if (framework === 'mocha') {
      // multiple tags: C1234|C1235
      tags = argv.tags.split(/\|/);
      let files = [];
      for (let ftr of features) {
        for (let f of glob.sync(ftr)) {
          for (let tag of tags) {
            if (fs.readFileSync(f).includes(tag)) {
              files.push(f);
              break;
            }
          }
        }
      }
      features = files;
    }
  }

  // Read profile.yml from the specified site directory
  let profilesPath = path.join(site, 'profiles.yml');
  if (!fs.existsSync(profilesPath)) {
    console.log(`Can't find the file: ${profilesPath}`);
    process.exit(1);
  }

  let fileContents = fs.readFileSync(profilesPath, 'utf8');
  let profiles = yaml.load(fileContents);

  // Command line argv overides default argv
  let argv_default = yargsOpts.parse(profiles.default.split(' '));

  argv = Object.assign(argv_default, argv);

  // A profile must be specified for a site
  if (!argv.profile) {
    console.log('No profile specified');
    process.exit(1);
  }

  let profile = profiles[argv.profile];

  if (!profile) {
    console.log(`No profile "${argv.profile}" in profiles.yml`);
    process.exit(1);
  }

  // handle tags specially
  if ('tags' in argv && 'tags' in profile) {
    argv.tags = `(${profile.tags}) and (${argv.tags})`;
  }

  profile = Object.assign(profile, argv);

  // Normalize profile settings
  profile = normalizeProfile(profile);

  // Set environment variables
  Object.keys(profile).forEach(key => {
    if (!key.match(/\$0|_/)) {
      process.env[key] = profile[key];
    }
  });

  let config = {
    baseUrl: profile.baseUrl,
    maxInstances: 1,
    capabilities: [],
    services: ['selenium-standalone'],
    seleniumInstallArgs: {
      drivers: {}
    },
    specs: features
  };

  if (framework === 'cucumber') {
    config.cucumberOpts = {
      require: ['common/support/**/*.js', `${site}/steps/**/*.js`],
      tagExpression: profile.tags,
      dryRun: false
    };

    if (site !== 'common') {
      config.cucumberOpts.require.push('common/steps/**/*.js');
    }

    // If running with @mwp/common-automation installed
    if (fs.existsSync(commonModule)) {
      config.cucumberOpts.require.push(
        `${commonModule}/common/support/**/*.js`
      );
      config.cucumberOpts.require.push(`${commonModule}/common/steps/**/*.js`);
    }

    if ('dryRun' in profile) {
      config.cucumberOpts.dryRun = true;
    }
  } else if (framework === 'mocha' && argv.tags) {
    config.mochaOpts = {
      grep: argv.tags
    };
  }

  /**
   * Adobe accounts
   */
  let adobeAccountPath = path.join(site, 'config', 'adobe_accounts.yml');
  if (profile.accountCfg) {
    adobeAccountPath = path.join(site, 'config', profile.accountCfg);
  }
  if (fs.existsSync(adobeAccountPath)) {
    let accounts = yaml.load(fs.readFileSync(adobeAccountPath, 'utf8'));
    if (profile.env in accounts) {
      let envAccounts = accounts[profile.env];
      processAccounts(envAccounts);

      // Accounts are stored in config.adobeAccounts for publish
      // or config.aemAccounts for author
      config['author' === profile.aem ? 'aemAccounts' : 'adobeAccounts'] =
        envAccounts;
    }
  }
  /**
   * Author accounts
   */
  if (profile.authorAccountCfg) {
    let authorAccountPath = path.join(site, 'config', profile.authorAccountCfg);
    let accounts = yaml.load(fs.readFileSync(authorAccountPath, 'utf8'));
    if (profile.env in accounts) {
      config.authorAccounts = accounts[profile.env];
      processAccounts(config.authorAccounts);
    }
  }
  /*
   * Handle locale
   */
  if (profile.localeCfg) {
    let localeCfgPath = path.join(site, 'config', profile.localeCfg);
    config.locales = yaml.load(fs.readFileSync(localeCfgPath, 'utf8'));
  }
  if (profile.localeRegion != null && profile.locale == null) {
    let region = profile.localeRegion;
    if (config.locales == null) {
      throw 'The argument localeRegion needs a locale configuration file';
    } else {
      let found = config.locales.filter(x =>
        x.region.toUpperCase().includes(region.toUpperCase())
      );
      if (found.length == 0) {
        throw `The region "${region}" is not found in the locale configuration file`;
      } else if (found.length > 1) {
        throw `The region "${region}" has ${found.length} languages. Please use --locale`;
      }
      profile.locale = found[0].locale;
    }
  }

  if (profile.locale === 'none') {
    profile.locale = '';
  } else {
    if (profile.locale == null || profile.locale === 'default') {
      profile.locale =
        profile.localeDefault != null ? profile.localeDefault : '';
    }
    if (config.locales) {
      config.currentLocale = config.locales.find(
        x => x.locale === profile.locale || x.international === profile.locale
      );
    }
  }
  // browser locale
  if (profile.browserLocale === 'auto' || profile.akamaiLocale === 'auto') {
    if (!config.locales) {
      throw 'The argument akamaiLocale or browserLocale needs a locale configuration file specified with localeCfg';
    }
    if (!config.currentLocale) {
      throw `The locale "${profile.locale}" is not found in the locale configuration file`;
    }
    if (profile.browserLocale === 'auto') {
      profile.browserLocale = config.currentLocale.browser;
    }
    if (profile.akamaiLocale === 'auto') {
      profile.akamaiLocaleAuto = true;
      profile.akamaiLocale = config.currentLocale.akamai;
    }
  }

  if (profile.aem && profile[`${profile.aem}Path`]) {
    config.baseUrl = urljoin(config.baseUrl, profile[`${profile.aem}Path`]);
  }

  if (
    profile.aem === 'preview' &&
    config.currentLocale &&
    config.currentLocale.author
  ) {
    config.baseUrl = urljoin(config.baseUrl, config.currentLocale.author);
  } else if (profile.locale) {
    config.baseUrl = urljoin(config.baseUrl, profile.locale);
  }

  let localesDir = 'locales';
  if (profile.localeCfg) {
    localesDir = path.basename(profile.localeCfg, '.yml');
  }

  // Localized text mapping file
  if (profile.locale) {
    let textFile = path.join(
      site,
      'config',
      localesDir,
      `text_${profile.locale.replace('/', '_')}.yml`
    );
    if (fs.existsSync(textFile)) {
      config.localeText = yaml.load(fs.readFileSync(textFile, 'utf8'));
    }
    let propFile = path.join(
      site,
      'config',
      localesDir,
      `prop_${profile.locale.replace('/', '_')}.yml`
    );
    if (fs.existsSync(propFile)) {
      config.localeProp = yaml.load(fs.readFileSync(propFile, 'utf8'));
    }
    if (profile.localeDefault) {
      let propDefaultFile = path.join(
        site,
        'config',
        localesDir,
        `prop_${profile.localeDefault.replace('/', '_')}.yml`
      );
      if (fs.existsSync(propDefaultFile)) {
        config.localePropDefault = yaml.load(
          fs.readFileSync(propDefaultFile, 'utf8')
        );
      }
    }
  } else {
    let defaultLocale = 'us/en';
    let propDefaultFile = path.join(
      site,
      'config',
      localesDir,
      `prop_${defaultLocale.replace('/', '_')}.yml`
    );
    if (fs.existsSync(propDefaultFile)) {
      config.localePropDefault = yaml.load(
        fs.readFileSync(propDefaultFile, 'utf8')
      );
    }
  }

  /*
   * Configure Service
   */
  if (!profile.service) {
    if (profile.hostname) {
      config.hostname = profile.hostname;
    }
    if (profile.port) {
      config.port = profile.port;
    }
  } else if (profile.service === 'sauce') {
    config.services[0] = 'sauce';
    config.sauceConnect = false;
    let cred = ['', ''];
    if ('saucecredentials' in profile) {
      cred = profile.saucecredentials.split(':');
    } else if ('saucecredentials' in process.env) {
      cred = process.env.saucecredentials.split(':');
    } else {
      console.log('Need SauceLabs credentials');
    }
    config.user = cred[0];
    config.key = cred[1];
    if (profile.host) {
      config.host = profile.host;
    }
  } else if (profile.service === 'bstack') {
    config.services[0] = 'browserstack';
    let cred = ['', ''];
    if ('BROWSERSTACK_USERNAME' in process.env && 'BROWSERSTACK_ACCESS_KEY' in process.env) {
      // integration with Jenkins BrowserStack plugin
      cred = [process.env.BROWSERSTACK_USERNAME, process.env.BROWSERSTACK_ACCESS_KEY];
    } else if ('bstackcredentials' in profile) {
      cred = profile.bstackcredentials.split(':');
    } else if ('bstackcredentials' in process.env) {
      cred = process.env.bstackcredentials.split(':');
    } else {
      console.log('Need BrowserStack credentials');
    }
    config.user = cred[0];
    config.key = cred[1];
  } else if (profile.service === 'docker') {
    config.services[0] = 'docker';
    config.dockerOptions = {
      //add image later
      healthCheck: 'http://localhost:4444',
      options: {
        p: ['4444:4444'],
        shmSize: '2g',
        e: ['SCREEN_WIDTH=1920', 'SCREEN_HEIGHT=1080']
      }
    };
    config.dockerLogs = debugFolder;
  } else if (profile.service === 'grid') {
    config.services.shift();
    config.hostname = 'localhost';
    config.port = 4444;
    config.maxInstances = 1;
    if (profile.hostname) {
      config.hostname = profile.hostname;
    }
    if (profile.port) {
      config.port = profile.port;
    }
  }

  if (profile.maxInstances) {
    config.maxInstances = profile.maxInstances;
  }
  /*
   * Configure Browser
   * chrome, firefox, safari, edge, xedge (Chromium Edge), ie
   * iphone, ipad
   */
  if (profile.browser) {
    let browsers = profile.browser.split(',');

    for (let browser of browsers) {
      let rawCaps = parseBrowser(browser);

      let cap = {
        'cjson:metadata': {
          platform: {
            name: os.platform(),
            version: os.release()
          }
        }
      };
      cap.browserName = rawCaps.browser;

      // Desktop Browsers
      if (cap.browserName === 'chrome') {
        if (config.services[0] === 'sauce') {
          setSauceLabsCaps(cap, rawCaps);
        } else if (config.services[0] === 'browserstack') {
          setBrowserStackCaps(cap, rawCaps);
        } else if (config.services[0] === 'docker') {
          config.dockerOptions.image = 'selenium/standalone-chrome';
        } else {
          cap['goog:chromeOptions'] = {
            w3c: false,
            args: ['--ignore-certificate-errors', '--incognito']
          };
          cap['goog:loggingPrefs'] = {
            browser: 'ALL'
          };
          if (profile.browserLocale) {
            cap['goog:chromeOptions'].prefs = {
              // See chrome://prefs-internals/
              intl: {
                accept_languages: profile.browserLocale
              }
            };
          }
          if (profile.enableAnalytics || profile.networkLogs) {
            cap['goog:loggingPrefs'].performance = 'ALL';
          }
          if (profile.headless) {
            // Some sites discourage use of headless Chrome. Set user-agent as workaround
            cap['goog:chromeOptions'].args.push('--headless');
            cap['goog:chromeOptions'].args.push('--disable-gpu');
            cap['goog:chromeOptions'].args.push('--disable-extensions');
            cap['goog:chromeOptions'].args.push('--no-sandbox');
            cap['goog:chromeOptions'].args.push(
              '--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36"'
            );
            cap['goog:chromeOptions'].args.push('--window-size=1920,1080');
          }
          if (profile.extensionPath) {
            // Add an extension before launching the browser
            // Ex: --extensionPath=/common/content/extensions/Adobe-Acrobat--PDF-edit--convert--sign-tools.crx
            let extensionFullPath = path.join(__dirname, profile.extensionPath);
            cap['goog:chromeOptions'].extensions = [
              fs.readFileSync(extensionFullPath).toString('base64')
            ];
            cap['goog:chromeOptions'].args.splice(
              cap['goog:chromeOptions'].args.indexOf('--incognito'),
              1
            );
          }
        }
      } else if (cap.browserName === 'firefox') {
        cap.acceptInsecureCerts = true;
        if (config.services[0] === 'sauce') {
          setSauceLabsCaps(cap, rawCaps);
        } else if (config.services[0] === 'browserstack') {
          setBrowserStackCaps(cap, rawCaps);
        } else if (config.services[0] === 'docker') {
          config.dockerOptions.image = 'selenium/standalone-firefox';
        } else {
          cap['moz:firefoxOptions'] = {
            args: ['--private'],
            profile: await getFirefoxProfile(profile)
          };
          if (profile.headless) {
            cap['moz:firefoxOptions'].args.push('--headless');
          }
        }
        config.seleniumInstallArgs.drivers.firefox = { version: '0.31.0' };
      } else if (cap.browserName === 'internet explorer') {
        delete cap['cjson:metadata'];
        if (config.services[0] === 'sauce') {
          setSauceLabsCaps(cap, rawCaps);
        } else if (config.services[0] === 'browserstack') {
          setBrowserStackCaps(cap, rawCaps);
        } else {
          cap['se:ieOptions'] = {
            acceptUntrustedCertificates: true,
            'ie.ensureCleanSession': true,
            ignoreProtectedModeSettings: true,
            'ie.enableFullPageScreenshot': true
          };
          // to take full page screenshot, need to use 2.53.1
          //let ieDriverVersion = profile.headless ? '2.53.1' : '3.150.1';
          let ieDriverVersion = profile.headless ? '2.53.1' : '4.2.0';
          config.seleniumInstallArgs.drivers.ie = {
            version: ieDriverVersion,
            arch: 'ia32'
          };
          if (ieDriverVersion === '4.2.0') {
            config.seleniumInstallArgs.drivers.ie.fullURL = 'https://github.com/SeleniumHQ/selenium/releases/download/selenium-4.2.0/IEDriverServer_Win32_4.2.0.zip';
          }
          config.seleniumArgs = config.seleniumInstallArgs;
        }
      } else if (cap.browserName.match(/edge|xedge/)) {
        cap.browserName = 'MicrosoftEdge';
        if (config.services[0] === 'sauce') {
          setSauceLabsCaps(cap, rawCaps);
        } else if (config.services[0] === 'browserstack') {
          setBrowserStackCaps(cap, rawCaps);
        } else {
          cap['ms:edgeOptions'] = {
            args: ['--inprivate']
          };
          if (profile.headless) {
            cap['ms:edgeOptions'].args.push('headless');
            cap['ms:edgeOptions'].args.push('disable-gpu');
          }
          config.seleniumInstallArgs.drivers.chromiumedge = {
            version: getEdgeVersion()
          };
        }
      } else if (cap.browserName === 'safari') {
        if (config.services[0] === 'sauce') {
          setSauceLabsCaps(cap, rawCaps);
        } else if (config.services[0] === 'browserstack') {
          setBrowserStackCaps(cap, rawCaps);
        }
      } else if (cap.browserName.match(/^phone|^tablet/)) {
        let emulator = { phone: 'iPhone X', tablet: 'iPad' }[cap.browserName];
        cap.browserName = 'chrome';
        cap['goog:chromeOptions'] = {
          w3c: false,
          args: ['--ignore-certificate-errors', '--incognito'],
          mobileEmulation: {
            deviceName: emulator
          }
        };
        if (profile.browserLocale) {
          cap['goog:chromeOptions'].prefs = {
            // See chrome://prefs-internals/
            intl: {
              accept_languages: profile.browserLocale
            }
          };
        }
      }
      // iOS
      else if (cap.browserName.match(/^iphone|^ipad/)) {
        if (config.services[0] === 'sauce') {
          // Get SauceLabs device configuration
          // https://wiki.saucelabs.com/display/DOCS/Platform+Configurator#/
          setSauceLabsCaps(cap, rawCaps);
          if (profile.orientation) {
            cap['sauce:options'].deviceOrientation = profile.orientation;
          } else {
            cap['sauce:options'].deviceOrientation = 'portrait';
          }
        } else if (config.services[0] === 'browserstack') {
          setBrowserStackCaps(cap, rawCaps);
        } else {
          cap['appium:platformVersion'] = getIosDeviceVersion();
          let device = getIosDeviceModels(cap['appium:platformVersion'])[
            cap.browserName
          ];
          cap['appium:deviceName'] = device.name;
          cap['appium:udid'] = device.udid;
          config.services[0] = 'appium';
          config.port = 4723;
          cap['appium:automationName'] = 'XCUITest';
          cap['appium:javascriptEnabled'] = true;
          if (profile.appium) {
            config.hostname = profile.appium;
          }
          if (profile.orientation) {
            cap['appium:orientation'] = profile.orientation.toUpperCase();
          } else {
            cap['appium:orientation'] = 'PORTRAIT';
          }
          cap['appium:clearSystemFiles'] = true;
        }
        cap.platformName = 'iOS';
        cap.browserName = 'Safari';
      }
      // Android
      else if (cap.browserName.match(/^aphone|^apad|^android/)) {
        if (config.services[0] === 'sauce') {
          // Get SauceLabs device configuration
          // https://wiki.saucelabs.com/display/DOCS/Platform+Configurator#/
          setSauceLabsCaps(cap, rawCaps);
          if (profile.orientation) {
            cap['sauce:options'].deviceOrientation =
              profile.orientation.toLowerCase();
          } else {
            cap['sauce:options'].deviceOrientation = 'portrait';
          }
          cap.browserName = 'Chrome';
        } else if (config.services[0] === 'browserstack') {
          setBrowserStackCaps(cap, rawCaps);
        } else {
          cap.platformName = 'Android';
          cap.platformVersion = '9.0';
          cap.adbExecTimeout = 60000;
          cap.androidDeviceReadyTimeout = 120;
          cap.avdLaunchTimeout = 120000;
          cap.avdReadyTimeout = 180000;
          // Bug report takes long time. Need to increase newCommandTimeout
          cap.newCommandTimeout = 120;
          cap.avd = getLatestAvd();
          let avdSnapshot = getAvdSnapshot(cap.avd);
          if (avdSnapshot) {
            cap.avdArgs = `-snapshot ${avdSnapshot}`;
          } else {
            cap.avdArgs =
              '-noaudio -gpu off -verbose -no-boot-anim -no-snapshot-save';
          }
          console.log(`Use AVD "${cap.avd}"`);
          console.log(`avdArgs: ${cap.avdArgs}`);
          //config.services[0] = 'appium';
          config.services.shift();
          config.port = 4723;
          cap.automationName = 'UiAutomator2';
          cap.javascriptEnabled = true;
          if (profile.appium) {
            config.hostname = profile.appium;
          }
          if (profile.orientation) {
            cap.orientation = profile.orientation.toUpperCase();
          } else {
            cap.orientation = 'PORTRAIT';
          }
          cap.browserName = 'Chrome';
          // allowDelayAdb will prevent use of snapshot
          cap.allowDelayAdb = false;
          cap.clearSystemFiles = true;
          cap.autoGrantPermissions = true;
          cap.fastReset = true;
          cap.nativeWebScreenshot = true;
        }
      }
      config.capabilities.push(cap);
    }
    if (config.services[0] === 'sauce' || config.services[0] === 'browserstack') {
      config.maxInstances = Math.min(10, config.capabilities.length);
      if (profile.geolocation) {
        if (config.services[0] === 'browserstack') {
          config.capabilities[0]['bstack:options'].geoLocation = profile.geolocation;
        } else if (config.services[0] === 'sauce') {
          let regions = { 
            'us-west-1': 'ondemand.us-west-1.saucelabs.com', 
            'eu-central-1': 'ondemand.eu-central-1.saucelabs.com', 
            'ap-southeast-1': 'ondemand.apac-southeast-1.saucelabs.com' 
          };
          config.hostname = regions[profile.geolocation];
        }
      } else {
        profile.geolocation = profile.akamaiLocale || 'us';
      }
      if (String(profile.networkLogs).toLowerCase() === 'true') {
        if (config.services[0] === 'browserstack') {
          config.capabilities[0]['bstack:options'].networkLogs = true;
        }       
      }
      if (profile.tunnel) {
        if (config.services[0] === 'sauce') {
          config.capabilities[0]['sauce:options'].tunnelIdentifier =
            profile.tunnel;
        } else if (config.services[0] === 'browserstack') {
          config.services[0] = ['browserstack', { browserstackLocal: true }];
          config.capabilities[0]['bstack:options'].localIdentifier =
            profile.tunnel;
        }
      }
    } else {
      config.capabilities = config.capabilities.slice(0, 1);
      profile.geolocation = profile.akamaiLocale || 'us';
    }
  }

  /*
   * Handle devtools
   */
  if (config.capabilities[0].browserName === 'chrome') {
    if (process.env.devtools && process.env.devtools != 'false') {
      config.services.push('devtools');
    }
  }

  // Update Chromedriver version if use Selenium Standalone
  if (
    config.capabilities[0].browserName === 'chrome' &&
    config.services.includes('selenium-standalone')
  ) {
    let chromeVer = getChromeVersion();
    let chromedriverVer = await getMatchedChromeDriverVersion(chromeVer);
    if (chromedriverVer) {
      config.seleniumInstallArgs.drivers.chrome = {
        version: chromedriverVer
      };
    }
    config.seleniumArgs = config.seleniumInstallArgs;
  }

  if (profile.local) {
    if (config.capabilities[0].browserName === 'chrome') {
      let chromeVer = getChromeVersion();
      let chromedriverVer = await getMatchedChromeDriverVersion(chromeVer);
      let driverPath = await getChromedriver(chromedriverVer);

      config.port = await require('./tools/free_port').getFreePort();

      let idx = config.services.indexOf('selenium-standalone');
      config.services.splice(idx, 1);
      config.services.push([
        'chromedriver',
        {
          port: config.port,
          chromedriverCustomPath: driverPath
        }
      ]);
    }
  }

  if (config.services.includes('selenium-standalone')) {
    let index = config.services.findIndex(x => 'selenium-standalone');
    //config.seleniumInstallArgs.version = '3.141.59';
    config.seleniumInstallArgs.version = '4.2.2';
    config.services[index] = [
      'selenium-standalone',
      {
        installArgs: config.seleniumInstallArgs,
        args: config.seleniumInstallArgs
      }
    ];
  }

  config.profile = profile;

  if (!fs.existsSync(debugFolder)) {
    fs.mkdirSync(debugFolder, { recursive: true });
  }
  fs.writeFileSync(
    `${debugFolder}/${Date.now()}.conf.json`,
    JSON.stringify(config, null, 2)
  );

  // Get build info
  if (!profile.skipbuildinfo) {
    try {
      let buildInfoBaseUrl = null;
      if (config.profile.aem === 'author' || config.profile.aem === 'preview') {
        buildInfoBaseUrl = config.profile.baseUrl;
      } else {
        // Publish instances need the settting "publishBaseUrl"
        let directKeys = Object.keys(config.profile).filter(x =>
          x.startsWith('publishBaseUrl')
        );
        if (directKeys.length > 0) {
          buildInfoBaseUrl = config.profile[directKeys[0]];
        }
      }
      if (buildInfoBaseUrl) {
        let buildInfoUrl = urljoin(buildInfoBaseUrl, 'services/buildinfo');
        config.buildInfo = await getBuildInfo(urljoin(buildInfoUrl));
      }
    } catch (err) {
      console.log('Unable to get the build info');
    }
  } else {
    console.log('Skip getting the build info');
  }

  // For testing on direct publish instances
  if (profile.publish) {
    let publishBaseUrl = null;
    if (profile.publish === true) {
      publishBaseUrl = profile.publishBaseUrl;
    }
    if (!publishBaseUrl) {
      publishBaseUrl = profile[`publishBaseUrl_${profile.publish}`];
    }
    if (!publishBaseUrl) {
      throw `No publishBaseUrl configured in the profile!`;
    }
    // Add contentPath in the profile
    if (profile.contentPath) {
      config.baseUrl = urljoin(publishBaseUrl, profile.contentPath);
    }
    if (config.currentLocale) {
      config.baseUrl = urljoin(config.baseUrl, config.currentLocale.author);
    }
  }

  // For teams to override wdio.conf.js
  let wdioCfgJS = path.join(__dirname, 'wdio.conf.js');
  if (fs.existsSync(path.join(site, 'wdio.conf.js'))) {
    wdioCfgJS = path.join(site, 'wdio.conf.js');
  }

  // need to use an env variable to pass framework to child processes
  process.env.framework = framework;
  const wdio = new Launcher(wdioCfgJS, config);

  wdio.run().then(
    code => {
      // workaround for https://github.com/webdriverio/selenium-standalone/issues/599 
      if (config.services[0][0] === 'selenium-standalone') {
        const { killPort } = require('./tools/kill_port');
        killPort(4444);
      }
      if ('exit' in argv) {
        // force exit code
        process.exit(parseInt(argv.exit));
      } else {
        process.exit(code);
      }
    },
    error => {
      console.error('Launcher failed to start the test', error.stacktrace);
      process.exit(1);
    }
  );
};

main().catch(error => {
  console.log(error);
});
