const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

function getAvds() {
  let androidHome = process.env['ANDROID_HOME'];
  if (androidHome) {
    let avds = [];
    let avdManager = path.join(
      androidHome,
      'cmdline-tools',
      'latest',
      'bin',
      'avdmanager'
    );
    try {
      let res = spawnSync(avdManager, ['list avd'], {
        shell: true
      });
      let output = res.stdout.toString();
      let lines = output.split('\n');
      for (let line of lines) {
        let m = line.match(/Name: (.+)/);
        if (m) {
          avds.push(m[1]);
        }
      }
      console.log('Found AVDs');
      console.log(avds);
      return avds;
    } catch (err) {
      // Use the defaut value
    }
  }
  return ['Pixel_3_API_28'];
}

function getLatestAvd() {
  let avds = getAvds();
  let avd = { name: null, version: 0 };
  for (let a of avds) {
    let m = a.match(/API_(\d+)/);
    if (m) {
      let thisVersion = parseInt(m[1]);
      if (thisVersion > avd.version) {
        avd.name = a;
        avd.version = thisVersion;
      }
    }
  }

  return avd.name;
}

function getAvdSnapshot(avd) {
  let home = process.env['HOME'];
  if (home) {
    let snapshots = path.join(home, '.android', 'avd', `${avd}.avd`, 'snapshots');
    let files = fs.readdirSync(snapshots);
    files = files.filter(x => !x.startsWith('default')).sort();
    if (files.length > 0) {
      return files[files.length-1];
    } else {
      return null;
    }
  }
  return null;
}

exports.getAvds = getAvds;
exports.getLatestAvd = getLatestAvd;
exports.getAvdSnapshot = getAvdSnapshot;