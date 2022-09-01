/** @module common/tools/screenshot */
const fs = require('fs');
const path = require('path');
const urljoin = require('url-join');
const querystring = require('querystring');
const yaml = require('js-yaml');
const { spawnSync } = require('child_process');
import { resizeFullPage } from '../../support/action/resize_full_page';

/**
 * Base function for calling an ImageMagick command
 * @param {String} cmd
 * @param {String} args
 */
function magickCmd(cmd, args) {
  let res = spawnSync('magick', [cmd, args], {
    shell: true
  });
  return res;
}

/**
 * Get the size of an image by ImageMagick
 * @param {String} file
 */
function identify(file) {
  let res = magickCmd('identify', file);
  let m = res.stdout.toString('utf-8').match(/PNG (\d+)x(\d+)/);
  return { width: parseInt(m[1]), height: parseInt(m[2]) };
}

/**
 *
 * @param {String} file - the file to be processed
 * @param {String} output - the output file after processing
 * @param {Object} options - chopping options
 * @param {Number} [options.top] - chopping top
 * @param {Number} [options.bottom] - chopping bottom
 */
function chop(file, output, options) {
  options = options || {};
  let top = options.top || 0;
  let bottom = options.bottom || 0;
  let args = `${file} -gravity North -chop 0x${top} -gravity South -chop 0x${bottom} ${output}`;
  return magickCmd('convert', args);
}

/**
 * Stitch an array of image files with ImageMagick
 * @param {String[]} files - the files to be stitched
 * @param {String} output - the output file after stitching
 * @param {Object} options - chopping options
 */
function stitch(files, output, options) {
  let tmpfiles = [];
  let lastTop = 0;
  for (let i = 0; i < files.length; i++) {
    let file = files[i];

    let m = file.match(/-(\d+)-(\d+)x(\d+).png$/);
    let top = parseInt(m[1]);
    let width = parseInt(m[2]);
    let height = parseInt(m[3]);
    let tmpfile = file.replace('.png', 'x.png');

    if (i === files.length - 1) {
      // Need to chop off repeated area
      // Use width ratio to convert dp to pixel
      let size = identify(file);
      let chopY = ((lastTop + height - top) * size.width) / width;
      chop(file, tmpfile, { top: options.top + chopY, bottom: options.bottom });
    } else {
      chop(file, tmpfile, options);
    }
    tmpfiles.push(tmpfile);
    lastTop = top;
  }
  let filesArg = tmpfiles.join(' ');
  let args = `${filesArg} -tile 1 -geometry +0+0 ${output}`;
  return magickCmd('montage', args);
}

/**
 * Expand configurations in pages
 * @param {Object} config - content of screenshot config file
 */
function processConfig(config) {
  let pages = config.pages;
  for (let i = 0; i < pages.length; i++) {
    if (typeof pages[i] === 'string') {
      pages[i] = { url: pages[i] };
    }
  }
  let configs = config.configs;
  if (configs) {
    for (let key in configs) {
      let newPages = [];
      let holder = `<${key}>`;
      for (let i = 0; i < pages.length; i++) {
        if (pages[i].url.includes(holder)) {
          for (let j = 0; j < configs[key].length; j++) {
            let exPath = pages[i].url.replace(holder, configs[key][j].path);
            if (configs[key][j].query) {
              let params = exPath.split('?');
              let newParams = params[1] ? querystring.decode(params[1]) : {};
              Object.assign(newParams, configs[key][j].query);
              exPath = `${params[0]}?${querystring.encode(newParams)}`;
            }
            let exPage = { ...pages[i] };
            exPage.url = exPath;
            newPages.push(exPage);
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

/**
 * Replace variables with values in pages
 * @param {Object} config - content of screenshot config file
 */
function processVariables(envUrl, path, config) {
  let variables = config.variables;
  if (!variables) {
    return path;
  }
  let matches = path.matchAll(/<(.+)>/gi);
  matches = Array.from(matches);
  for (let m of matches) {
    let cases = variables[m[1]];
    for (let c in cases) {
      let regex = new RegExp(cases[c]);
      if (envUrl.match(regex)) {
        path = path.replace(m[0], c);
        break;
      }
    }
  }
  return path;
}

/**
 * Entry point of this tool
 */
describe('Take Screenshots', () => {
  before(function () {
    let configYml = browser.config.profile.config;
    let url = browser.config.profile.url;

    if (!configYml && !url) {
      throw `Please provide --config or --url`;
    }

    if (configYml) {
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
          let env = envUrls[i];
          if (env && profiles[env]) {
            let url = profiles[env].baseUrl;
            if (profiles[env].beforeScenario) {
              if (profiles[env].beforeScenario.cookies) {
                let cookies = profiles[env].beforeScenario.cookies;
                browser.url(url);
                let parts = url.split('.');
                parts[0] = '';
                let domain = parts.join('.');
                for (let name in cookies) {
                  browser.setCookies({ name, value: cookies[name] });
                  browser.setCookies({ name, value: cookies[name], domain });
                }
              }
            }
            envUrls[i] = url;
          }
        }
      }

      this.configYml = configYml;
      this.config = config;
      this.envUrls = envUrls;
    } else {
      let uri = new URL(url);
      this.config = {
        pages: [uri.pathname]
      };
      this.envUrls = [uri.origin];
      this.configYml = 'url.yml';
    }
  });

  it('should take screenshots', function () {
    this.timeout(0);

    let configYml = this.configYml;
    let config = this.config;
    let envUrls = this.envUrls;

    // screenshot configuration file
    let screenshotCfgPath = path.join(__dirname, 'screenshot.yml');
    let screenshotCfg = {};
    if (fs.existsSync(screenshotCfgPath)) {
      screenshotCfg = yaml.load(fs.readFileSync(screenshotCfgPath));
    }

    let outputDir = config.outputDir || 'screenshots';
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
    let configTarget = config.target;

    let results = [];

    for (let i = 0; i < pages.length; i++) {
      let location = [];
      let result = {};

      for (let envIndex = 0; envIndex < envUrls.length; envIndex++) {
        let envUrl = envUrls[envIndex];
        let label = ['', 'a', 'b'][envIndex];

        if (!envUrl) continue;

        let page = pages[i].url;
        let target = configTarget;
        if (pages[i].target) {
          target = pages[i].target;
        }

        page = processVariables(envUrl, page, config);

        let url = urljoin(envUrl, page);

        location.push(url);

        console.log(`Open ${url}`);
        browser.navigateTo(url);

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

          resizeFullPage(width);
        }

        browser.pause(1000);

        if (!fs.existsSync(outputDir)) {
          fs.mkdirSync(outputDir, { recursive: true });
        }

        let filename = null;
        if (envIndex === 0) {
          filename = `${cfgBaseName}-${i}.png`;
        } else {
          filename = `${cfgBaseName}-${i}-${label}.png`;
        }
        let output = path.join(outputDir, filename);

        if (browser.isMobile) {
          let density = browser.isAndroid ? browser.getDisplayDensity() : 1;
          console.log(`Density: ${density}`);

          let height = browser.execute('return document.body.scrollHeight');
          console.log(`Height: ${height}`);

          const vieww = browser.execute(
            'return Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)'
          );
          console.log(`Viewport: ${vieww}`);
          const viewh = browser.execute(
            'return Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)'
          );
          console.log(`Viewport: ${viewh}`);

          let files = [];
          for (let i = 0; i < height; i += viewh) {
            console.log(i);
            //browser.execute('window.scrollTo(0, arguments[0])', i);
            browser.execute(
              "window.scroll({top: arguments[0], left: 0, behavior: 'smooth'})",
              i
            );
            browser.pause(1000);
            height = browser.execute('return document.body.scrollHeight');
            console.log(`Height: ${height}`);
            let voutput = output.replace(
              '.png',
              `-${Math.min(i, height - viewh)}-${vieww}x${viewh}.png`
            );
            files.push(voutput);
            browser.saveScreenshot(voutput);
          }
          let options = screenshotCfg[browser.config.profile.browser].chop;
          stitch(files, output, options);
        } else {
          if (target) {
            browser.execute(
              "window.scroll({top: 0, left: 0, behavior: 'smooth'})"
            );
            const node = browser.$(target);
            node.scrollIntoView(false);
            browser.pause(1000);
            node.saveScreenshot(output);
          } else {
            browser.saveScreenshot(output);
          }
        }

        if (envIndex === 0 || envIndex === 1) {
          result.a = output;
        } else if (envIndex === 2) {
          result.b = output;
        }
      }
      result.order = i + 1;
      result.location = location.join('|');
      results.push(result);
    }

    fs.writeFileSync('results.json', JSON.stringify(results, null, 2));
  });
});
