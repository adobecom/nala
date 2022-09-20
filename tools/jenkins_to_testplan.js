/**
 * Read a Jenkins tab view and convert it to a TestRail test plan
 *
 * Example Usage:
 * node tools/jenkins_to_testplan.js -j "https://cc.ci.corp.adobe.com" -t "Author - dev01"
 *    -p "MWP Web - Dexter Platform" -m "Author Tests" -e "dev01-author" -o author_tests.yml
 */
const yargs = require('yargs');
const axios = require('axios');
const yaml = require('js-yaml');
const fs = require('fs');

async function main() {
  let argv = yargs
    .options('jenkins', {
      alias: 'j',
      required: true,
      description: 'Jenkins server'
    })
    .options('tab', {
      alias: 't',
      required: true,
      description: 'Jenkins project tab'
    })
    .options('project', {
      alias: 'p',
      required: true,
      description: 'TestRail project'
    })
    .options('milestone', {
      alias: 'm',
      required: true,
      description: 'TestRail milestone'
    })
    .options('envs', {
      alias: 'e',
      required: true,
      description: 'Environments. Comma-separated values'
    })
    .options('output', {
      alias: 'o',
      required: true,
      description: 'Output YAML file'
    })
    .parserConfiguration({ 'strip-aliased': true }).argv;

  let jenkins = argv.jenkins;
  let tabName = argv.tab;
  let project = argv.project;
  let milestone = argv.milestone;
  let envs = argv.envs.split(',');
  let output = argv.output;

  let tabUrl = `${jenkins}/view/${tabName}/api/json`;
  let res = await axios.get(tabUrl);
  let jobs = res.data.jobs;

  let testplan = {
    project,
    milestone,
    envs,
    plan: tabName + ' ${env} ${today}',
    entries: []
  };

  for (let job of jobs) {
    if (job.name.match(/^[a-zA-Z][a-zA-Z]\d\d - /)) {
      let jobUrl = job.url;
      let res = await axios.get(`${jobUrl}api/json`);
      let configs = res.data.activeConfigurations;
      let browsers = new Set();
      let tags = new Set();
      let locales = new Set();
      let akamaiLocales = new Set();
      for (let config of configs) {
        let params = config.name.split(',');
        params = params.map(x => x.split('='));
        for (let param of params) {
          if (param[0] === 'Browser') {
            browsers.add(param[1]);
          } else if (param[0] === 'Tag') {
            tags.add(param[1].slice(1));
          } else if (param[0] === 'Locale') {
            locales.add(param[1]);
          } else if (param[0] === 'akamaiLocale') {
            akamaiLocales.add(param[1]);
          }
        }
      }
      let entry = {
        automationIds: [],
        configs: {}
      };
      entry.automationIds = Array.from(tags);
      if (browsers.size != 0) {
        entry.configs.browsers = Array.from(browsers);
      }
      if (locales.size != 0) {
        entry.configs.locales = Array.from(locales);
      }
      if (akamaiLocales.size != 0) {
        entry.configs.akamaiLocale = Array.from(akamaiLocales);
      }
      testplan.entries.push(entry);
    }
  }
  fs.writeFileSync(output, yaml.dump(testplan));
}

main();
