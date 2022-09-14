import cucumberJson from 'wdio-cucumberjs-json-reporter';

/**
 * Runs before a Cucumber Scenario.
 * @param {ITestCaseHookParameter} world    world object containing information on pickle and test step
 * @param {Object}                 context  Cucumber World object
 */
function beforeScenario(world, context) {
    browser.config.currentScenarioName = world.pickle.name;
    cucumberJson.attach({ profile: browser.config.profile }, 'application/json');

    if (testCount > 0) {
        browser.reloadSession();
    }

    if (devTools.has('Network')) {
        global.logNetwork = [];
        browser.cdp('Network', 'enable');
        browser.on('Network.responseReceived', params => {
            logNetwork.push(params.response);
        });
    }

    if (devTools.has('Log')) {
        global.logConsole = [];
        browser.cdp('Log', 'enable');
        browser.on('Log.entryAdded', params => {
            logConsole.push(params.entry);
        });
    }

    if (!browser.config.profile.browser.match(/phone|pad|tablet|android/)) {
        if (browser.config.profile.layout) {
            let winSize = browser.config.layouts[browser.config.profile.layout];
            if (winSize == null) {
                throw `The layout "${browser.config.profile.layout}" is not configured`;
            }
            let sizes = winSize.split('x').map(x => parseInt(x));
            browser.setWindowSize(sizes[0], sizes[1]);
        } else {
            browser.maximizeWindow();
        }
    }

    if (devTools.has('Network')) {
        logNetwork = [];
    }
    if (devTools.has('Console')) {
        browser.cdp('Log', 'clear');
        logConsole = [];
    }

    // precondition browser
    if (browser.config.profile.beforeScenario) {
        let cookies = browser.config.profile.beforeScenario.cookies;
        if (cookies) {
            browser.url(browser.config.profile.baseUrl);
            for (let name in cookies) {
                browser.setCookies({ name, value: cookies[name] });
            }
        }
    }
}

exports.beforeScenario = beforeScenario;