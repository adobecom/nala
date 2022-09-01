const os = require('os');
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const axios = require('axios');

const getExeVersion = exePath => {
  try {
    if (process.platform === 'win32') {
      exePath = exePath.replace(/\\/g, '\\\\');
      let res = spawnSync(
        'wmic',
        [`datafile where name=\"${exePath}\" get Version`],
        {
          shell: true
        }
      );
      return res.stdout.toString().split('\n')[1].trim();
    } else if (process.platform === 'darwin') {
      let res = spawnSync(exePath, ['--version'], {
        shell: true
      });
      return res.stdout.toString().split('\n')[0].trim().split(' ').pop();
    } else if (process.platform === 'linux') {
      let res = spawnSync(exePath, ['--version'], {
        shell: true
      });
      return res.stdout.toString().split('\n')[0].trim().split(' ').pop();      
    } else {
      return 'Unspported';
    }
  } catch (err) {
    return 'Unknown';
  }
};

const getWebdriverVersion = driver => {
  let res = spawnSync('npx', [`${driver} --version`], {
    shell: true
  });
  return res.stdout.toString().split('\n')[0];
};

const getChromeVersion = () => {
  let win32path =
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe';

  // test the alternative location
  if (process.platform === 'win32') {
    let altPath = path.join(
      os.homedir(),
      'AppData\\Local\\Google\\Chrome\\Application\\chrome.exe'
    );
    if (fs.existsSync(altPath)) {
      win32path = altPath;
    }
  }

  let exePath = {
    win32: win32path,
    darwin: '/Applications/Google\\ Chrome.app/Contents/MacOS/Google\\ Chrome',
    linux: '/usr/bin/google-chrome'
  }[process.platform];
  return getExeVersion(exePath);
};

const getFirefoxVersion = () => {
  let exePath = {
    win32: 'C:\\Program Files\\Mozilla Firefox\\firefox.exe',
    darwin: '/Applications/Firefox.app/Contents/MacOS/firefox'
  }[process.platform];
  return getExeVersion(exePath);
};

const getEdgeVersion = () => {
  let exePath = {
    win32: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    darwin: '/Applications/Microsoft\\ Edge.app/Contents/MacOS/Microsoft\\ Edge'
  }[process.platform];
  return getExeVersion(exePath);
};

async function getMatchedChromeDriverVersion(chromeVersion) {
  // See doc at
  // https://chromedriver.chromium.org/downloads/version-selection
  try {
    let url = `https://chromedriver.storage.googleapis.com/LATEST_RELEASE`;
    if (chromeVersion) {
      let ver = chromeVersion.split('.').slice(0, 3).join('.');
      url = `https://chromedriver.storage.googleapis.com/LATEST_RELEASE_${ver}`;
    }
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    return null;
  }
}

exports.getExeVersion = getExeVersion;
exports.getChromeVersion = getChromeVersion;
exports.getWebdriverVersion = getWebdriverVersion;
exports.getFirefoxVersion = getFirefoxVersion;
exports.getEdgeVersion = getEdgeVersion;
exports.getMatchedChromeDriverVersion = getMatchedChromeDriverVersion;
