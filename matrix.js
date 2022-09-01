/*
 * Run a configuration matrix
 */
const yargs = require('yargs');
const { spawnSync } = require('child_process');
const { spawn } = require('child_process');
const fs = require('fs');

const keyMap = {
  browsers: 'browser',
  locales: 'locale',
  suites: 'tags',
  profiles: 'profile',
  layouts: 'layout'
};

const f = (a, b) => [].concat(...a.map(d => b.map(e => [].concat(d, e))));
const cartesian = (a, b, ...c) => (b ? cartesian(f(a, b), ...c) : a);

async function main() {
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
    .parserConfiguration({ 'strip-aliased': true });

  let argv = yargsOpts.argv;

  let matrix = [];

  let keys = Object.keys(argv).filter(k => {
    return k.match(new RegExp(Object.keys(keyMap).join('|')));
  });

  for (let key of keys) {
    matrix.push(argv[key].split(','));
    delete argv[key];
  }

  const combs = cartesian(...matrix);

  // populate configurations
  let configs = [];

  let cmdArgsPrefix = ['node'];
  let commonModule = 'node_modules/@mwp/common-automation';
  if (fs.existsSync(commonModule)) {
    cmdArgsPrefix.push(`${commonModule}/run`);
  } else {
    cmdArgsPrefix.push('run');
  }
  cmdArgsPrefix.push(...argv._.slice());
  delete argv._;
  delete argv['$0'];
  for (let key of Object.keys(argv)) {
    cmdArgsPrefix.push(`--${key}=${argv[key]}`);
  }

  for (let comb of combs) {
    let cmdArgs = cmdArgsPrefix.slice();
    for (let i in keys) {
      console.log(comb);
      cmdArgs.push(
        `--${keyMap[keys[i]]}=${comb instanceof Array ? comb[i] : comb}`
      );
    }
    configs.push(cmdArgs.join(' '));
  }

  // execute the configuration in sync or async.
  console.log(`Number of Configurations: ${configs.length}`);
  for (let config of configs) {
    console.log(config);
  }
  console.log('Start running...');
  for (let i in configs) {
    config = configs[i];
    console.log(`#${i}: ${config}`);
    let cmdArgs = config.match(/^(\S+)\s(.*)/).slice(1);
    spawn(cmdArgs[0], [cmdArgs[1]], {
      shell: true,
      stdio: ['inherit', 'inherit', 'inherit']
    });
  }
}

main().catch(error => {
  console.log(error);
});
