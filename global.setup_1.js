import { exit } from 'process';
const { execSync } = require('child_process');
const { isBranchURLValid } = require('./libs/baseurl.js');
const axios = require('axios');

const MAIN_BRANCH_LIVE_URL = 'https://main--milo--adobecom.hlx.live';
const STAGE_BRANCH_URL = 'https://milo.stage.adobe.com';
const LOCALHOST_URL = 'http://localhost:3000';

async function getGitHubPRBranchLiveUrl() {
  // get the pr number
  const prReference = process.env.GITHUB_REF;
  const prNumber = prReference.split('/')[2];
  
  // get the pr branch name
  const branch = process.env.GITHUB_HEAD_REF;    
  const prBranch = branch.replace(/\//g, '-');

  // get the org and repo 
  const repository = process.env.GITHUB_REPOSITORY;
  const repoParts = repository.split('/');    
  const toRepoOrg = repoParts[0];  
  const toRepoName = repoParts[1];
 
  // Get the org and repo from the environment variables
  const prFromOrg = process.env.prOrg;
  const prFromRepoName = process.env.prRepo;

  
  let prBranchLiveUrl;

  if (toRepoName === 'nala' || toRepoName === 'janus') {
    prBranchLiveUrl = MAIN_BRANCH_LIVE_URL;
  } else {
    prBranchLiveUrl = `https://${prBranch}--${prFromRepoName}--${prFromOrg}.hlx.live`;
  }

  try {
    if (await isBranchURLValid(prBranchLiveUrl)) {
      process.env.PR_BRANCH_LIVE_URL = prBranchLiveUrl;
    }
    console.info('PR Repository : ', repository);
    console.info('PR TO ORG     : ', toRepoOrg);
    console.info('PR TO REPO    : ', toRepoName);
    console.info('PR From ORG   : ', prFromOrg);
    console.info('PR From REPO  : ', prFromRepoName);
    console.info('PR Branch     : ', branch);
    console.info('PR Branch(U)  : ', prBranch);
    console.info('PR Number     : ', prNumber);
    console.info('PR From Branch live url : ', prBranchLiveUrl);
  } catch (err) {
    console.error(`Error => Error in setting PR Branch test URL : ${prBranchLiveUrl}`);
    console.info(`Note: PR branch test url  ${prBranchLiveUrl} is not valid, Exiting test execution.`);
    process.exit(1);
  }
}

async function getGitHubMiloLibsBranchLiveUrl() {
  const repository = process.env.GITHUB_REPOSITORY;

  let prBranchLiveUrl;
  let miloLibs;

  prBranchLiveUrl = process.env.PR_BRANCH_MILOLIBS_LIVE_URL;
  miloLibs = process.env.MILO_LIBS;

  try {
    if (await isBranchURLValid(prBranchLiveUrl)) {
      process.env.PR_BRANCH_LIVE_URL = prBranchLiveUrl;     
    }
    console.info('PR Repository : ', repository);
    console.info('PR Branch live url : ', prBranchLiveUrl);
    console.info('Milo Libs : ', miloLibs);
  } catch (err) {
    console.error(`Error => Error in setting PR Branch test URL : ${prBranchLiveUrl}`);
    console.info(`Note: PR branch test url  ${prBranchLiveUrl} is not valid, Exiting test execution.`);
    process.exit(1);
  }
}

async function getCircleCIBranchLiveUrl() {
  const stageBranchLiveUrl = STAGE_BRANCH_URL;

  try {
    if (await isBranchURLValid(stageBranchLiveUrl)) {
      process.env.PR_BRANCH_LIVE_URL = stageBranchLiveUrl;
    }
    console.info('Stage Branch Live URL : ', stageBranchLiveUrl);
  } catch (err) {
    console.error('Error => Error in setting Stage Branch test URL : ', stageBranchLiveUrl);
    console.info('Note: Stage branch test url is not valid, Exiting test execution.');
    process.exit(1);
  }
}

async function getLocalBranchLiveUrl() {
  try {
    const localGitRootDir = execSync('git rev-parse --show-toplevel', { encoding: 'utf-8' }).trim();

    if (localGitRootDir) {
      const gitRemoteOriginUrl = execSync('git config --get remote.origin.url', { cwd: localGitRootDir, encoding: 'utf-8' }).trim();
      const match = gitRemoteOriginUrl.match(/github\.com\/(.*?)\/(.*?)\.git/);

      if (match) {
        const [localOrg, localRepo] = match.slice(1, 3);
        const localBranch = execSync('git rev-parse --abbrev-ref HEAD', { cwd: localGitRootDir, encoding: 'utf-8' }).trim();
        let localTestLiveUrl;

        if (localRepo === 'nala' || localRepo === 'janus') {
          localTestLiveUrl = MAIN_BRANCH_LIVE_URL;
        } else {
          localTestLiveUrl = LOCALHOST_URL;
        }

        if (await isBranchURLValid(localTestLiveUrl)) {
          process.env.LOCAL_TEST_LIVE_URL = localTestLiveUrl;
        }
        console.info('Git ORG      : ', localOrg);
        console.info('Git REPO     : ', localRepo);
        console.info('Local Branch : ', localBranch);
        console.info('Local Test Live URL    : ', process.env.LOCAL_TEST_LIVE_URL);
      }
    }
  } catch (error) {
    console.error(`Error => Error in setting local test URL : ${localTestLiveUrl}`);
    console.info(`Note: Local or branch test url is not valid, Exiting test execution.`);
    process.exit(1);
  }
}

async function globalSetup() {
  console.info('----Executing Global setup---------');

  if (process.env.GITHUB_ACTIONS === 'true') {
    console.info('---- Running Tests in the GitHub environment ---------');

    if (process.env.MILO_LIBS_RUN === 'true') {
      await getGitHubMiloLibsBranchLiveUrl();
    } else {
      await getGitHubPRBranchLiveUrl();
    }
  } else if (process.env.CIRCLECI) {
    console.info('---- Running Tests in the CircleCI environment ---------');
    await getCircleCIBranchLiveUrl();
  } else {
    console.info('---- Running Tests in the Local environment ---------');
    await getLocalBranchLiveUrl();
  }
}

export default globalSetup;
