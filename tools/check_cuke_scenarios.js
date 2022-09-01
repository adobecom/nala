const yargs = require('yargs');
const { getProcessedTestCases } = require('./get_test_cases');
const fs = require('fs');
const { processFeatureOutlines } = require('./feature_outline');

async function main() {
  let yargsOpts = yargs
    .options('site', {
      alias: 's',
      required: true,
      description: 'Site folder'
    })
    .options('output', {
      alias: 'o',
      description: 'Output text file'
    })
    .parserConfiguration({ 'strip-aliased': true });

  let argv = yargsOpts.argv;
  let output = '';

  let site = argv.site;
  
  processFeatureOutlines(site);

  let testCases = await getProcessedTestCases(`${site}/**/*.feature`);

  let scenarioCount = testCases.filter(x => x.example === 0).length;
  let scenarioOutlineCount = testCases.filter(x => x.example === 1).length;

  output += `Automation Test Cases:\n`;
  output += `# of Test Cases: ${testCases.length}\n`;
  output += `# of Scenarios: ${scenarioCount}\n`;
  output += `# of Scenario Outlines:${scenarioOutlineCount}\n`;

  // find same jira IDs and automation IDs
  let jids = {};
  let noJids = [];
  for (let i = 0; i < testCases.length; i++) {
    let testCase = testCases[i];

    let tags = testCase.pickle.tags;
    let jid = tags.find(x => x.name.match(/^@[A-Z]+-\d+$/));

    if (!jid) {
      if ([0, 1].includes(testCase.pickle.example)) {
        noJids.push(testCase);
      }
      continue;
    }

    jid = jid.name.slice(1);

    if ([0, 1].includes(testCase.pickle.example)) {
      jids[jid] = jids[jid] || [];
      jids[jid].push(testCase);
    }
  }
  let dupidExist = 0;
  output += '\n';
  output += 'Non-unique Jira ID:';
  output += '\n';
  for (let jid in jids) {
    if (jids[jid].length > 1) {
      output += `${jid} has ${jids[jid].length} scenarios or scenario outlines.\n`;
      dupidExist = 1;
    }
  }
  if (dupidExist == 0) {
    output += 'None';
  }
  output += '\n';
  output += '\n';
  output += 'Missing Jira ID:';
  output += '\n';
  if (noJids.length == 0) {   
    output += 'None';
  } else {
    output += `Scenario or scenario outlines without Jira ID:.${noJids.length}\n`;
  }
  for (let testCase of noJids) {
    output += `File: ${testCase.uri}\n`;
    output += `Line: ${
      testCase.location.line
    }\n`;
  }
  console.log(output);
  if (argv.output) {
    fs.writeFileSync(argv.output, output);
  }
}

main()
