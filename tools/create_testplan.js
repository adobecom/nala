const yargs = require('yargs');
const { TestRail } = require('./testrail');
const yaml = require('js-yaml');
const fs = require('fs');

const f = (a, b) => [].concat(...a.map(d => b.map(e => [].concat(d, e))));
const cartesian = (a, b, ...c) => (b ? cartesian(f(a, b), ...c) : a);

async function getTestRailProject(project, credentials) {
  if (!credentials) {
    throw `No TestRail credentials`;
  }
  let testrailHost = 'https://testrail.corp.adobe.com';
  let user = credentials.split(':');
  testrail = new TestRail(testrailHost, user[0], user[1]);
  return await testrail.getProject(project);
}

function normalizeConfig(settings) {
  for (let entry of settings.entries) {
    for (let cfg in entry.configs) {
      if (cfg === 'browsers') {
        for (let i=0; i < entry.configs[cfg].length; i++) {
          let parts = entry.configs[cfg][i].split('-');
          if (parts[1] && parts[1].match(/win10/)) {
            entry.configs[cfg][i] = `${parts[0]}-win10`;
          }
        }
      }
    }
  }
}

async function main() {
  let yargsOpts = yargs
    .options('settings', {
      alias: 's',
      required: true,
      description: 'TestRail plan settings'
    })
    .options('close', {
      alias: 'x',
      boolean: true,
      description: 'Close the existing TestRail test plan'
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

  let settings = yaml.load(fs.readFileSync(argv.settings), 'utf8');

  normalizeConfig(settings);

  let project = await getTestRailProject(settings.project, cred);

  // Get all cases in memory for search
  let cases = await project.getAllCases();

  // Create maps for Jira ID and Automation ID for search
  let jids = {};
  let noJids = [];
  let aids = {};
  let noAids = [];
  for (let c of cases) {
    if (c.refs) {
      let jid = c.refs;
      jids[jid] = jids[jid] || [];
      jids[jid].push(c);
    } else {
      noJids.push(c);
    }
    if (c.custom_automation_id) {
      let aid = c.custom_automation_id.split('#')[0];
      aids[aid] = aids[aid] || [];
      aids[aid].push(c);
    } else {
      noAids.push(c);
    }
  }
  if (noJids.length > 0) {
    console.log('No Jira ID cases:');
    noJids.forEach(x => console.log(`C${x.id}`));
  }
  if (noAids.length > 0) {
    console.log('No Automation ID cases:');
    noAids.forEach(x => console.log(`C${x.id}`));
  }

  // Map YAML config settings to TestRail config groups
  cfgMap = {
    envs: 'Environments',
    browsers: 'Browsers',
    locales: 'Locales',
    akamaiLocale: 'akamaiLocale'
  };

  // Create test plan for each env
  for (let env of settings.envs) {
    // Configurations for create TestRail plan
    let options = {
      entries: []
    };

    // For each entry, create runs
    // [cases] x [configs: env x browsers x locales]
    for (let entry of settings.entries) {
      // Find cases by automation IDs
      // Cases may be in one or more suites
      let suiteIds = {};
      for (let aid of entry.automationIds) {
        if (aid in aids) {
          for (let c of aids[aid]) {
            let sid = c.suite_id;
            suiteIds[sid] = suiteIds[sid] || [];
            suiteIds[sid].push(c);
          }
        } else {
          throw `The automation ID "${aid}" is not found.`;
        }
      }

      // Generate combination from config matrix
      let matrix = [];
      cfgSettings = project.testrail.configs;
      // Add env dimension
      entry.configs.envs = [env];
      for (let cfg in entry.configs) {
        let groupName = cfgMap[cfg];
        if (!groupName) {
          throw `The configuration "${cfg}" is not supported.`;
        }
        let cfgSetting = cfgSettings.find(x => x.name === groupName);
        if (!cfgSetting) {
          throw `The configuration "${groupName}" is not in TestRail project.`;
        }
        let dim = [];
        for (let i of entry.configs[cfg]) {
          let item = cfgSetting.configs.find(x => x.name == i);
          if (!item) {
            let options = {
              name: i
            };
            item = await project.createConfig(options, cfgSetting.id);
            console.log(`The value "${i}" is not in TestRail configuration "${groupName}". Created new value "${i}"`)
          }
          dim.push(item.id);
        }
        matrix.push(dim);
      }

      // Get all combinations
      let combs = cartesian(...matrix);

      // Add runs to entry
      for (let suiteId in suiteIds) {
        let suite = {
          suite_id: suiteId,
          config_ids: matrix.flat(),
          runs: []
        };
        for (let comb of combs) {
          suite.runs.push({
            suite_id: suiteId,
            include_all: false,
            case_ids: suiteIds[suiteId].map(x => x.id),
            config_ids: comb
          });
        }
        options.entries.push(suite);
      }
    }

    let milestone = await project.getMilestone(`${settings.milestone}/${env}`);

    options.milestone_id = milestone.id;
    let today = new Date();
    today = new Date(today - today.getTimezoneOffset() * 60 * 1000)
      .toISOString()
      .slice(0, 10);
    options.name = settings.plan
      .replace('${env}', env)
      .replace('${today}', today);

    let plan = await project.createPlan(options);
    console.log(`Plan: ${plan.name}`);
    console.log(`Test Count: ${plan.untested_count}`);
    console.log(`Suite Entries Count: ${plan.entries.length}`);
    console.log(`Run Count: ${plan.entries.map(x => x.runs).flat().length}`);

    if (argv.close) {
      let plans = await project.getPlans({ milestone, is_completed: 0 });
      for (let p of plans) {
        if (p.id == plan.id) {
          // Don't delete the one just created
          continue;
        }
        let res = await p.close();
        console.log('The test plan is closed:');
        console.log(res);
      }
    }
  }
}

main().catch(error => {
  console.log(error);
  process.exit(1);
});
