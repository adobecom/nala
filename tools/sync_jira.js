const fs = require('fs');
const JiraApi = require('jira-client');
const yargs = require('yargs');
const { getProcessedTestCases } = require('./get_test_cases');
const { processFeatureOutlines } = require('./feature_outline');
const { glob } = require('glob');
const { time } = require('console');
const { LicenseManager } = require('aws-sdk');

/**
 * Seach and get all issues
 * @param {*} jira
 * @param {String} searchString
 * @param {Object} optional
 */
async function searchJira(jira, searchString, options) {
  options = options || {};
  options.startAt = 0;

  let issues = [];
  while (true) {
    let result = await jira.searchJira(searchString, options);
    options.startAt += result.issues.length;
    issues.push(...result.issues);
    if (issues.length >= result.total) {
      break;
    }
  }
  return issues;
}

async function getCukeScript(testCase) {
  let data = fs.readFileSync(testCase.uri, 'utf8');
  let lines = data.split(/\r?\n/);

  let start = testCase.scenario.start - 2;
  let end = testCase.scenario.end;

  if (testCase.example > 0) {
    // Scenario Outline
    start = testCase.firstExample.scenario.start - 2;
    end = testCase.firstExample.scenario.examples.end;
  } else {
    // Scenario's last step may use a data table
    while (end < lines.length && lines[end].trim() !== '') {
      end++;
    }
  }

  script = lines.slice(start, end);

  return script.join('\n');
}

async function updateCukeScriptInDesc(jira, issue, testCase) {
  let newCuke = await getCukeScript(testCase);
  let newCode = `{code:none}\r\n# ---------- Cucumber Script ---------- #\r\n${newCuke}{code}`;

  let newThisWeek = false;
  const ntwLabel = 'New-this-week';

  // find old code block
  let oldCode = null;
  if (issue.fields.description) {
    oldCode = issue.fields.description.match(
      /{code:none}\r\n# ---------- Cucumber Script ---------- #\r\n(.*){code}/s
    );
  }

  let newDesc = null;
  if (oldCode) {
    let newMWPW = newCode.match('MWPW-([0-9]*)')?.[0];
    let oldMWPW = oldCode[0].match('MWPW-([0-9]*)')?.[0];
    if (newMWPW != oldMWPW) newThisWeek = true;

    // replace the old one
    newDesc = issue.fields.description.replace(oldCode[0], newCode);
  } else {
    // no code before, so this is newly automated
    newThisWeek = true;

    if (issue.fields.description) {
      // append to the current description
      newDesc = issue.fields.description + `\n${newCode}`;
    } else {
      // the script is the new description
      newDesc = newCode;
    }
  }

  let labels = issue.fields.labels;
  // No labels
  if (!issue.fields.labels) {
    labels = ['WDIO'];
    newThisWeek = true;
  } else if (!labels.find(x => x === 'WDIO')) {
    labels.push('WDIO');
    newThisWeek = true;
  }
  if (newThisWeek) {
    labels.push(ntwLabel);
  }
  const {
    description: oldDes,
    labels: oldLabels,
    customfield_14108: old14108,
    status: oldStatus
  } = issue.fields;
  if (oldStatus.name !== 'Ready for Execution') {
    let expand = await jira.listTransitions(issue.key);
    let readyForExe = expand.transitions.find(
      x => x.name === 'Ready for Execution'
    );
    if (readyForExe) {
      await jira.transitionIssue(issue.key, { transition: readyForExe });
      console.log(`${issue.key} transitioned to "Ready for Execution"`);
    }
  }
  if (
    oldDes !== newDesc ||
    oldLabels !== labels ||
    !old14108 ||
    old14108.value !== 'Automated'
  ) {
    console.log(`${issue.key} is getting updated...`);
    return await jira.updateIssue(issue.key, {
      fields: {
        description: newDesc,
        labels,
        customfield_14108: { value: 'Automated' }
      }
    });
  }
}

async function updateMochaScriptInDesc(jira, issue, testCase) {
  let newLocation = `File: ${testCase.file}`;
  let newCode = `{code:none}\r\n# ---------- Mocha Test Script ---------- #\r\n${newLocation}{code}`;

  let newThisWeek = false;
  const ntwLabel = 'New-this-week';

  // find old code block
  let oldCode = null;
  if (issue.fields.description) {
    oldCode = issue.fields.description.match(
      /{code:none}\r\n# ---------- Mocha Test Script ---------- #\r\n(.*){code}/s
    );
  }

  let newDesc = null;
  if (oldCode) {
    if (newLocation != oldCode[1]) {
      newThisWeek = true;
    }
    // replace the old one
    newDesc = issue.fields.description.replace(oldCode[0], newCode);
  } else {
    // no code before, so this is newly automated
    newThisWeek = true;

    if (issue.fields.description) {
      // append to the current description
      newDesc = issue.fields.description + `\n${newCode}`;
    } else {
      // the script is the new description
      newDesc = newCode;
    }
  }

  let labels = issue.fields.labels;
  // No labels
  if (!labels) {
    labels = ['WDIO'];
    newThisWeek = true;
  } else if (!labels.find(x => x === 'WDIO')) {
    labels.push('WDIO');
    newThisWeek = true;
  }
  if (newThisWeek) {
    labels.push(ntwLabel);
  }
  const {
    description: oldDes,
    labels: oldLabels,
    customfield_14108: old14108,
    status: oldStatus
  } = issue.fields;
  if (oldStatus.name !== 'Ready for Execution') {
    let expand = await jira.listTransitions(issue.key);
    let readyForExe = expand.transitions.find(
      x => x.name === 'Ready for Execution'
    );
    if (readyForExe) {
      await jira.transitionIssue(issue.key, { transition: readyForExe });
      console.log(`${issue.key} transitioned to "Ready for Execution"`);
    }
  }
  if (
    oldDes !== newDesc ||
    oldLabels !== labels ||
    !old14108 ||
    old14108.value !== 'Automated'
  ) {
    console.log(`${issue.key} is getting updated...`);
    return await jira.updateIssue(issue.key, {
      fields: {
        description: newDesc,
        labels,
        customfield_14108: { value: 'Automated' }
      }
    });
  } else {
    console.log(`${issue.key} remains the same.`);
  }
}

const teams = [
  {
    name: 'Slytherin', // Jira team
    site: 'dc' // Platform-UI site
  },
  {
    name: 'Inception, Warriors, Yugo', // Jira team
    site: 'acom' // Platform-UI site
  },
  {
    name: 'Javelin', // Jira team
    site: 'javelin' // Platform-UI site
  },
  {
    name: 'Gryffindor, Magma', // Jira team
    site: 'ec' // Platform-UI site
  },
  {
    name: 'Brahmos, Bhoomi', // Jira team
    site: 'cc' // Platform-UI site
  },
  {
    name: 'Dexter', // Jira team
    site: 'dexter' // Platform-UI site
  },
  {
    name: 'Eurovision', // Jira team
    site: 'feds_new' // Platform-UI site
  }
];

/**
 * Simple parser to retrieve JIRA IDs from describe() or it()
 * It uses regular expression so could be fragil.
 * @param {string} globPattern Glob pattern to Macho test specs
 * @returns {object[]}
 */
function getMochaTestCases(globPattern) {
  let files = glob.sync(globPattern);
  let testCases = [];
  for (let f of files) {
    let lines = fs.readFileSync(f, 'utf8').split('\n');
    for (let i in lines) {
      let line = lines[i];
      let m = line.match(/(describe|it)\s*\(\s*'\[([A-Z]+-\d+)\](.+)\)/);
      if (m) {
        testCases.push({
          jid: m[2],
          name: m[3],
          group: m[1],
          file: f,
          location: i
        });
      }
    }
  }
  return testCases;
}

/**
 * The main function
 */
async function main() {
  let yargsOpts = yargs
    .options('site', {
      alias: 's',
      required: true,
      description: 'Platform-UI site'
    })
    .options('credentials', {
      alias: 'c',
      description:
        'Jira credentials or use environment variable JIRACREDENTIALS'
    })
    .parserConfiguration({ 'strip-aliased': true });

  let argv = yargsOpts.argv;

  let cred = process.env.JIRACREDENTIALS;
  if (argv.credentials) {
    cred = argv.credentials;
  }

  let team = teams.find(x => x.site === argv.site);

  if (!team) {
    console.log(`Invalid Platform-UI site "${argv.site}"`);
    process.exit(1);
  }
  let testCases = [];

  processFeatureOutlines(team.site);

  let framework = 'cucumber';

  // get test cases from automation code
  if (
    team.site.match(/^(dc|javelin|ec|cc|acom|dexter|feds_new)$/)
  ) {
    testCases = await getProcessedTestCases(`${team.site}/**/*.feature`);
  } else if (team.site == 'feds') {
    testCases = getMochaTestCases(`${team.site}/specs/**/*.js`);
    framework = 'mocha';
  }

  if (framework == 'cucumber') {
    let scenarioCount = testCases.filter(x => x.example === 0).length;
    let scenarioOutlineCount = testCases.filter(x => x.example === 1).length;

    console.log(`Automation Test Cases:`);
    console.log(`# of Test Case: ${testCases.length}`);
    console.log(`# of Scenario: ${scenarioCount}`);
    console.log(`# of Scenario Outline:${scenarioOutlineCount}`);

    // normalize
    testCases.forEach(tc => {
      let jid = tc.pickle.tags.find(x => x.name.match(/^@[A-Z]+-\d+$/));
      if (jid) {
        tc.jid = jid.name.slice(1);
      }
      tc.name = tc.pickle.name;
    });
  } else {
    console.log(`Automation Test Cases:`);
    console.log(`# of Test Case: ${testCases.length}`);
  }

  // get test issues from Jira
  let host = 'jira.corp.adobe.com';
  let creds = cred.split(':');

  let jira = new JiraApi({
    protocol: 'https',
    host: host,
    username: creds[0],
    password: creds[1],
    apiVersion: '2',
    strictSSL: true
  });

  let issues = null;
  let allIssues = null;
  let jql = '';
  let jqlForAllIssues = '';
  if (
    team.site == 'dc' ||
    team.site == 'javelin' ||
    team.site == 'ec' ||
    team.site == 'dexter'
  ) {
    jql = `project=MWPW and type=Test and status not in (Inactive) and team in (${team.name}) and "Test Automation Status" = Automated and (labels not in(Tool) or labels is EMPTY)`;
    jqlForAllIssues = `project=MWPW and type=Test and status not in (Inactive) and team in (${team.name}) and (labels not in(Tool) or labels is EMPTY)`;
  } else if (team.site == 'acom') {
    jql = `project=MWPW and type=Test and status not in (Inactive) and team in (${team.name}) and "Test Automation Status" = Automated and (labels not in(CCT-HAWKS) or labels is EMPTY)`;
    jqlForAllIssues = `project=MWPW and type=Test and status not in (Inactive) and team in (${team.name}) and (labels not in(CCT-HAWKS) or labels is EMPTY)`;
  } else if (team.site == 'cc') {
    jql = `project=MWPW and type=Test and status not in (Inactive) and team in (${team.name}) and "Test Automation Status" = Automated and (labels not in(Yugo-Titan) or labels is EMPTY)`;
    jqlForAllIssues = `project=MWPW and type=Test and status not in (Inactive) and team in (${team.name}) and (labels not in(Yugo-Titan) or labels is EMPTY)`;
  } else if (team.site == 'feds_new') {
    jql = `project=MWPW and type=Test and status not in (Inactive) and team in (${team.name}) and "Test Automation Status" = Automated and (labels not in(Java) or labels is EMPTY)`;
    jqlForAllIssues = `project=MWPW and type=Test and status not in (Inactive) and team in (${team.name}) and (labels not in(Java) or labels is EMPTY)`;
  }

  let fields = [
    'summary',
    'description',
    'labels',
    'status',
    'customfield_14108',
    'customfield_12900'
  ];
  try {
    issues = await searchJira(jira, jql, { fields });
    allIssues = await searchJira(jira, jqlForAllIssues, { fields });
    console.log(`Total number of test issues in Jira: ${issues.length}`);
  } catch (err) {
    console.log('Error when searchJira: ' + err.message);
  }

  // compare the differences
  let issueMap = {};
  let caseMap = {};
  let allIssuesMap = {};
  issues.forEach(x => (issueMap[x.key] = x));
  allIssues.forEach(x => (allIssuesMap[x.key] = x));

  testCases.forEach(tc => {
    if (tc.jid) {
      caseMap[tc.jid] = tc;
    }
  });

  let issueKeys = Object.keys(issueMap);
  let caseTags = Object.keys(caseMap);
  let allIssueKeys = Object.keys(allIssuesMap);

  let notInCases = issueKeys.filter(x => !caseTags.includes(x));
  //let notInIssues = caseTags.filter(x => !issueKeys.includes(x));
  let notInIssues = caseTags.filter(x => !allIssueKeys.includes(x));
  let jqlForMissingCase = '';
  let missingIssue = [];
  if (notInIssues.length > 0) {
    jqlForMissingCase = `id in (${notInIssues})`;
    try {
      missingIssue = await searchJira(jira, jqlForMissingCase, { fields });
    } catch (err) {
      console.log('Err in searchJira for missing case: ' + err);
    }
  }
  let missingIssuesMap = {};
  missingIssue.forEach(x => (missingIssuesMap[x.key] = x));

  console.log(
    `In Jira, but not in automation code (count: ${notInCases.length})`
  );
  console.log(
    `In automation code, but not in Jira (count: ${notInIssues.length})`
  );

  let results = {
    notInCases: notInCases.map(x => ({
      key: x,
      summary: issueMap[x].fields.summary
    })),
    notInIssues: notInIssues.map(x => ({
      key: x,
      name: caseMap[x].name,
      status:
        typeof missingIssuesMap[x] !== 'undefined'
          ? missingIssuesMap[x].fields.status.name
          : 'Invalid Jira Id',
      team:
        typeof missingIssuesMap[x] !== 'undefined'
          ? missingIssuesMap[x].fields.customfield_12900?.value
          : 'Invalid Jira Id'
    }))
  };
  fs.writeFileSync(
    `jiraSync_${team.site}.json`,
    JSON.stringify(results, null, 2)
  );

  // // Sync test cases that keys match
  // //let syncCasesKeys = issueKeys.filter(x => caseTags.includes(x));
  // let syncCasesKeys = allIssueKeys.filter(x => caseTags.includes(x));
  // for (let key of syncCasesKeys) {
  //   console.log(`Processing ${key} ...`);
  //   //await updateCukeScriptInDesc(jira, issueMap[key], caseMap[key]);
  //   await updateCukeScriptInDesc(jira, allIssuesMap[key], caseMap[key]);
  // }
  let syncCasesKeys = allIssueKeys.filter(x => caseTags.includes(x));
  let success = true;
  let syncResults;
  if (framework == 'cucumber') {
    syncResults = await Promise.allSettled(
      syncCasesKeys.map(key =>
        updateCukeScriptInDesc(jira, allIssuesMap[key], caseMap[key])
      )
    );
  } else {
    syncResults = await Promise.allSettled(
      syncCasesKeys.map(key =>
        updateMochaScriptInDesc(jira, allIssuesMap[key], caseMap[key])
      )
    );
  }

  console.log('All Synched ');

  for (let r of syncResults) {
    let fulfilled = r.status === 'fulfilled';
    if (!fulfilled) console.error(r.reason);
    success = success && fulfilled;
  }
  if (success) {
    console.log('successfully');
    return;
  }
  throw 'but Failed for some tickets! Check logs.';
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
