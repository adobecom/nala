/*
 * Clean the working directory and processes
 * command arguments:
 *   --all       Delete all including node_modules/ and yarn.lock
 *   --processes Kill processes used by automation that may be running in background
 */
const os = require('os');
const fs = require('fs');
const path = require('path');
const yargs = require('yargs');
const glob = require('glob');
const { spawnSync } = require('child_process');
const {
  getWebdriverVersion,
  getChromeVersion,
  getFirefoxVersion
} = require('./get_browser_info');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function wmic(query) {
  let results = [];
  let cmdResult = spawnSync('wmic', [query], { shell: true });
  let output = cmdResult.stdout.toString('utf8');
  let error = cmdResult.stderr.toString('utf8');
  let lines = output.split(/\r?\n/);
  let fields = null;
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].replace(/\r|\n/, '');
    if (i === 0) {
      if (line.trim() === '') break;
      fields = line
        .match(/(\S+)\s+/g)
        .map(x => ({ width: x.length, name: x.trim() }));
    } else {
      if (line.trim() === '') break;
      let result = {};
      let start = 0;
      for (let j = 0; j < fields.length; j++) {
        result[fields[j].name] = line
          .substring(start, start + fields[j].width)
          .trim();
        start += fields[j].width;
      }
      results.push(result);
    }
  }
  return results;
}

function killProcess(name) {
  if (process.platform === 'win32') {
    cmd = ['Taskkill', [`/IM "${name}" /F > NUL 2>&1`]];
  } else if (process.platform === 'darwin') {
    cmd = ['pkill', [`"${name}" > /dev/null 2>&1`]];
  } else if (process.platform === 'linux') {
    cmd = ['pkill', [`"${name}" > /dev/null 2>&1`]];
  } else {
    console.log(`Unsupported for ${process.platform}`);
    return null;
  }
  let res = spawnSync(cmd[0], cmd[1], {
    shell: true
  });
}

function killSelenium() {
  let ps = [];
  if (process.platform === 'win32') {
    ps = wmic('process where caption="java.exe" get commandline,processid');
    for (let p of ps) {
      if (p.CommandLine.includes('selenium-standalone')) {
        let res = spawnSync(
          'Taskkill',
          [`/PID "${p.ProcessId}" /F > NUL 2>&1`],
          {
            shell: true
          }
        );
      }
    }
  }
  return ps.length;
}

function killProcesses() {
  // soft kill
  if (process.platform === 'darwin') {
    console.log('Exit iOS Simulator');
    spawnSync('xcrun', ['simctl shutdown all'], {
      shell: true
    }).stdout.toString();
  }

  // hard kill
  let unwanted = {
    win32: [
      'chromedriver.exe',
      'geckodriver.exe',
      'iexplore.exe',
      'IEDriverServer.exe',
      'MicrosoftWebDriver.exe',
      'ffmpeg.exe',
      'msedge.exe',
      'chrome.exe',
      'firefox.exe',
      'MicrosoftEdge.exe'
    ],
    darwin: [
      'ffmpeg',
      'Simulator',
      'Chrome',
      'firefox',
      'Safari',
      'qemu-system-x86_64'
    ],
    linux: []
  }[process.platform];
  for (let p of unwanted) {
    console.log(`Kill ${p}`);
    killProcess(p);
  }

  // smart kill
  console.log(`Kill selenium`);
  killSelenium();
}

function cleanTmpDir() {
  console.log('Cleaning tmp dir...');

  let yarnDirs = Array.from(glob.sync(path.join(os.tmpdir(), 'yarn--*')));
  for (let i = 0; i < yarnDirs.length - 1; i++) {
    dir = path.resolve(yarnDirs[i]);
    fs.rmdirSync(dir, { recursive: true });
  }
}

async function main() {
  let argv = yargs
    .option('all', {
      type: 'boolean',
      description: 'Clean all including node_modules and yarn.lock'
    })
    .option('selenium', {
      type: 'boolean',
      description: 'Kill Selenium'
    })
    .option('processes', {
      type: 'boolean',
      description: 'Kill processes using automation that may stay in background'
    }).argv;

  if (argv.selenium) {
    killSelenium();
    process.exit(0);
  }

  let dirs = ['debug', 'screenshots', 'reports'];
  for (let dir of dirs) {
    console.log(`Deleting ${dir}/ ...`);
    fs.rmdirSync(dir, { recursive: true });
  }
  let files = glob.sync('*.{json,txt}');
  for (let f of files) {
    if (['package.json', 'jsdoc.config.json'].includes(f)) {
      continue;
    }
    console.log(`Deleting ${f} ...`);
    fs.unlinkSync(f);
  }

  cleanTmpDir();

  if (argv.all) {
    console.log(`Deleting node_modules/ ...`);
    fs.rmdirSync('node_modules', { recursive: true });
    console.log('Deleting yarn.lock');
    fs.unlinkSync('yarn.lock');
  }
  if (argv.processes) {
    killProcesses();
    // Add delay for processes to be killed
    await sleep(5000);
  }
}

main();
