/** @module common/tools/bce */
const fs = require('fs');
const path = require('path');
const urljoin = require('url-join');
const querystring = require('querystring');
const yaml = require('js-yaml');
const execSync = require('child_process').execSync;

/**
 * Expand configurations in pages
 * @param {Object} config - content of screenshot config file
 */
function processConfig(config) {
  let pages = config.pages;
  let configs = config.configs;
  if (configs) {
    for (let key in configs) {
      let newPages = [];
      let holder = `<${key}>`;
      for (let i = 0; i < pages.length; i++) {
        if (pages[i].includes(holder)) {
          for (let j = 0; j < configs[key].length; j++) {
            let exPath = pages[i].replace(holder, configs[key][j].path);
            if (configs[key][j].query) {
              let params = exPath.split('?');
              let newParams = params[1] ? querystring.decode(params[1]) : {};
              Object.assign(newParams, configs[key][j].query);
              exPath = `${params[0]}?${querystring.encode(newParams)}`;
            }
            newPages.push(exPath);
          }
        } else {
          newPages.push(pages[i]);
        }
      }
      pages = newPages;
    }
  }
  config.pages = pages;
}

function readIeLogs(filename) {
  let logs = [];
  let ieLogs = JSON.parse(fs.readFileSync(filename));
  for (let e of ieLogs) {
    let parts = e.message.split(' ', 1);
    if (!['Error', 'Warning', 'Message'].includes(parts[0])) {
      continue;
    }
    logs.push({
      level: parts[0],
      text: e.message.substring(parts[0].length + 1),
      url: e.link
    });
  }
  return logs;
}

function readChromeLogs(chromeLogs) {
  let logs = [];
  for (let e of chromeLogs) {
    logs.push({
      level: e.level.toLowerCase(),
      text: e.message,
      source: e.source,
      url: e.url
    });
  }
  return logs;
}

function filterLogs(logs, ignores) {
  if (!ignores) {
    return logs;
  }
  let filtered = [];
  for (let e of logs) {
    let okIgnore = false;
    for (let i of ignores) {
      e.url = e.url || '';
      if (
        e.level.match(i.level) &&
        e.text.match(i.text) &&
        e.url.match(i.url)
      ) {
        okIgnore = true;
        break;
      }
    }
    if (okIgnore === true) {
      continue;
    }
    filtered.push(e);
  }
  return filtered;
}
/**
 * Entry point of this tool
 */
describe('Take Screenshots', () => {
  before(function () {
    let configYml = browser.config.profile.config;

    if (!configYml) {
      throw `Please provide --config`;
    }

    let config = yaml.load(fs.readFileSync(configYml));

    processConfig(config);

    let params = ['envUrl', 'envUrlA', 'envUrlB'];
    let envUrls = [config[params[0]], config[params[1]], config[params[2]]];
    for (let i = 0; i < params.length; i++) {
      if (browser.config.profile[params[i]]) {
        envUrls[i] = browser.config.profile[params[i]];
      }
    }

    if (!envUrls[0] && !(envUrls[1] && envUrls[2])) {
      throw `Please provide --envUrl or (--envUrlA and --envUrlB)`;
    }

    // If profiles is provided, env is profile name.
    if (browser.config.profile.profiles) {
      let profilesYml = browser.config.profile.profiles;
      let profiles = yaml.load(fs.readFileSync(profilesYml));
      for (let i = 0; i < envUrls.length; i++) {
        if (envUrls[i]) {
          envUrls[i] = profiles[envUrls[i]].baseUrl;
        }
      }
    }

    if (config.before) {
      if (config.before.cookies) {
        let cookies = config.before.cookies;
        for (let envUrl of envUrls) {
          if (envUrl) {
            browser.url(envUrl);
            let parts = envUrl.split('.');
            parts[0] = '';
            let domain = parts.join('.');
            for (let name in cookies) {
              browser.setCookies({ name, value: cookies[name] });
              browser.setCookies({ name, value: cookies[name], domain });
            }
          }
        }
      }
    }

    this.config = config;
    this.envUrls = envUrls;

    if (browser.capabilities.browserName === 'internet explorer') {
      let exitCode = execSync('node common/utils/auto_ie.js --run openConsole');
      if (exitCode != 0) {
        throw 'IE browser console cannot be opened';
      }
    }
  });

  it('should get browser error', function () {
    this.timeout(0);

    let configYml = browser.config.profile.config;
    let config = this.config;
    let envUrls = this.envUrls;

    let cfgBaseName = path.basename(configYml, '.yml');

    let layout = null;
    if (browser.config.profile.layout) {
      layout = browser.config.layouts[browser.config.profile.layout];
    }

    let pages = config.pages;
    let wait = config.wait || {};
    let element = wait.element;
    let timeout = wait.timeout || 30000;
    let pause = wait.pause || 1000;

    let results = [];

    for (let i = 0; i < pages.length; i++) {
      let location = [];
      let result = {};

      for (let envIndex = 0; envIndex < envUrls.length; envIndex++) {
        let envUrl = envUrls[envIndex];
        let label = ['', 'a', 'b'][envIndex];

        if (!envUrl) continue;

        let page = pages[i];
        let url = urljoin(envUrl, page);

        location.push(url);

        browser.url(url);

        let width = -1;
        if (!browser.isMobile) {
          if (layout) {
            let size = layout.split('x').map(x => parseInt(x));
            browser.setWindowSize(size[0], size[1]);
            width = size[0];
          } else {
            browser.maximizeWindow();
            let size = browser.getWindowSize();
            width = size.width;
          }
        }
        if (element) {
          try {
            $(element).waitForExist({ timeout: timeout });
          } catch (x) {
            console.log(`Wait timeout ${timeout}ms for element ${element}`);
          }
        } else {
          browser.pause(timeout);
        }

        browser.pause(pause);

        if (!browser.isMobile) {
          // Scroll to the bottom. Trigger delay loading
          //browser.execute('window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);');
          browser.execute(
            'window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: "smooth" });'
          );

          browser.pause(1000);
        }

        browser.pause(1000);

        let logs = null;
        if (browser.getLogs) {
          logs = browser.getLogs('browser');
        }
        if (browser.capabilities.browserName === 'internet explorer') {
          let filename = `${new Date().getTime()}.json`;
          let exitCode = execSync(
            `node common/utils/auto_ie.js --run getErrors --output ${filename}`
          );
          if (exitCode != 0) {
            throw 'IE browser console errors cannot be saved';
          }
          logs = readIeLogs(filename);
          fs.unlinkSync(filename);
        } else if (browser.capabilities.browserName === 'chrome') {
          logs = readChromeLogs(logs);
        }
        if (logs) {
          logs = filterLogs(logs, config.ignores);
          if (envIndex === 0 || envIndex === 1) {
            result.a_log = logs;
          } else if (envIndex === 2) {
            result.b_log = logs;
          }
        }
      }
      result.order = i + 1;
      result.location = location.join('|');

      results.push(result);
    }

    fs.writeFileSync('results.json', JSON.stringify(results, null, 2));
  });
});
