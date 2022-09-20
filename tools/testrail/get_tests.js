const { TestRail } = require('../testrail');

async function getTestRailProject(project, credentials) {
  let testrailHost = 'https://testrail.corp.adobe.com';
  let user = credentials.split(':');
  testrail = new TestRail(testrailHost, user[0], user[1]);
  return await testrail.getProject(project);
}

async function getTestRailTests(project, milestone, creds) {
  // Don't fail the process if project or milestone is not found in TestRail.
  let trProject = await getTestRailProject(project, creds);

  if (!trProject) {
    console.log(`TestRail project "${project}" is not found.`);
    return [];
  }

  let trMilestone = await trProject.getMilestone(milestone);
  if (!trMilestone) {
    console.log(
      `TestRail milestone ${milestone} is not found in project "${project}"`
    );
    return [];
  }

  let testCases = [];
  let plans = await trProject.getPlans({ milestone: trMilestone, is_completed: 0 });

  for (let plan of plans) {
    let suites = await plan.getSuites();

    for (let suite of suites) {
      let runs = await suite.getRuns();

      for (let run of runs) {
        // run.config or run.config_ids
        let runConfigIds = JSON.stringify(run.config_ids.sort());
        let runConfigValues = trProject.getConfigValues(run.config_ids);
        let tests = await run.getTests();
        tests.forEach(test => {
          test.runConfigIds = runConfigIds;
          test.runConfigs = runConfigValues;
        });
        testCases.push(...tests);
      }
    }
  }
  return testCases;
}

exports.getTestRailTests = getTestRailTests;