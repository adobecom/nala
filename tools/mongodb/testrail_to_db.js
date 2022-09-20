/**
 * Read a TestRail milestone and write test cases to DB
 * It needs TestRail credentials in env TESTRAILCREDENTIALS.
 */
const yargs = require('yargs');
const glob = require('glob');
const path = require('path');
const fs = require('fs');
const { getTestRailTests } = require('../testrail/get_tests');
const { MongoClient } = require('mongodb');

/**
 *
 * @param {string} project
 * @param {string} milestone
 * @param {object[]} tests
 * @returns
 */
function normalizeTests(project, milestone, tests) {
  let newTests = tests.map(x => {
    let assignee = null;
    let m = x.custom_notes && x.custom_notes.match(/Assignee: (.*)$/);
    if (m) {
      assignee = m[1];
    }
    return {
      project,
      milestone,
      id: x.id,
      case_id: x.case_id,
      status_id: x.status_id,
      run_id: x.run_id,
      title: x.title,
      refs: x.refs,
      custom_automation_id: x.custom_automation_id,
      runConfigIds: x.runConfigIds,
      runConfigs: x.runConfigs,
      assignee
    }
  });
  return newTests;
}

/**
 *
 * @param {*} tests
 * @param {*} dbOptions
 * @returns
 */
async function writeTestsToDB(tests, dbOptions) {
  if (tests.length === 0) {
    return [];
  }

  let dbName = dbOptions.dbName;
  let dbCollection = dbOptions.dbCollection;
  let username = dbOptions.username;
  let password = dbOptions.password;

  const url = `mongodb://${username}:${password}@grape-a.corp.adobe.com:27021,grape-b.corp.adobe.com:27021,grape-c.corp.adobe.com:27021/?authSource=${dbName}&replicaSet=or_grape_prd_27021&readPreference=primary&ssl=false`;
  const client = new MongoClient(url);
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection(dbCollection);
  collection.deleteMany({
    project: tests[0].project,
    milestone: tests[0].milestone
  });
  const insertResult = await collection.insertMany(tests);
  await client.close();
  return insertResult;
}

async function main() {
  let argv = yargs
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
    .parserConfiguration({ 'strip-aliased': true }).argv;

  argv.milestone = argv.milestone.replace('\\', '/');

  let creds = argv.credentials || process.env.TESTRAILCREDENTIALS;

  let dbOptions = {
    dbName: 'WEBAUTODB',
    dbCollection: 'testCases'
  };

  let dbCreds = argv.dbCredentials || process.env.DBCREDENTIALS;

  if (dbCreds) {
    let creds = dbCreds.split(':');
    dbOptions.username = creds[0];
    dbOptions.password = creds[1];
  }

  if (!creds) {
    throw `Please provide credential to access TestRail`;
  }

  let testCases = await getTestRailTests(argv.project, argv.milestone, creds);

  testCases = normalizeTests(argv.project, argv.milestone, testCases);

  let res = await writeTestsToDB(testCases, dbOptions);
}

main();
