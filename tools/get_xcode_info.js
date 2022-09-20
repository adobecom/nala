const { spawnSync } = require('child_process');

function getIosSdkVersion() {
  let res = spawnSync('xcodebuild', ['-showsdks'], {
    shell: true
  });
  let m = res.stdout.toString().match(/iOS (\d+.\d+)/);

  return m ? m[1] : '13.3';
}

/**
 * Get the the iOS version
 * @returns {string} The latest iOS version in available simulators
 */
function getIosDeviceVersion() {
  try {
    let res = spawnSync('xcrun', ['xctrace list devices'], {
      shell: true
    });
    let output = '';
    if (res.stderr.length > 0) {
      output = res.stderr.toString();
    } else if (res.stdout.length > 0) {
      output = res.stdout.toString();
    }
    let matches = output.matchAll(/iPhone [^\(]+\((\d+.\d+)\)/g);
    let latest = [0, 0];
    for (let m of matches) {
      let v = m[1].split('.').map(x => parseInt(x));
      if (v[0] > latest[0] || (v[0] === latest[0] && v[1] > latest[1])) {
        latest = v;
      }
    }
    return latest.join('.');
  } catch (err) {
    return '13.3';
  }
}

/**
 * Get the latest available iPhone and iPad simulators
 * @param {string} version Latest iPhone and iPad models with this version
 * @returns {object} Latest iPhone and iPad models
 */
function getIosDeviceModels(version) {
  try {
    let res = spawnSync('xcrun', ['xctrace list devices'], {
      shell: true
    });
    // Find available iPhone and iPad simulators
    let output = '';
    if (res.stderr.length > 0) {
      output = res.stderr.toString();
    } else if (res.stdout.length > 0) {
      output = res.stdout.toString();
    }
    output = output.split('\n');
    let regex = RegExp(`^(.+)\\s\\(${version}\\)\\s\\((.+)\\)`);
    let found = { iphone: [], ipad: [] };
    for (let line of output) {
      let m = line.match(regex);
      if (m) {
        if (m[1].startsWith('iPhone ')) {
          found.iphone.push({name: m[1], udid: m[2]});
        } else {
          found.ipad.push({name: m[1], udid: m[2]});
        }
      }
    }
    // Get the latest iPhone X
    let iphone = { name: null, version: 0 };
    for (let item of found.iphone) {
      let m = item.name.match(/^iPhone\s(\d+)/);
      if (m) {
        let thisVersion = parseInt(m[1]);
        if (thisVersion > iphone.version) {
          iphone.name = item.name.replace(' Simulator', '');
          iphone.udid = item.udid;
          iphone.version = thisVersion;
        }
      }
    }
    // Get the latest iPad (Xth generation)
    let ipad = { name: null, version: 0 };
    for (let item of found.ipad) {
      let m = item.name.match(/^iPad\s\((\d+)/);
      if (m) {
        let thisVersion = parseInt(m[1]);
        if (thisVersion > ipad.version) {
          ipad.name = item.name.replace(' Simulator', '');
          ipad.udid = item.udid;
          ipad.version = thisVersion;
        }
      }
    }
    return { iphone, ipad };
  } catch (err) {
    return { iphone: 'iPhone 11', ipad: 'iPad (7th generation)' };
  }
}

exports.getIosSdkVersion = getIosSdkVersion;
exports.getIosDeviceVersion = getIosDeviceVersion;
exports.getIosDeviceModels = getIosDeviceModels;
