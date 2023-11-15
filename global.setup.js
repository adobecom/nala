import { exit } from 'process';

const { execSync } = require('child_process');
const { isBranchURLValid } = require('./libs/baseurl.js');
const axios = require('axios');

async function globalSetup() {
  console.info('----Executing Global setup---------');
  
  let prBranchLiveUrl;
  let localTestLiveUrl;
  let localOrg; 
  let localRepo;
  let prNumber

  // Check if the code is running in a GitHub CI/CD environment
  if (process.env.GITHUB_ACTIONS === 'true') {
    console.info('---- Running Tests in the GitHub ---------');
    
    // get the pr number 
    const prReference = process.env.GITHUB_REF;
    prNumber = prReference.split('/')[2];

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

    try {
      // Construct the pr branch URL
      if (toRepoName === 'nala' || toRepoName === 'janus') {
        prBranchLiveUrl = `https://main--milo--adobecom.hlx.live`;
      } else {
        prBranchLiveUrl = `https://${prBranch}--${prFromRepoName}--${prFromOrg}.hlx.live`;
      }

      // Validate the pr branch URL by making an HTTP request
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
      console.info(`Note : PR branch test url  ${prBranchLiveUrl} is not valid, Exiting test execution.`);
      process.exit(1);
    }  
  } else if (process.env.CIRCLECI) {
    console.info('---- Running Tests in the CircleCI environment ---------');

    prBranchLiveUrl = 'https://milo.stage.adobe.com';
    
    if (await isBranchURLValid(prBranchLiveUrl)) {
      process.env.PR_BRANCH_LIVE_URL = prBranchLiveUrl;
    }

  } else {
    
    console.info('---- Running Tests in the Local environment ---------');
    
    try {
      // Run 'git rev-parse --show-toplevel' to get the root directory of the Git repository
      const localGitRootDir = execSync('git rev-parse --show-toplevel', { encoding: 'utf-8' }).trim();

      if (localGitRootDir) {
        // Get the repository and organization/owner name from the Git remote URL
        const gitRemoteOriginUrl = execSync('git config --get remote.origin.url', { cwd: localGitRootDir, encoding: 'utf-8' }).trim();
        const match = gitRemoteOriginUrl.match(/github\.com\/(.*?)\/(.*?)\.git/);
        console.info('Git Local Remote Origin : ', gitRemoteOriginUrl );
        if (match) {
          localOrg = match[1];
          localRepo = match[2];

          console.info('Git ORG      : ', localOrg );
          console.info('Git REPO     : ', localRepo );

          // get the current local branch name
          const localBranch = execSync('git rev-parse --abbrev-ref HEAD', { cwd: localGitRootDir, encoding: 'utf-8' }).trim();
          console.info('Local Branch : ', localBranch );

          if ( localRepo === 'nala' || localRepo === 'janus'){
            localTestLiveUrl = `https://main--milo--adobecom.hlx.live`;
          } else {
            localTestLiveUrl = `http://localhost:3000`;
          }

          // Validate the pr branch URL by making an HTTP request
          if ( await isBranchURLValid(localTestLiveUrl)){
            process.env.LOCAL_TEST_LIVE_URL = localTestLiveUrl;
          }
          console.info('Local Test Live URL    : ', process.env.LOCAL_TEST_LIVE_URL );
        }
      } 
    } catch (error) {
      console.error(`Error => Error in setting local test URL : ${localTestLiveUrl}`)
      console.info(`Note : Local or branch test url  ${localTestLiveUrl} is not valid, Exiting test execution.`);
      process.exit(1);
    }
  }
}
export default globalSetup;
