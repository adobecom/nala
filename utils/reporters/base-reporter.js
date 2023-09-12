// Playwright will include ANSI color characters and regex from below 
// https://github.com/microsoft/playwright/issues/13522
// https://github.com/chalk/ansi-regex/blob/main/index.js#L3

const pattern = [
  '[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)',
  '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))',
].join('|');

const ansiRegex = new RegExp(pattern, 'g');

// limit failed status 
const failedStatus = ['failed', 'flaky', 'skipped', 'timedOut', 'interrupted'];

function stripAnsi(str) {
  if (!str || typeof str !== 'string') return str;
  return str.replace(ansiRegex, '');
}

class BaseReporter {
  constructor(options) {
    this.options = options;
    this.results = [];
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
  }

  async onEnd() {
    this.printPersistingOption();
    await this.persistData();
    console.log('Test run is finished');
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
