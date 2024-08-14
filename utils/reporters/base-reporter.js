import { sendSlackMessage } from '../../libs/slack.js';

// Playwright will include ANSI color characters and regex from below
// https://github.com/microsoft/playwright/issues/13522
// https://github.com/chalk/ansi-regex/blob/main/index.js#L3

const pattern = [
  '[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)',
  '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))',
].join('|');

const ansiRegex = new RegExp(pattern, 'g');

// limit failed status
const failedStatus = ['failed', 'flaky', 'timedOut', 'interrupted'];

function stripAnsi(str) {
  if (!str || typeof str !== 'string') return str;
  return str.replace(ansiRegex, '');
}

class BaseReporter {
  constructor(options) {
    this.options = options;
    this.results = [];
    this.passedTests = 0;
    this.failedTests = 0;
    this.skippedTests = 0;
  }

  onBegin(config, suite) {
    this.config = config;
    this.rootSuite = suite;

  }

  async onTestEnd(test, result) {
    const { title, retries, _projectId } = test;
    const { name, tags, url, browser, env, branch, repo} = this.parseTestTitle(title, _projectId);
    const {
      status,
      duration,
      error: { message: errorMessage, value: errorValue, stack: errorStack } = {},
      retry,
    } = result;

    if (retry < retries && status === 'failed') {
      return;
    }
    this.results.push({
      title,
      name,
      tags,
      url,
      env,
      browser,
      branch,
      repo,
      status: failedStatus.includes(status) ? 'failed' : status,
      errorMessage: stripAnsi(errorMessage),
      errorValue,
      errorStack: stripAnsi(errorStack),
      stdout: test.stdout,
      stderr: test.stderr,
      duration,
      retry,
    });
    if (status === 'passed') {
      this.passedTests++;
    } else if (failedStatus.includes(status)) {
      this.failedTests++;
    } else if (status === 'skipped') {
      this.skippedTests++;
    }
  }

  async onEnd() {
    //this.printPersistingOption();
    //await this.persistData();
    const summary = this.printResultSummary();
    const resultSummary = { summary };

    if (process.env.SLACK_WH) {
      try {
        await sendSlackMessage(process.env.SLACK_WH, resultSummary);
      } catch (error){
        console.log('----Failed to publish result to slack channel----');
      }
    }
  }

  printResultSummary() {
    const totalTests = this.results.length;
    const passPercentage = ((this.passedTests / totalTests) * 100).toFixed(2);
    const failPercentage = ((this.failedTests / totalTests) * 100).toFixed(2);
    const miloLibs = process.env.MILO_LIBS || '';
    const prBranchUrl = process.env.PR_BRANCH_LIVE_URL + miloLibs
    let envURL = prBranchUrl || this.config.projects[0].use.baseURL;
    let exeEnv = 'Local Environment';
    let runUrl = 'Local Environment';
    let runName = 'Nala Local Run';

    if (process.env.GITHUB_ACTIONS === 'true') {
      exeEnv = 'GitHub Actions Environment';
      const repo = process.env.GITHUB_REPOSITORY;
      const runId = process.env.GITHUB_RUN_ID;
      const prNumber = process.env.GITHUB_REF.split('/')[2];
      runUrl = `https://github.com/${repo}/actions/runs/${runId}`;
      runName = `${process.env.WORKFLOW_NAME ? (process.env.WORKFLOW_NAME || 'Nala Daily Run') : 'Nala PR Run'} (${prNumber})`;
    } else if (process.env.CIRCLECI) {
      exeEnv = 'CircleCI Environment';
      const workflowId = process.env.CIRCLE_WORKFLOW_ID;
      const jobNumber = process.env.CIRCLE_BUILD_NUM;
      runUrl = `https://app.circle.ci.adobe.com/pipelines/github/wcms/nala/${jobNumber}/workflows/${workflowId}/jobs/${jobNumber}`;
      runName = 'Nala CircleCI/Stage Run';
    }

    const summary = `
    ---------Nala Test Run Summary------------
    # Total Test executed: ${totalTests}
    # Test Pass          : ${this.passedTests} (${passPercentage}%)
    # Test Fail            : ${this.failedTests} (${failPercentage}%)
    # Test Skipped     : ${this.skippedTests}
    ** Application URL  : ${envURL}
    ** Executed on        : ${exeEnv}
    ** Execution details  : ${runUrl}
    ** Workflow name      : ${runName}` ;

    console.log(summary);

    if (this.failedTests > 0) {
      console.log('-------- Test Failures --------');
      this.results
        .filter((result) => result.status === 'failed')
        .forEach((failedTest) => {
          console.log(`Test: ${failedTest.title.split('@')[1]}`);
          console.log(`Error Message: ${failedTest.errorMessage}`);
          console.log(`Error Stack: ${failedTest.errorStack}`);
          console.log('-------------------------');
        });
    }
    return summary;
  }

  /**
  This method takes test title and projectId strings and then processes it .
  @param {string, string} str - The input string to be processed
  @returns {'name', 'tags', 'url', 'browser', 'env', 'branch' and 'repo'}
  */
  parseTestTitle(title, projectId) {
    let env = 'live';
    let browser = 'chrome';
    let branch;
    let repo;
    let url;

    const titleParts = title.split('@');
    const name = titleParts[1].trim();
    const tags = titleParts.slice(2).map(tag => tag.trim());

    const projectConfig = this.config.projects.find(project => project.name === projectId);

    // Get baseURL from project config
    if (projectConfig?.use?.baseURL) {
      ({ baseURL: url, defaultBrowserType: browser } = projectConfig.use);
    } else if (this.config.baseURL) {
      url = this.config.baseURL;
    }
    // Get environment from baseURL
    if (url.includes('prod')) {
      env = 'prod';
    } else if (url.includes('stage')) {
      env = 'stage';
    }
    // Get branch and repo from baseURL
    if (url.includes('localhost')) {
      branch = 'local';
      repo = 'local';
    } else {
      const urlParts = url.split('/');
      const branchAndRepo = urlParts[urlParts.length - 1];
      [branch, repo] = branchAndRepo.split('--');
    }

    return { name, tags, url, browser, env, branch, repo};
  }

  // eslint-disable-next-line class-methods-use-this, no-empty-function
  async persistData() {}

  printPersistingOption() {
    if (this.options?.persist) {
      console.log(
        `Persisting results using ${this.options.persist?.type} to ${this.options.persist?.path}`,
      );
    } else {
      console.log('Not persisting data');
    }
    //this.branch1 = process.env.GITHUB_REF_NAME ?? 'local';
    this.branch = process.env.LOCAL_TEST_LIVE_URL;
  }

  getPersistedDataObject() {
    const gitBranch = process.env.GITHUB_REF_NAME ?? 'local';

    // strip out git owner since it can usually be too long to show on the ui
    const [, gitRepo] = /[A-Za-z0-9_.-]+\/([A-Za-z0-9_.-]+)/.exec(
      process.env.GITHUB_REPOSITORY,
    ) ?? [null, 'local'];

    const currTime = new Date();
    return {
      gitBranch,
      gitRepo,
      results: this.results,
      timestamp: currTime,
    };
  }
}
module.exports = BaseReporter;
