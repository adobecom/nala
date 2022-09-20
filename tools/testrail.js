const path = require('path');
const axios = require('axios');
const querystring = require('querystring');

class TRBase {
  constructor(obj, testrail) {
    Object.assign(this, obj);
    this.testrail = testrail;
  }

  async getDetail() {
    let obj = await this.testrail.get(
      `get_${this.constructor.name.toLowerCase()}/${this.id}`
    );
    Object.assign(this, obj);
  }
}

class Milestone extends TRBase {
  getPath() {
    let paths = [];
    let ptr = this;
    while (true) {
      paths.unshift(ptr.name);
      if (ptr.parent) {
        ptr = ptr.parent;
      } else {
        break;
      }
    }
    return paths.join('/');
  }
}

class Case extends TRBase {
  async updateCase(options) {
    let data = options || {};
    if (data.caseType) {
      data.type_id = this.testrail.caseTypes[data.caseType];
      delete data.caseType;
    }
    if (data.priority) {
      data.priority_id = this.testrail.priorities[data.priority];
      delete data.priority;
    }
    if (data.section) {
      data.section_id = data.section.id;
      delete data.section;
    }
    if (data.suite) {
      data.suite_id = data.suite.id;
      delete data.suite;
    }
    let res = await this.testrail.post(`update_case/${this.id}`, data);
    return new Case(res, this.testrail);
  }

  async delete() {
    return await this.testrail.post(`delete_case/${this.id}`);
  }
}

class Suite extends TRBase {
  async deleteSuite() {
    return await this.testrail.post(`delete_suite/${this.id}`);
  }
}

class Section extends TRBase {
  /**
   *
   * @param {*} options.title
   * @param {*} options.type_id
   * @param {*} options.priority_id
   * @param {*} options.estimate
   * @param {*} options.milestone_id
   * @param {*} options.refs
   */
  async addCase(options) {
    let data = options || {};
    if (data.caseType) {
      data.type_id = this.testrail.caseTypes[data.caseType];
      delete data.caseType;
    }
    if (data.priority) {
      data.priority_id = this.testrail.priorities[data.priority];
      delete data.priority;
    }
    let res = await this.testrail.post(`add_case/${this.id}`, data);
    return new Case(res, this.testrail);
  }

  async deleteSection() {
    return await this.testrail.post(`delete_section/${this.id}`);
  }
}

class PlanSuite extends TRBase {
  getRuns() {
    return this.runs.map(x => new Run(x, this.testrail));
  }
}

class Plan extends TRBase {
  async getSuites() {
    if (!this.entries) {
      await this.getDetail();
    }
    return this.entries.map(x => new PlanSuite(x, this.testrail));
  }

  async close() {
    return await this.testrail.post(`close_plan/${this.id}`);
  }
}

class Run extends TRBase {
  async getTests() {
    let items = await this.testrail.get(`get_tests/${this.id}`);
    return items.map(x => new Test(x, this.testrail));
  }

  async retestTests() {
    let tests = await this.getTests();
    let apis = tests.map(x => `add_result/${x.id}`);
    let resp = await Promise.all(
      apis.map(x => this.testrail.post(x, { status_id: 4 }))
    ).catch(err => console.log(err));
    return resp;
  }
}

class Test extends TRBase {
  msToSec(elapsed) {
    if (typeof elapsed === 'number') {
      return `${elapsed / 1000}s`;
    } else {
      return elapsed;
    }
  }

  async addResult(options) {
    options = options || {};
    let status = options.status;
    let endpoint = `add_result/${this.id}`;
    let data = {
      status_id: this.testrail.statuses[status],
      elapsed: this.msToSec(options.elapsed)
    };
    if (options.comment) {
      data.comment = options.comment;
    }
    return this.testrail.post(endpoint, data);
  }

  async getResults(options) {
    options = options || {};
    let since = options.since;
    let until = options.until;
    let endpoint = `get_results/${this.id}`;
    let results = await this.testrail.get(endpoint);
    if (results.length > 0 && since && until) {
      results = results.filter(
        x => x.created_on >= since && x.created_on <= until
      );
    }
    return results;
  }
}

class Project extends TRBase {
  async getTRObjects(trObject, options) {
    options = options || {};
    let qs = querystring.encode(options);
    let endpoint = `get_${trObject}s/${this.id}`;
    if (qs) {
      endpoint += `&${qs}`;
    }
    return this.testrail.get(endpoint);
  }

  async getTRObject(trObject, name) {
    let objects = await this.getTRObjects(trObject);
    let object = objects.filter(x => x.name === name);
    if (!object) {
      throw `The ${trObject} "${name}" is not found.`;
    }
    return object[0];
  }

  async getMilestone(name) {
    let parts = name.replace('\\', '/').split('/');
    let objects = await this.getTRObjects('milestone');
    let milestone = null;
    let parentMilestone = null;
    for (let part of parts) {
      milestone = objects.find(x => x.name === part && x.is_completed === false);
      if (!milestone) {
        return null;
      }
      milestone = await testrail.get(`get_milestone/${milestone.id}`);
      milestone.parent = parentMilestone;
      objects = milestone.milestones;
      parentMilestone = milestone
    }
    return new Milestone(milestone, this.testrail);
  }

  async getPlan(name) {
    return new Plan(await this.getTRObject('plan', name), this.testrail);
  }

  async getSuites() {
    let suites = await this.getTRObjects('suite');
    return suites.map(x => new Suite(x, this.testrail));
  }

  async getSuite(name) {
    return new Suite(await this.getTRObject('suite', name), this.testrail);
  }

  async getSections(suite) {
    let sections = await this.getTRObjects('section', { suite_id: suite.id });
    return sections.map(x => new Section(x, this.testrail));
  }

  async addSuite(options) {
    options = options || {};
    if (!options.name) {
      throw `Name is required for adding suite`;
    }
    let endpoint = `add_suite/${this.id}`;
    let res = await this.testrail.post(endpoint, options);
    return new Suite(res, this.testrail);
  }

  async addSection(options) {
    options = options || {};
    if (!options.name) {
      throw `Name is required for adding a section`;
    }
    if (options.suite) {
      options.suite_id = options.suite.id;
      delete options.suite;
    }
    if (options.parent) {
      options.parent_id = options.parent.id;
      delete options.parent;
    }
    let endpoint = `add_section/${this.id}`;
    let res = await this.testrail.post(endpoint, options);
    return new Section(res, this.testrail);
  }

  async getCases(suite, section) {
    let cases = await this.getTRObjects('case', {
      suite_id: suite.id,
      section_id: section.id
    });
    return cases.map(x => new Case(x, this.testrail));
  }

  async getAllCases() {
    let suites = await this.getTRObjects('suite');
    let allSections = [];
    for (let suite of suites) {
      let sections = await this.getTRObjects('section', { suite_id: suite.id });
      allSections.push(
        ...sections.map(x => ({ suite_id: suite.id, section_id: x.id }))
      );
    }
    let cases = await Promise.all(
      allSections.map(x => this.getTRObjects('case', x))
    );
    cases = cases.flat();

    return cases.map(x => new Case(x, this.testrail));
  }

  getConfigIds(options) {
    let configs = [];
    for (let setting of this.testrail.configs) {
      let arg = this.testrail.testConfigs[setting.name];
      if (options[arg] != null) {
        let cfg = setting.configs.find(x => x.name === options[arg]);
        if (cfg) {
          configs.push(cfg.id);
        } else {
          console.log(
            `Can't find "${options[arg]}" in TestRail configuration "${setting.name}"`
          );
        }
      }
    }
    return configs;
  }

  getConfig(options) {
    let configs = [];
    for (let setting of this.testrail.configs) {
      let arg = this.testrail.testConfigs[setting.name];
      if (arg in options && options[arg]) {
        configs.push(options[arg]);
      }
    }
    return configs.join(', ');
  }

  getConfigValues(configIds) {
    let configs = {};
    for (let id of configIds) {
      for (let config of this.testrail.configs) {
        let item = config.configs.filter(x => x.id == id);
        if (item.length > 0) {
          configs[this.testrail.testConfigs[config.name]] = item[0].name;
          break;
        }
      }
    }
    return configs;
  }

  async createConfig(options, configGroupId) {
    let endpoint = `add_config/${configGroupId}`;
    let res = await this.testrail.post(endpoint, options);
    let projectConfigs = await this.testrail.get(`get_configs/${this.id}`);
    let configGroup = projectConfigs.find(x => x.id === configGroupId);
    let config = configGroup.configs.find(x => x.name === options.name);
    return config;
  }

  async retestTests(options) {
    options = options || {};
    let milestone = options.milestone;

    if (!milestone) {
      throw 'No milestone is specified';
    }
    let results = [];
    let plans = await this.getPlans({ milestone: milestone });
    for (let plan of plans) {
      let suites = await plan.getSuites();
      for (let suite of suites) {
        let runs = await suite.getRuns();
        for (let run of runs) {
          let runResults = await run.retestTests();
          results.push(...runResults);
        }
      }
    }
    return results;
  }

  async getTest(options) {
    options = options || {};
    let milestone = options.milestone;
    let jid = options.jid;
    let example = options.example;
    let configIds = this.getConfigIds(options);
    let configIdStr = JSON.stringify(configIds.sort());
    let config = this.getConfig(options);
    console.log(
      `Find tests with Jira ID ${jid} #${example} and configurations "${config}" ${configIdStr}`
    );

    if (!milestone) {
      throw 'No milestone is specified';
    }
    let plans = await this.getPlans({ milestone: milestone, is_completed: 0 });
    for (let plan of plans) {
      let suites = await plan.getSuites();
      for (let suite of suites) {
        let runs = await suite.getRuns();
        for (let run of runs) {
          // run.config or run.config_ids
          let runConfigStr = JSON.stringify(run.config_ids.sort());
          if (configIdStr === runConfigStr) {
            //if (config === run.config) {
            let tests = await run.getTests();
            if (example === 0) {
              let test = tests.find(x => x.refs === jid);
              if (test) {
                return test;
              }
            } else if (example > 0) {
              let test = tests.find(
                x =>
                  x.refs === jid &&
                  x.custom_automation_id &&
                  x.custom_automation_id.endsWith(`#${example}`)
              );
              if (test) {
                return test;
              }
            }
          }
        }
      }
    }
    return null;
  }

  async getResults(options) {
    options = options || {};
    let milestone = options.milestone;
    let since = options.since;
    let until = options.until;
    if (since && since.constructor.name === 'Date') {
      since = since.getTime() / 1000;
    }
    if (until && until.constructor.name === 'Date') {
      until = until.getTime() / 1000;
    }

    if (!milestone) {
      throw 'No milestone is specified';
    }

    let results = [];
    let plans = await this.getPlans({ milestone: milestone });
    for (let plan of plans) {
      let suites = await plan.getSuites();
      for (let suite of suites) {
        let runs = await suite.getRuns();
        for (let run of runs) {
          let configs = this.getConfigValues(run.config_ids);
          let tests = await run.getTests();
          for (let test of tests) {
            let testResults = await test.getResults({ since, until });
            for (let testResult of testResults) {
              Object.assign(testResult, configs);
              Object.assign(testResult, {
                title: test.title,
                testId: test.id,
                jid: test.refs,
                run: run.name,
                runId: run.id,
                suite: suite.name,
                suiteId: suite.id,
                plan: plan.name,
                planId: plan.id,
                milestone: milestone.name,
                milestoneId: milestone.id,
                project: this.name,
                projectId: this.id
              });
              results.push(testResult);
            }
          }
        }
      }
    }
    return results;
  }

  async getAll(endpoint) {
    let objects = [];
    let limit = 250;
    let offset = 0;
    while (true) {
      let endpointx = endpoint + `&limit=${limit}&offset=${offset}`;
      let batch = await this.testrail.get(endpointx);
      objects.push(...batch);
      if (batch.length >= limit) {
        offset += batch.length;
      } else {
        break;
      }
    }
    return objects;
  }

  async createPlan(options) {
    let endpoint = `add_plan/${this.id}`;
    let res = await this.testrail.post(endpoint, options);
    return res;
  }

  async getPlans(options) {
    options = options || {};
    let milestone = options.milestone;
    let is_completed = options.is_completed;
    let endpoint = `get_plans/${this.id}`;
    if (milestone) {
      endpoint = endpoint + `&milestone_id=${milestone.id}`;
    }
    if (is_completed != null) {
      endpoint = endpoint + `&is_completed=${is_completed}`;
    }
    let objects = await this.getAll(endpoint);
    return objects.map(x => new Plan(x, this.testrail));
  }

  async getRuns(options) {
    options = options || {};
    let milestone = options.milestone;
    let suite = options.suite;
    let endpoint = `get_runs/${this.id}`;
    if (milestone) {
      endpoint = endpoint + `&milestone_id=${milestone.id}`;
    }
    if (suite) {
      endpoint = endpoint + `&suite_id=${suite.id}`;
    }
    let objects = await this.getAll(endpoint);
    return objects.map(x => new Run(x, this.testrail));
  }
}

class TestRail {
  constructor(baseUrl, username, password) {
    let lib = path.join(
      path.dirname(require.resolve('axios')),
      'lib/adapters/http'
    );
    let http = require(lib);
    this.config = {
      adapter: http,
      headers: { 'Content-Type': 'application/json' }
    };
    if (username && password) {
      this.config.auth = {
        username: username,
        password: password
      };
    }
    this.baseUrl = baseUrl + '/index.php?/api/v2/';
    // Map TestRail test config => automation config
    this.testConfigs = {
      Environments: 'env',
      Browsers: 'browser',
      Locales: 'locale',
      akamaiLocale: 'akamaiLocale'
    };
    this.trConfigs = Object.fromEntries(
      Object.entries(this.testConfigs).map(([k, v]) => [v, k])
    );
  }

  get(api, params) {
    let url = this.baseUrl + api;
    if (params) {
      url = url + `&${querystring.encode(params)}`;
    }
    return axios
      .get(url, this.config)
      .then(res => {
        return res.data;
      })
      .catch(err => {
        console.log(err.message);
        console.log(err.response.data.error);
      });
  }

  post(api, data, params) {
    let url = this.baseUrl + api;
    if (params) {
      url = url + `&${querystring.encode(params)}`;
    }
    return axios
      .post(url, data, this.config)
      .then(res => {
        return res.data;
      })
      .catch(err => {
        console.log(err.message);
        console.log(err.response.data.error);
      });
  }

  async getConstants(name) {
    let items = await this.get(`get_${name}`);
    let constants = {};
    items.forEach(x => (constants[x.name] = x.id));
    return constants;
  }

  async getProject(name) {
    const fs = require('fs');
    const path = require('path');
    let dir = path.join(__dirname, 'testrail');
    this.statuses = JSON.parse(fs.readFileSync(path.join(dir, 'statuses.json')));
    this.priorities = JSON.parse(fs.readFileSync(path.join(dir, 'priorities.json')));
    this.caseTypes = JSON.parse(fs.readFileSync(path.join(dir, 'casetypes.json')));
    this.caseFields = JSON.parse(fs.readFileSync(path.join(dir, 'casefields.json')));
    this.resultFields = JSON.parse(fs.readFileSync(path.join(dir, 'resultfields.json')));
    let projects = JSON.parse(fs.readFileSync(path.join(dir, 'projects.json')));

    //this.statuses = await this.getConstants('statuses');
    //this.priorities = await this.getConstants('priorities');
    //this.caseTypes = await this.getConstants('case_types');
    //this.caseFields = await this.get('get_case_fields');
    //this.resultFields = await this.get('get_result_fields');
    //let projects = await this.get('get_projects');

    let project = projects.filter(x => x.name === name);
    if (!project) {
      throw `The project "${name}" is not found.`;
    }
    //this.configs = await this.get(`get_configs/${project[0].id}`);
    this.configs = JSON.parse(fs.readFileSync(path.join(dir, `configs_${project[0].id}.json`)));
    
    //fs.writeFileSync("tools/testrail/statuses.json", JSON.stringify(this.statuses, null, 2));
    //fs.writeFileSync("tools/testrail/priorities.json", JSON.stringify(this.priorities, null, 2));
    //fs.writeFileSync("tools/testrail/casetypes.json", JSON.stringify(this.caseTypes, null, 2));
    //fs.writeFileSync("tools/testrail/casefields.json", JSON.stringify(this.caseFields, null, 2));
    //fs.writeFileSync("tools/testrail/resultfields.json", JSON.stringify(this.resultFields, null, 2));
    //fs.writeFileSync("tools/testrail/projects.json", JSON.stringify(projects, null, 2));    
    //fs.writeFileSync(`tools/testrail/configs_${project[0].id}.json`, JSON.stringify(this.configs, null, 2));
    //for (let proj of projects) {
    //  let configs = await this.get(`get_configs/${proj.id}`);
    //  fs.writeFileSync(`tools/testrail/configs_${proj.id}.json`, JSON.stringify(configs, null, 2));
    //}

    return new Project(project[0], this);
  }
}

module.exports = {
  TestRail,
  Project,
  Test,
  Run,
  Plan,
  PlanSuite,
  Suite,
  Milestone
};
