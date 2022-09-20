/**
 * Read cucumber reports from a test result and record it to TestRail.
 * It needs TestRail credentials in env TESTRAILCREDENTIALS and
 * MongoDB credentials in DBCREDENTIALS
 */
const yargs = require('yargs');
const glob = require('glob');
const path = require('path');
const fs = require('fs');
const { TestRail } = require('./testrail');
const { Test } = require('./testrail');
const { readCucumberReports } = require('./read_cucumber_reports');
const { MongoClient } = require('mongodb');
const { default: axios } = require('axios');

async function getTestRailProject(project, credentials) {
  let testrailHost = 'https://testrail.corp.adobe.com';
  let user = credentials.split(':');
  testrail = new TestRail(testrailHost, user[0], user[1]);
  try {
    return await testrail.getProject(project);
  } catch (err) {
    return null;
  }
}

async function normalizeResult(result) {
  // format browser name for TestRail browser configuration
  let browser = result.browser.split('-')[0];
  if (browser.match(/^chrome|^firefox|^ie|^edge/)) {
    let platform = { darwin: 'mac', win32: 'win10', windows: 'win10', linux: 'linux' }[
      result.platform
    ];
    if (platform) {
      browser += `-${platform}`;
    }
    result.browser = browser;
  }
  // Show which step failed
  if (result.status === 'failed') {
    let failedIndex = result.steps.findIndex(x => x.status != 'passed');
    if (failedIndex >= 0) {
      result.comment =
        `(${failedIndex}) ${result.steps[failedIndex].name}\n\n` +
        result.comment;
    }
  }

  if (result.screenshots) {
    result.comment = result.comment || '';
    result.comment += '\n\n';
    for (let screenshot of screenshots) {
      let name = decodeURI(path.basename(screenshot));
      result.comment += `* ${name}\n\n`;
      result.comment += `![${name}](${screenshot})\n\n\n\n`;
    }
  }
  return result;
}

async function getTest(project, milestone, configs, dbOptions, skipTestRail) {
  let test = null;

  // Check DB first
  if (dbOptions.client) {
    console.log(`Finding the test in MongoDB...`);

    let client = dbOptions.client;
    let db = client.db(dbOptions.dbName);
    let collection = db.collection(dbOptions.dbCollTests);

    // Compose the query
    let query = {
      project: project.name,
      milestone: milestone.getPath()
    };

    for (let key in configs) {
      if (key === 'jid') {
        query.refs = configs[key];
      } else if (key === 'example') {
        if (configs[key] > 0) {
          query.custom_automation_id = { $regex: `#${configs[key]}` };
        }
      } else {
        query[`runConfigs.${key}`] = configs[key];
      }
    }
    let tests = await collection.find(query).toArray();
    if (tests.length === 1) {
      test = new Test({ id: tests[0].id }, project.testrail);
      return test;
    } else if (tests.length > 1) {
      console.log(
        `There are ${tests.length} tests found in MongoDB with the query ${query}`
      );
    }
  }
  // If can't find test in MongoDB, fallback to TestRail
  if (!skipTestRail) {
    console.log(`Finding the test in TestRail...`);

    test = await project.getTest({
      milestone,
      jid: configs.jid,
      browser: configs.browser,
      locale: configs.locale,
      env: configs.env,
      akamaiLocale: configs.akamaiLocale,
      example: configs.example
    });
  }
  return test;
}

async function writeResult(test, result) {
  if (test) {
    result.trTestId = test.id;
    let res = await test.addResult({
      status: result.status,
      comment: result.comment,
      elapsed: result.elapsed
    });
    console.log(JSON.stringify(res, null, 2));
    return [test.id, res.id];
  } else {
    console.log(
      `Warning: No test is found in milestone "${milestone.getPath()}" of project "${
        project.name
      }"`
    );
    console.log(JSON.stringify(result, null, 2));
    return [null, null];
  }
}

async function writeResultToTR(project, milestone, result) {
  let test = await project.getTest({
    milestone,
    jid: result.jid,
    browser: result.browser,
    locale: result.locale,
    env: result.env,
    akamaiLocale: result.akamaiLocale,
    example: result.example
  });
  if (test) {
    result.trTestId = test.id;
    let res = await test.addResult({
      status: result.status,
      comment: result.comment,
      elapsed: result.elapsed
    });
    console.log(JSON.stringify(res, null, 2));
    return [test.id, res.id];
  } else {
    console.log(
      `Warning: No test is found in milestone "${milestone.getPath()}" of project "${
        project.name
      }"`
    );
    console.log(JSON.stringify(result, null, 2));
    return [null, null];
  }
}

async function connectDB(dbOptions) {
  let dbName = dbOptions.dbName;
  let dbCollection = dbOptions.dbCollection;
  let username = dbOptions.username;
  let password = dbOptions.password;

  let url = `mongodb://${username}:${password}@grape-a.corp.adobe.com:27021,grape-b.corp.adobe.com:27021,grape-c.corp.adobe.com:27021/?authSource=${dbName}&replicaSet=or_grape_prd_27021&readPreference=primary&ssl=false`;
  let client = new MongoClient(url);
  await client.connect();
  return client;
}

async function writeResultToDB(result, dbOptions) {
  const client = dbOptions.client;

  const db = client.db(dbOptions.dbName);
  const collection = db.collection(dbOptions.dbCollResults);
  const insertResult = await collection.insertOne(result);
  return insertResult;
}

async function readBrowserConsoleErrors(bcePath) {
  if (fs.existsSync(bcePath)) {
    try {
      let bce = JSON.parse(fs.readFileSync(bcePath));
      return bce;
    } catch (err) {
      console.log(err.message);
      return null;
    }
  } else {
    return null;
  }
}

async function readBuildInfo(buildInfoPath) {
  if (fs.existsSync(buildInfoPath)) {
    try {
      let buildInfo = JSON.parse(fs.readFileSync(buildInfoPath));
      return buildInfo;
    } catch (err) {
      console.log(err.message);
      return null;
    }
  } else {
    return null;
  }
}

async function main() {
  let argv = yargs
    .options('dir', {
      alias: 'd',
      default: 'reports',
      description: 'Directory containing Cucumber reports'
    })
    .options('screenshots', {
      alias: 's',
      default: 'screenshots',
      description: 'Directory containing screenshots'
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
    .options('s3Credentials', {
      alias: 's3c',
      description:
        'S3 credentials s3secretkey:s3accesskey or use environment variable s3secretkey, s3accesskey'
    })
    .options('dryRun', {
      boolean: true,
      description: 'Dry run writing the result to TestRail'
    })
    .parserConfiguration({ 'strip-aliased': true }).argv;

  argv.milestone = argv.milestone.replace(/\\/g, '/');

  let cred = argv.credentials || process.env.TESTRAILCREDENTIALS;

  let dbOptions = {
    dbName: 'WEBAUTODB',
    dbCollResults: 'testResults',
    dbCollTests: 'testCases',
    client: null
  };

  let dbCreds = argv.dbCredentials || process.env.DBCREDENTIALS;

  if (dbCreds) {
    let creds = dbCreds.split(':');
    dbOptions.username = creds[0];
    dbOptions.password = creds[1];
    dbOptions.client = await connectDB(dbOptions);
  }

  let s3Creds = {
    s3accesskey: process.env.s3accesskey,
    s3secretkey: process.env.s3secretkey
  };

  if (argv.s3Credentials) {
    let creds = argv.s3Credentials.split(':');
    s3Creds.s3accesskey = creds[0];
    s3Creds.s3secretkey = creds[1];
  }

  if (!cred && !argv.dryRun) {
    throw `Please provide credential to access TestRail`;
  }

  let results = await readCucumberReports(argv.dir, argv.screenshots, s3Creds);
  console.log(`Found ${results.length} results`);

  // When calling process.exit(), exitCode should be used.
  let fails = results.filter(x => x.status != 'passed');
  let exitCode = fails.length;
  console.log(`Found ${exitCode} result(s) not passed`);

  if (results.length === 0) {
    // Something wrong if there is no result
    exitCode = 1;
  }

  let bceLogs = await readBrowserConsoleErrors(
    path.join('debug', 'browserLog.json')
  );

  let buildInfo = await readBuildInfo(
    path.join('debug', 'buildInfo.json')
  );

  // skip "MWP Web - Document Cloud" to debug TestRail issues
  //if (argv.project === 'MWP Web - Document Cloud') {
  //  console.log(`Skip project "MWP Web - Document Cloud"`);
  //  process.exit(exitCode);
  //}
  // skip milestones to debug TestRail issues
  //if (argv.milestone.startsWith('Prod Monitor/')) {
  //  console.log(`Skip the milestone "${argv.milestone}"`);
  //  process.exit(exitCode);    
  //}

  // Get results to be reported to TestRail
  results = results.filter(x => x.jid != null);

  // Handle scenario outline
  for (let i = 0; i < results.length; i++) {
    if (i === 0) {
      results[i].example = 0;
    } else {
      if (results[i].jid === results[i - 1].jid) {
        if (results[i - 1].example === 0) {
          results[i - 1].example = 1;
        }
        results[i].example = results[i - 1].example + 1;
      } else {
        results[i].example = 0;
      }
    }
  }

  if (results.length > 0) {
    let skipTestRail = false;

    // Don't fail the process if project or milestone is not found in TestRail.
    let project = argv.dryRun || (await getTestRailProject(argv.project, cred));
    let milestone = null;
    if (project) {
      milestone = argv.dryRun || (await project.getMilestone(argv.milestone));
      if (!milestone) {
        console.log(
          `TestRail milestone ${argv.milestone} is not found in project "${argv.project}"`
        );
        skipTestRail = true;
      }
    } else {
      console.log(`TestRail project "${argv.project}" is not found.`);
      skipTestRail = true;
    }

    let totalStatus = 'passed';
    for (let result of results) {
      // Do nothing if no valid project or milestone
      if (skipTestRail) {
        continue;
      }      
      if (result.status != 'passed') {
        totalStatus = 'failed';
      }
      console.log(
        `Writing result for "${result.feature} / ${result.scenario}"...`
      );
      normalizeResult(result);
      if (argv.dryRun) {
        console.log(JSON.stringify(result, null, 2));
      } else {
        let testConfigs = {
          jid: result.jid,
          browser: result.browser,
          locale: result.locale,
          env: result.env,
          akamaiLocale: result.akamaiLocale,
          example: result.example
        };

        let test = await getTest(
          project,
          milestone,
          testConfigs,
          dbOptions,
          skipTestRail
        );

        if (!test) {
          continue;
        }

        // Don't fail the process if the result can't be written to TR or DB
        let trTestId = null;
        let trResultId = null;
        if (!skipTestRail) {
          try {
            [trTestId, trResultId] = await writeResult(test, result);
            console.log(
              `Saved results to TestRail -- Test Id: ${trTestId}, Result Id: ${trResultId}`
            );
          } catch (err) {
            console.log(err.message);
          }
        }
        try {
          result.project = argv.project;
          result.milestone = argv.milestone;
          if (bceLogs) {
            result.browserErrors = bceLogs;
          }
          if (buildInfo) {
            result.buildInfo = buildInfo;
          }
          if (trTestId) {
            result.trTestId = trTestId;
          }
          if (trResultId) {
            result.trResultId = trResultId;
          }
          if (process.env['JENKINS_URL']) {
            result.jenkinsUrl = process.env['JENKINS_URL'];
          }
          if (process.env['JOB_NAME']) {
            result.jobName = process.env['JOB_NAME'];
          }
          if (process.env['BUILD_NUMBER']) {
            result.buildNumber = process.env['BUILD_NUMBER'];
          }
          if (process.env['NODE_NAME']) {
            result.jenkinsNodeName = process.env['NODE_NAME'];
          }
          if (result.jenkinsUrl && result.jobName && result.buildNumber) {
            let buildUrl = `${result.jenkinsUrl}/job/${result.jobName}/${result.buildNumber}/api/json`;
            let upstreamBuilds = [];
            while (true) {
              try {
                let buildInfo = await axios.get(buildUrl);
                let actions = buildInfo.data.actions.filter(x => x.causes);
                let cause = actions[0].causes[0];
                if (cause.upstreamProject && cause.upstreamBuild) {
                  upstreamBuilds.push({
                    project: cause.upstreamProject,
                    build: cause.upstreamBuild
                  });
                } else {
                  break;
                }
                buildUrl = `${result.jenkinsUrl}/job/${cause.upstreamProject}/${cause.upstreamBuild}/api/json`;
              } catch (err) {
                console.log(`Error while getting upstream build: ${err.message}`);
                break;
              }
            }
            result.upstreamBuilds = upstreamBuilds;
          }
          let insertResult = await writeResultToDB(result, dbOptions);
          console.log(`Saved results to DB -- Id: ${insertResult.insertedId}`);
        } catch (err) {
          console.log(err.message);
        }
      }
    }
  }
  if (dbOptions.client) {
    dbOptions.client.close();
  }
  process.exit(exitCode);
}

main();
