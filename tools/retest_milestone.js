const yargs = require('yargs');
const { TestRail } = require('./testrail');

async function getTestRailProject(project, credentials) {
  if (!credentials) {
    throw `No TestRail credentials`;
  }
  let testrailHost = 'https://testrail.corp.adobe.com';
  let user = credentials.split(':');
  testrail = new TestRail(testrailHost, user[0], user[1]);
  return await testrail.getProject(project);
}

async function main() {
  let yargsOpts = yargs
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
    .parserConfiguration({ 'strip-aliased': true });

    let argv = yargsOpts.argv;

    let cred = process.env.TESTRAILCREDENTIALS;
  
    if (argv.credentials) {
      cred = argv.credentials;
    }
    
    let project = await getTestRailProject(argv.project, cred);
    let milestone = await project.getMilestone(argv.milestone);
    let results = await project.retestTests({milestone})
}

main().catch(error => {
  console.log(error);
});