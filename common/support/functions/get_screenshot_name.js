const fs = require('fs');
const path = require('path');
const moment = require('moment');
/*
 * Use text mapping to translate text
 * @param  {Object}   obj String or Array or Array of Array of String
 */
export default (folder, filename, browser) => {
  if (folder == undefined) {
    folder = 'screenshots';
  }
  if (filename == undefined) {
    let info = [];
    info.push(moment().format('YYYY-MM-DD_HH-mm-ss-SSS'));
    if (browser.config.profile.browser != undefined) {
      info.push(browser.config.profile.browser);
    }
    if (browser.config.profile.locale != undefined) {
      info.push(browser.config.profile.locale.replace('/', ''));
    }
    filename = info.join('-');
  }
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
  }

  return path.join(folder, `${filename}.png`);
};
