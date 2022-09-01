const os = require('os');
const path = require('path');
const fs = require('fs');
const selenium = require('selenium-standalone');

async function getChromedriver(version) {
  let originalPath = path.join(
    os.tmpdir(),
    'chromedriver',
    `${version}-${process.arch}`,
    'chromedriver'
  );
  let driverPath = originalPath;
  if (process.platform === 'win32') {
    driverPath += '.exe';
  }
  let retry = 10;
  while (retry-- > 0) {
    try {
      if (!fs.existsSync(driverPath)) {
        await selenium.install({
          basePath: os.tmpdir(),
          drivers: {
            chrome: {
              version: version,
              arch: process.arch,
              baseURL: 'https://chromedriver.storage.googleapis.com'
            }
          }
        });
        if (process.platform === 'win32') {
          fs.renameSync(originalPath, driverPath);
        }
      }
      break;
    } catch (err) {
      console.error(err);
      await new Promise(resolve => setTimeout(resolve, 10000));
    }
  }
  return driverPath;
}

exports.getChromedriver = getChromedriver;
