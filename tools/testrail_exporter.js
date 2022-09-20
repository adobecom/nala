const yargs = require('yargs');
const glob = require('glob');
const path = require('path');
const fs = require('fs');
const { TestRail } = require('./testrail');

async function getTestRailProject(project, credentials) {
  let testrailHost = 'https://testrail.corp.adobe.com';
  let user = credentials.split(':');
  testrail = new TestRail(testrailHost, user[0], user[1]);
  return await testrail.getProject(project);
}

async function main() {
  let yargsOpts = yargs
    .options('dir', {
      alias: 'd',
      default: 'reports',
      description: 'Directory containing Cucumber reports'
    })
    .options('project', {
      alias: 'p',
      required: true,
      description: 'TestRail project name'
    })
    .options('milestone', {
      alias: 'm',
      required: true,
      description: 'TestRail project milestone'
    })
    .options('credentials', {
      alias: 'c',
      description:
        'TestRail credentials or use environment variable TESTRAILCREDENTIALS'
    })
    .options('dryRun', {
      boolean: true,
      description: 'Dry run writing the result to TestRail'
    })
    .parserConfiguration({ 'strip-aliased': true });

  let argv = yargsOpts.argv;

  let cred = process.env.TESTRAILCREDENTIALS;

  if (argv.credentials) {
    cred = argv.credentials;
  }

  if (!cred) {
    throw `Please provide credential to access TestRail`;
  }

  let project = await getTestRailProject(argv.project, cred);
  let milestone = await project.getMilestone(argv.milestone);

  let until = new Date();
  let since = new Date();
  since.setDate(since.getDate()-1);
  let results = await project.getResults({milestone, since, until});
  console.log(JSON.stringify(results, null, 2));
}


main().catch(error => {
  console.log(error);
});