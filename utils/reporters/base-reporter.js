const { processTestTitle } = require('../extract-test-title.js');

// playwright will include ANSI color characters: https://github.com/microsoft/playwright/issues/13522
// using regex from https://github.com/chalk/ansi-regex/blob/main/index.js#L3
const pattern = [
  '[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)',
  '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))',
].join('|');
const ansiRegex = new RegExp(pattern, 'g');

// limit statuses to only be: failed, flaky, passed
const failedStatus = ['failed', 'skipped', 'timedOut', 'interrupted'];

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
    const { name, env, tag, url, branch } = processTestTitle(test.title);
    // const { name, env, tag, url, branch } = extractTags(test.title);
    const { stdout, stderr, title, retries, _projectId } = test;
    const {
      status,
      duration,
      error: {
        message: errorMessage,
        value: errorValue,
        stack: errorStack,
      } = {},
      retry,
    } = result;
    if (retry < retries && status === 'failed') {
      return;
    }
    this.results.push({
      title,
      branch,
      name,
      tag,
      env,
      url,
      browser: _projectId,
      status: failedStatus.includes(status) ? 'failed' : status,
      errorMessage: stripAnsi(errorMessage),
      errorValue,
      errorStack: stripAnsi(errorStack),
      stdout,
      stderr,
      duration,
      retry,
    });
  }

  async onEnd() {
    this.printPersistingOption();
    await this.persistData();
    console.log('Test run is finished');
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
    const branch = process.env.GITHUB_REF_NAME ?? 'local';

    // strip out git owner since it can usually be too long to show on the ui
    const [, repo] = /[A-Za-z0-9_.-]+\/([A-Za-z0-9_.-]+)/.exec(
      process.env.GITHUB_REPOSITORY,
    ) ?? [null, 'local'];

    const currTime = new Date();
    return {
      branch,
      repo,
      results: this.results,
      timestamp: currTime,
    };
  }
}

module.exports = BaseReporter;
