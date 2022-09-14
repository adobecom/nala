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
    getChromeVersion,
    getMatchedChromeDriverVersion
} = require('./tools/get_browser_info');
const { processFeatureOutlines } = require('./tools/feature_outline');

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

    if (parts.includes('mac') || parts.includes('catalina') || parts.includes('mac15')) {
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
    } else if (parts.includes('win11')) {
        platform = 'Windows 11'
    }

    return { browser: browser, platform: platform, headless: headless };
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
        cap['appium:platformVersion'] = '15.0'
        opt.appiumVersion = '1.22.0'
    } else if (cap.browserName.match(/^aphone|^android/)) {
        cap.platformName = 'Android';
        delete opt.screenResolution;
        cap['appium:deviceName'] = {
            android: 'Google Pixel 3 GoogleAPI Emulator',
            aphone: 'Google Pixel 3 GoogleAPI Emulator',
            apad: ''
        }[cap.browserName];
        cap['appium:platformVersion'] = '11.0'
        opt.appiumVersion = '1.20.2'
    }
}

const setGitHubVmsCaps = (cap, rawCaps) => {
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

const main = async() => {
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
        console.log('Please specify a site directory. e.g. milo. ');
        process.exit(1);
    }

    const commonModule = 'node_modules/@mwp/common-automation';
    // process.env.NODE_EXTRA_CA_CERTS = 'tools/certs/DigiCert_Intermediate.pem';

    // Need the extra cert that is not in NodeJS
    // if (fs.existsSync(commonModule)) {
    //   process.env.NODE_EXTRA_CA_CERTS = [
    //     commonModule,
    //     process.env.NODE_EXTRA_CA_CERTS
    //   ].join('/');
    // }

    processFeatureOutlines(site);

    // Find framework to use 'cucumber' or 'mocha'
    let framework = null;
    let features = argv._.slice(1);

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
        let tags = argv.tags.split(/\s+/).filter(x => {
            return x[0] === '@';
        });
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

    // Read profile.yml from the specified site directory
    let profilesPath = path.join(site, 'profiles.yml');
    if (!fs.existsSync(profilesPath)) {
        console.log(`Can't find the file: ${profilesPath}`);
        process.exit(1);
    }

    let fileContents = fs.readFileSync(profilesPath, 'utf8');
    let profiles = yaml.safeLoad(fileContents);

    // Command line argv overrides default argv
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

    /*
     * Handle locale
     */
    // if (profile.localeCfg) {
    //   let localeCfgPath = path.join(site, 'config', profile.localeCfg);
    //   config.locales = yaml.safeLoad(fs.readFileSync(localeCfgPath, 'utf8'));
    // }
    // if (profile.localeRegion != null && profile.locale == null) {
    //   let region = profile.localeRegion;
    //   if (config.locales == null) {
    //     throw 'The argument localeRegion needs a locale configuration file';
    //   } else {
    //     let found = config.locales.filter(x =>
    //       x.region.toUpperCase().includes(region.toUpperCase())
    //     );
    //     if (found.length == 0) {
    //       throw `The region "${region}" is not found in the locale configuration file`;
    //     } else if (found.length > 1) {
    //       throw `The region "${region}" has ${found.length} languages. Please use --locale`;
    //     }
    //     profile.locale = found[0].locale;
    //   }
    // }

    // if (profile.locale === 'none') {
    //   profile.locale = '';
    // } else {
    //   if (profile.locale === null || profile.locale === 'default') {
    //     profile.locale =
    //       profile.localeDefault != null ? profile.localeDefault : '';
    //   }
    //   if (config.locales) {
    //     config.currentLocale = config.locales.find(
    //       x => x.locale === profile.locale
    //     );
    //   }
    // }
    // // browser locale
    // if (profile.browserLocale === 'auto' || profile.akamaiLocale === 'auto') {
    //   if (!config.locales) {
    //     throw 'The argument akamaiLocale or browserLocale needs a locale configuration file specified with localeCfg';
    //   }
    //   if (!config.currentLocale) {
    //     throw `The locale "${profile.locale}" is not found in the locale configuration file`;
    //   }
    //   if (profile.browserLocale === 'auto') {
    //     profile.browserLocale = config.currentLocale.browser;
    //   }
    //   if (profile.akamaiLocale === 'auto') {
    //     profile.akamaiLocaleAuto = true;
    //     profile.akamaiLocale = config.currentLocale.akamai;
    //   }
    // }

    // if (profile.aem && profile[`${profile.aem}Path`]) {
    //   config.baseUrl = urljoin(config.baseUrl, profile[`${profile.aem}Path`]);
    // }

    // if (
    //   profile.aem === 'preview' &&
    //   config.currentLocale &&
    //   config.currentLocale.author
    // ) {
    //   config.baseUrl = urljoin(config.baseUrl, config.currentLocale.author);
    // } else if (profile.locale) {
    //   config.baseUrl = urljoin(config.baseUrl, profile.locale);
    // }

    // if (profile.locale) {
    //   let localesDir = 'locales';
    //   if (profile.localeCfg) {
    //     localesDir = path.basename(profile.localeCfg, '.yml');
    //   }

    // Localized text mapping file
    //   if (profile.locale) {
    //     let textFile = path.join(
    //       site,
    //       'config',
    //       localesDir,
    //       `text_${profile.locale.replace('/', '_')}.yml`
    //     );
    //     if (fs.existsSync(textFile)) {
    //       config.localeText = yaml.safeLoad(fs.readFileSync(textFile, 'utf8'));
    //     }
    //     let propFile = path.join(
    //       site,
    //       'config',
    //       localesDir,
    //       `prop_${profile.locale.replace('/', '_')}.yml`
    //     );
    //     if (fs.existsSync(propFile)) {
    //       config.localeProp = yaml.safeLoad(fs.readFileSync(propFile, 'utf8'));
    //     }
    //     if (profile.localeDefault) {
    //       let propDefaultFile = path.join(
    //         site,
    //         'config',
    //         localesDir,
    //         `prop_${profile.localeDefault.replace('/', '_')}.yml`
    //       );
    //       if (fs.existsSync(propDefaultFile)) {
    //         config.localePropDefault = yaml.safeLoad(
    //           fs.readFileSync(propDefaultFile, 'utf8')
    //         );
    //       }
    //     }
    //   } else {
    //     let defaultLocale = 'us/en';
    //     let propDefaultFile = path.join(
    //       site,
    //       'config',
    //       localesDir,
    //       `prop_${defaultLocale.replace('/', '_')}.yml`
    //     );
    //     if (fs.existsSync(propDefaultFile)) {
    //       config.localePropDefault = yaml.safeLoad(
    //         fs.readFileSync(propDefaultFile, 'utf8')
    //       );
    //     }
    //   }
    // }

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
        if (profile.maxInstances) {
            config.maxInstances = profile.maxInstances;
        }
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
                    // if (profile.browserLocale) {
                    //   cap['goog:chromeOptions'].prefs = {
                    //     // See chrome://prefs-internals/
                    //     intl: {
                    //       accept_languages: profile.browserLocale
                    //     }
                    //   };
                    // }
                    if (profile.enableAnalytics) {
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
                        //cap['goog:chromeOptions'].args.push('--window-size=1920,1080');
                    }
                }
            } else if (cap.browserName === 'firefox') {
                cap.acceptInsecureCerts = true;
                if (config.services[0] === 'sauce') {
                    setSauceLabsCaps(cap, rawCaps);
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
            } else if (cap.browserName === 'internet explorer') {
                delete cap['cjson:metadata'];
                if (config.services[0] === 'sauce') {
                    setSauceLabsCaps(cap, rawCaps);
                } else {
                    cap['se:ieOptions'] = {
                        acceptUntrustedCertificates: true,
                        'ie.ensureCleanSession': true,
                        ignoreProtectedModeSettings: true,
                        'ie.enableFullPageScreenshot': true
                    };
                    // to take full page screenshot, need to use 2.53.1
                    let ieDriverVersion = profile.headless ? '2.53.1' : '3.150.1';
                    config.seleniumInstallArgs.drivers.ie = {
                        version: ieDriverVersion,
                        arch: 'ia32'
                    };
                    config.seleniumArgs = config.seleniumInstallArgs;
                }
            } else if (cap.browserName.match(/edge|xedge/)) {
                cap.browserName = 'MicrosoftEdge';
                if (config.services[0] === 'sauce') {
                    setSauceLabsCaps(cap, rawCaps);
                } else {
                    cap['ms:edgeOptions'] = {
                        args: ['--inprivate']
                    };
                    if (profile.headless) {
                        cap['ms:edgeOptions'].args.push('headless');
                        cap['ms:edgeOptions'].args.push('disable-gpu');
                    }
                    config.seleniumArgs = {
                        javaArgs: [
                            `-Dwebdriver.edge.driver=${require('@sitespeed.io/edgedriver').binPath()}`
                        ]
                    };
                }
            } else if (cap.browserName === 'safari') {
                if (config.services[0] === 'sauce') {
                    setSauceLabsCaps(cap, rawCaps);
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
                // if (profile.browserLocale) {
                //   cap['goog:chromeOptions'].prefs = {
                //     // See chrome://prefs-internals/
                //     intl: {
                //       accept_languages: profile.browserLocale
                //     }
                //   };
                // }
            }
            config.capabilities.push(cap);
        }
        if (config.services[0] === 'sauce') {
            config.maxInstances = Math.min(10, config.capabilities.length);
            if (profile.tunnel) {
                if (config.services[0] === 'sauce') {
                    config.capabilities[0]['sauce:options'].tunnelIdentifier = profile.tunnel;
                }
            }
        } else {
            config.capabilities = config.capabilities.slice(0, 1);
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

    config.profile = profile;

    if (!fs.existsSync(debugFolder)) {
        fs.mkdirSync(debugFolder, { recursive: true });
    }
    fs.writeFileSync(
        `${debugFolder}/${Date.now()}.conf.json`,
        JSON.stringify(config, null, 2)
    );

    // need to use an env variable to pass framework to child processes
    process.env.framework = framework;
    const wdio = new Launcher(path.join(__dirname, 'wdio.conf.js'), config);

    wdio.run().then(
        code => {
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