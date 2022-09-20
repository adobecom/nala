const yargs = require('yargs');
const glob = require('glob');
const path = require('path');
const fs = require('fs');
const JiraApi = require('jira-client');
const { TestRail } = require('./testrail');
const { getProcessedTestCases } = require('./get_test_cases');
const { processFeatureOutlines } = require('./feature_outline');

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

async function getJiraTestCases(jids, cred) {
  if (!cred) {
    return {};
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

  let jql = `key in (${jids.join(',')})`;
  let fields = [
    'assignee'
  ];
  let issues = {};
  try {
    let items = await searchJira(jira, jql, { fields });
    items.forEach(x => issues[x.key] = x);
  } catch (err) {
    console.log('Error when searchJira: ' + err.message);
  }
  return issues;
}

async function getTestRailProject(project, credentials) {
  let testrailHost = 'https://testrail.corp.adobe.com';
  let user = credentials.split(':');
  testrail = new TestRail(testrailHost, user[0], user[1]);
  return await testrail.getProject(project);
}

async function updateCase(trCase, testCase, jiraIssues) {
  let modified = false;

  // Check assignee
  let custom_notes = trCase.custom_notes;
  if (jiraIssues && jiraIssues[trCase.refs] && jiraIssues[trCase.refs].fields.assignee) {
    let assignee = null;
    let newAssignee = jiraIssues[trCase.refs].fields.assignee.displayName;
    custom_notes = custom_notes || '';
    let m = custom_notes.match(/Assignee: (.*)$/);
    if (m) {
      assignee = m[1];
    }
    modified = modified || assignee != newAssignee;
    custom_notes = `Assignee: ${newAssignee}`;
  }

  // Check automation ID
  let autoId = testCase.pickle.tags.find(x => x.name.startsWith('@desc-'));
  if (autoId) {
    autoId = autoId.name.slice(1);
  }
  if (autoId && testCase.example > 0) {
    autoId += `#${testCase.example}`;
  }
  modified = modified || autoId != trCase.custom_automation_id;

  // Check steps
  let custom_steps_separated = [];
  for (let step of testCase.pickle.steps) {
    // To do: Handle table
    // testCase.pickle.steps[4].arguments[0].rows[0].cells[0].value
    custom_steps_separated.push({ content: step.text });
  }
  let newSteps = custom_steps_separated.map(x => x.content).join('|');
  let oldSteps = '';
  if (trCase.custom_steps_separated) {
    oldSteps = trCase.custom_steps_separated.map(x => x.content).join('|');
  }
  modified = modified || newSteps != oldSteps;
  if (modified) {
    return await trCase.updateCase({
      custom_automation_id: autoId,
      title: testCase.pickle.name,
      custom_steps_separated,
      custom_notes
    });
  } else {
    return trCase;
  }
}

async function main() {
  let argv = yargs
    .options('project', {
      alias: 'p',
      required: true,
      description: 'TestRail project name'
    })
    .options('site', {
      alias: 's',
      required: true,
      description: 'Platform-UI site: acom, dc, helpx, or ...'
    })
    .options('features', {
      alias: 'f',
      description: 'feature path under the site. e.g. "**/*.feature"',
      default: '**/*.feature'
    })
    .options('credentials', {
      alias: 'c',
      description:
        'TestRail credentials or use environment variable TESTRAILCREDENTIALS'
    })
    .options('jiracreds', {
      alias: 'jc',
      description:
        'Jira credentials or use environment variable JIRACREDENTIALS'
    })    
    .options('dryRun', {
      alias: 'd',
      boolean: true,
      description: 'Dry run. No writing to TestRail'
    })
    .parserConfiguration({ 'strip-aliased': true }).argv;

  let cred = argv.credentials || process.env.TESTRAILCREDENTIALS;

  let credJira = argv.jiracreds || process.env.JIRACREDENTIALS;

  if (!cred) {
    console.log('Please provide TestRail credentials');
    process.exit(1);
  }

  let project = await getTestRailProject(argv.project, cred);
  let suites = await project.getSuites();

  //suitesMap = {}
  //for (let suite of suites) {
  //  if (suite.name in suitesMap) {
  //    await suite.deleteSuite();
  //  } else {
  //    suitesMap[suite.name] = suite;
  //  }
  //}

  let cases = [];
  for (let suite of suites) {
    // get all sections and subsection
    let sections = await project.getSections(suite);

    suite.sections = [];
    let secMap = {};
    sections.forEach(x => {
      secMap[x.id] = x;
    });

    for (let section of sections) {
      // get all test cases
      cases.push(...(await project.getCases(suite, section)));
      // set up tree
      if (section.parent_id) {
        if (secMap[section.parent_id].sections) {
          secMap[section.parent_id].sections.push(section);
        } else {
          secMap[section.parent_id].sections = [section];
        }
      } else {
        suite.sections.push(section);
      }
    }
  }

  // put cases in a map
  let jids = {};
  let noJids = [];
  cases.forEach(x => {
    if (x.refs) {
      jids[x.refs] = jids[x.refs] || [];
      jids[x.refs].push(x);
    } else {
      noJids.push(x);
    }
  });
  console.log(`TestRail Test Cases:`);
  console.log(`Total Test Cases: ${cases.length}`);
  console.log(`Test Cases with Jira ID: ${Object.keys(jids).length}`);
  console.log(`Test Cases without Jira ID: ${noJids.length}`);

  let jiraIssues = await getJiraTestCases(Object.keys(jids), credJira);

  processFeatureOutlines(argv.site);
  // get test cases from automation code
  let testCases = await getProcessedTestCases(`${argv.site}/${argv.features}`);

  let scenarioCount = testCases.filter(x => x.example === 0).length;
  let scenarioOutlineCount = testCases.filter(x => x.example === 1).length;

  console.log(`Automation Test Cases:`);
  console.log(`# of Test Case: ${testCases.length}`);
  console.log(`# of Scenario: ${scenarioCount}`);
  console.log(`# of Scenario Outline: ${scenarioOutlineCount}`);

  for (let testCase of testCases) {
    // No JIRA ID, no test case
    let tags = testCase.pickle.tags;
    let jid = tags.find(x => x.name.match(/^@[A-Z]+-\d+$/));
    if (!jid) {
      continue;
    }
    let jidname = jid.name.slice(1);

    // Test case exists. Update test case.
    if (jidname in jids) {
      let example = testCase.example;
      if (example === 0) {
        if (jids[jidname].length > 1) {
          console.log(
            `${jidname} is a scenario. There are multiple test cases in TestRail`
          );
          console.log('Please delete the following test cases:');
          for (let i = 1; i < jids[jidname].length; i++) {
            console.log(`${jids[jidname][i].id}`);
          }
        }
        console.log(
          `Test case ${jids[jidname][0].id} exists for ${jidname}. Sync...`
        );
        if (!argv.dryRun) {
          Object.assign(
            jids[jidname][0],
            await updateCase(jids[jidname][0], testCase, jiraIssues)
          );
        }
        continue;
      } else {
        let trCase = jids[jidname].find(
          x =>
            x.custom_automation_id &&
            x.custom_automation_id.endsWith(`#${example}`)
        );
        if (!trCase) {
          trCase = jids[jidname].find(
            x =>
              !x.custom_automation_id || !x.custom_automation_id.includes('#')
          );
        }
        if (trCase) {
          console.log(
            `Test case ${trCase.id} exists for ${jidname} example #${example}. Sync...`
          );
          if (!argv.dryRun) {
            Object.assign(trCase, await updateCase(trCase, testCase, jiraIssues));
          }
          continue;
        }
      }
    }

    console.log(`Create a new test case for ${jidname} in ${testCase.uri}`);

    if (testCase.uri.includes('/outline/')) {
      testCase.uri = testCase.uri.replace('outline/', '');
    }

    let uri = testCase.uri;
    let sections = uri.split(path.sep);
    let site = sections.shift();
    if (site != 'ec') {
      sections.shift(); // feature directory
    }
    sections.pop();

    // Suite
    let currentSuite = null;
    let suiteName = sections.shift().replace('_', ' ').toLowerCase();
    console.log(`Suite: ${suiteName}`);
    let found = suites.find(x => x.name.toLowerCase() === suiteName);
    if (found) {
      currentSuite = found;
    } else {
      if (!argv.dryRun) {
        currentSuite = await project.addSuite({ name: suiteName });
        currentSuite.sections = [];
        suites.push(currentSuite);
      } else {
        console.log(`Add test suite: ${suiteName}`);
        currentSuite = { sections: [] };
      }
    }

    let parent = null;
    let currSections = currentSuite.sections;

    for (let section of sections) {
      section = section.replace('_', ' ').toLowerCase();
      console.log(`Section: ${section}`);
      let found = currSections.find(x => x.name.toLowerCase() === section);

      if (found) {
        parent = found;
      } else {
        if (!argv.dryRun) {
          let newSection = await project.addSection({
            suite: currentSuite,
            name: section,
            parent: parent
          });
          if (parent) {
            parent.sections.push(newSection);
          } else {
            currentSuite.sections.push(newSection);
          }
          parent = newSection;
          parent.sections = [];
        } else {
          console.log(`Add test section: ${section}`);
        }
      }
      currSections = parent.sections;
    }

    let steps = testCase.pickle.steps;
    let custom_steps_separated = [];
    for (let step of steps) {
      // To do: Handle table
      // testCase.pickle.steps[4].arguments[0].rows[0].cells[0].value
      custom_steps_separated.push({ content: step.text });
    }
    if (!parent) {
      // the default section
      parent = currSections.find(x => x.name.toLowerCase() === 'test cases');
      if (!parent) {
        if (!argv.dryRun) {
          parent = await project.addSection({
            suite: currentSuite,
            name: 'Test Cases'
          });
          parent.sections = [];
          currSections.push(parent);
        } else {
          console.log(`Add section: Test Cases`);
        }
      }
    }

    let autoId = testCase.pickle.tags.find(x => x.name.startsWith('@desc-'));
    autoId = autoId ? autoId.name.slice(1) : '';
    if (testCase.example > 0) {
      autoId += `#${testCase.example}`;
    }

    if (!argv.dryRun) {
      let newCase = await parent.addCase({
        title: testCase.pickle.name,
        refs: jid.name.slice(1),
        caseType: 'Functional',
        priority: 'Normal',
        custom_automated: 1, // Yes
        custom_automation_id: autoId,
        custom_test_status: 4, // Ready for Execution
        custom_steps_separated
      });
      console.log(`TestRail case ID: ${newCase.id}`);
    } else {
      console.log(`title: ${testCase.pickle.name}`);
      console.log(`ref: ${jid.name.slice(1)}`);
      console.log(`custom_automation_id: ${autoId}`);
      let stepContents = custom_steps_separated.map(x => '  ' + x.content).join('\n');
      console.log(`custom_steps_separated:\n${stepContents}`);
    }
  }

  // for (let c of cases) {
  //   if (c.id == 999207597) {
  //     c.updateCase({
  //       custom_steps_separated: [
  //         {
  //           content: 'I visit Adobe home page'
  //         },
  //         {
  //           content: 'I scroll down the page'
  //         }
  //       ]
  //     });
  //   }
  // }
  /*       await section.addCase({
        title: 'Test Case',
        caseType: 'Functional',
        priority: 'Normal',
        custom_automated: 1,   // Yes
        custom_test_status: 4, // Ready for Execution
        custom_steps_separated: [
          {
            content: 'Step 1'
          },
          {
            content: 'Step 2'
          }
        ]
      });  */
  //console.log(cases);
}

main().catch(error => {
  console.log(error);
});
