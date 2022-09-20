const fs = require('fs');
const JiraApi = require('jira-client');
const yargs = require('yargs');
const axios = require('axios');
const xml2js = require('xml2js');

/**
 * Search and get all issues
 * @param {*} jira
 * @param {String} searchString
 * @param {Object} optional
 */
async function searchJira(jira, searchString, options) {
  options = options || {};
  options.startAt = 0;

  let issues = [];
  while (true) {
    let result = await jira.searchJira(searchString, options);
    options.startAt += result.issues.length;
    issues.push(...result.issues);
    if (issues.length >= result.total) {
      break;
    }
  }
  return issues;
}

const teams = [
  {
    name: 'Slytherin', // Jira team
    site: 'dc' // Platform-UI site
  },
  {
    name: 'Inception, Warriors, Yugo', // Jira team
    site: 'acom' // Platform-UI site
  },
  {
    name: 'Javelin', // Jira team
    site: 'javelin' // Platform-UI site
  },
  {
    name: 'Gryffindor', // Jira team
    site: 'ec' // Platform-UI site
  },
  {
    name: 'Brahmos, Bhoomi', // Jira team
    site: 'cc' // Platform-UI site
  },
  {
    name: 'Dexter', // Jira team
    site: 'dexter' // Platform-UI site
  },
  {
    name: 'Eurovision', // Jira team
    site: 'feds' // Platform-UI site
  }
];

/**
 * The main function
 */
async function main() {
  let yargsOpts = yargs
    .options('site', {
      alias: 's',
      required: true,
      description: 'Platform-UI site'
    })
    .options('credentials', {
      alias: 'c',
      description:
        'Jira credentials or use environment variable JIRACREDENTIALS'
    })
    .options('label', {
      alias: 'la',
      required: true,
      description: 'Jira label'
    })
    .options('mode', {
      alias: 'm',
      required: true,
      description: 'AEM Mode'
    })
    .options('component', {
      alias: 'co',
      description: 'Jira component'
    })
    .options('testType', {
      alias: 't',
      description: 'Jira test type'
    })
    .options('jenkinsJob', {
      alias: 'j',
      description: 'Jenkins Job'
    })
    .options('labelOperator', {
      alias: 'lo',
      description: 'All or Any for Jira labels',
      required: true,
    })
    .parserConfiguration({ 'strip-aliased': true });

  let argv = yargsOpts.argv;

  let cred = process.env.JIRACREDENTIALS;

  if (argv.credentials) {
    cred = argv.credentials;
  }

  let team = teams.find(x => x.site === argv.site);
  let label = '';
  let component = '';
  let testType = '';
  let appendJQL = '';
  let mode = argv.mode;
  if (argv.component) {
    component = argv.component;
  }
  if (argv.testType) {
    testType = argv.testType;
  }
  if (argv.jenkinsJob) {
    jenkinsJob = argv.jenkinsJob;
  }

  if ((component === ('' || true) || component.includes('$'))&& (testType != '' && !testType.includes('$'))) {
    appendJQL = `AND "Test Type" in (${testType})`;
  } else if ((component != '' && !component.includes('$')) && (testType === ('' || true) || testType.includes('$'))) {
    appendJQL = `AND component in (${component})`;
  } else if ((component != '' && !component.includes('$')) && (testType != '' && !testType.includes('$'))) {
    appendJQL = `AND component in (${component}) AND "Test Type" in (${testType})`;
  }

  if(argv.labelOperator.toUpperCase() === 'ALL'){
    let allLabels = argv.label.split(',');
    let labelQuery = [];
    if(allLabels.length>5){
      console.log("Please pass maximum of 5 labels")
      process.exit(1);
    }
    else{
      labelQuery.push('(');
      for(let i=0;i<=allLabels.length - 1;i++){
        labelQuery.push(`labels = ${allLabels[i]}`);
        if(i<allLabels.length - 1){
          labelQuery.push(' and ');
        }
      }
      labelQuery.push(')');
      label = labelQuery.join('');
    }
  }
  else if(argv.labelOperator.toUpperCase() === 'ANY'){
    label = `labels in(${argv.label})`;
  }

  if (!team) {
    console.log(`Invalid Platform-UI site "${argv.site}"`);
    process.exit(1);
  }
  // get test cases from jira

  let host = 'jira.corp.adobe.com';
  let creds = cred.split(':');

  let jira = new JiraApi({
    protocol: 'https',
    host: host,
    username: creds[0],
    password: creds[1],
    apiVersion: '2',
    strictSSL: true
  });

  let testCases = [];
  let testCasesMap = {};
  let jql = '';
  if (
    team.site == 'dc' ||
    team.site == 'javelin' ||
    team.site == 'ec' ||
    team.site == 'dexter'
  ) {
    jql = `project=MWPW and type=Test and status not in (Inactive) and team=${team.name} and "Test Automation Status" = Automated and ((labels not in(Tool) or labels is EMPTY) and ${label} and labels in (${mode})) ${appendJQL}`;
  } else if (team.site == 'acom') {
    jql = `project=MWPW and type=Test and status not in (Inactive) and team in (${team.name}) and "Test Automation Status" = Automated and ((labels not in(CCT-HAWKS) or labels is EMPTY) and ${label} and labels in (${mode})) ${appendJQL}`;
  } else if (team.site == 'cc') {
    jql = `project=MWPW and type=Test and status not in (Inactive) and team in (${team.name}) and "Test Automation Status" = Automated and ((labels not in(Yugo-Titan) or labels is EMPTY) and ${label} and labels in (${mode})) ${appendJQL}`;
  } else if (team.site == 'feds') {
    jql = `project=MWPW and type=Test and status not in (Inactive) and team in (${team.name}) and "Test Automation Status" = Automated and ((labels not in(Java) or labels is EMPTY) and ${label} and labels in (${mode})) ${appendJQL}`;
  }
  console.log('JQL: ' + jql);
  let fields = ['key', 'labels', 'status', 'description'];
  try {
    testCases = await searchJira(jira, jql, { fields });
    testCases.forEach(x => (testCasesMap[x.key] = x));
    let issueKeys = Object.keys(testCasesMap);
    let descTags = [];
    issueKeys.map(key => descTags.push(getDescTag(testCasesMap[key])));
    console.log('Desc tags: ' + descTags);
    if(descTags.length === 0){
      console.log("No test cases found based on the parameters passed")
      process.exit(1);
    }
    //issueKeys = issueKeys.map(i => '@' + i);
    updateJenkinsJob(descTags, label, team.site, component, testType,jenkinsJob);
  } catch (err) {
    console.log('Error when searchJira: ' + err.message);
  }
}

let jenkinsToken = process.env.JENKINSTOKEN;
// your own ${adobeEmail}:${jenkinsToken} and then converted to Base64
const username_token = Buffer.from(jenkinsToken).toString('base64');

/**
 * @description This function updates the jenkins job configuration
 * @param {Array} automationIds automatiods ids found based on jira label passed
 * @param {string} label jira label
 * @param {string} site platform-ui site
 */
async function updateJenkinsJob(
  automationIds,
  label,
  site,
  component,
  testType,
  jenkinsJob
) {
  let jenkinsDetail = getJenkinsJob(site,jenkinsJob);
  const jenkinsUrl = jenkinsDetail.jenkinsLink;
  const job = jenkinsDetail.jenkinsJob;
  try {
    const parser = new xml2js.Parser();
    const builder = new xml2js.Builder({
      xmldec: { version: '1.1', encoding: 'UTF-8' }
    });

    // get and parse the xml
    let xmlData = null;
    const { data } = await axios({
      method: 'get',
      url: `${jenkinsUrl}/job/${job}/config.xml`,
      headers: {
        Authorization: `Basic ${username_token}`
      }
    });
    const xmlString = data.trim().replace('\ufeff', '');

    xmlData = await parser.parseStringPromise(xmlString);

    const axes = xmlData['matrix-project'].axes[0];

    // adding configuration
    const configurations = axes['hudson.matrix.TextAxis'][1].values;
    //Deleting the previous tags configured in the jenkins job before adding new
    if (configurations) {
      configurations.pop();
    }
    let tags = getTags(automationIds);
    configurations.push(tags);

    // adding description to the job
    const desc = xmlData['matrix-project'].description;
    //deleting the previous description of the jenkins job before updating it
    if (desc) {
      desc.pop();
    }
    let description = getDescription(label, component, testType);
    desc.push(description);

    // build and send the configuration
    const finalXml = builder.buildObject(xmlData);

    const { status } = await axios({
      method: 'post',
      url: `${jenkinsUrl}/job/${job}/config.xml`,
      headers: {
        'Content-Type': 'text/xml',
        Authorization: `Basic ${username_token}`
      },
      data: finalXml
    });
    console.log(`update result: ${status}`);
    if (status != 200) throw new Error(`Status not 200 but ${status}`);
  } catch (err) {
    err += `Err when building and sending new xml for job ${job}`;
    console.log("Error: "+err);
    process.exit(1);
  }
}
/**
 * @description This function return the tags to be configured in the jenkins job
 * @param {Array} automationIds
 * @returns {object}
 */
function getTags(automationIds) {
  return automationIds.map(x => ({ string: x }));
}

/**
 * @description This function returns the description to be added to the jenkins job
 * @param {string} label
 * @param {string} component
 * @param {string} testType
 * @returns {string} description to be updated of the jenkins job
 */
function getDescription(label, component, testType) {
  let currdateTime = new Date();
  let displayComponent = '';
  let displayTestType = '';
  let pstDateTime = currdateTime.toLocaleString('en-US', {
    timeZone: 'America/Los_Angeles'
  });
  if (component === undefined || component === true || component.includes('$')) {
    displayComponent = 'Not Provided';
  } else {
    displayComponent = component;
  }
  if (testType === undefined || testType === true || testType.includes('$')) {
    displayTestType = 'Not Provided';
  } else {
    displayTestType = testType;
  }
  let description = `<b>Note: </b>This job is configured through an automation script. It was configured last on ${pstDateTime}(Pacific Standard Time) for jira labels <b>${label}</b>, Component <b>${displayComponent}</b> and Test Type <b>${displayTestType}</b>. <br/><br/>Component and Test Type are not mandatory fields so <b>Not Provided</b> means they were not passed as parameter`;
  return description;
}

/**
 * @description This function returns the desc tag for the jira id
 * @param {object} issue
 * @returns {string} desc tag
 */
function getDescTag(issue) {
  let descTag = issue.fields.description.match(/@desc-\S+/g);
  return String(descTag).trim();
}

/**
 * @description This function finds all the details of jenkins job to be updated based on site passed.
 * @param {string} site
 * @returns {object} jenkins details
 */
 function getJenkinsJob(site, jenkinsJob) {
  let jenkinsJobDetails = {};
  if (site === 'dexter') {
    jenkinsJobDetails.jenkinsLink = 'https://cc.ci.corp.adobe.com:8443';
    if (jenkinsJob != '' && jenkinsJob != true && !jenkinsJob.includes('$')) {
      jenkinsJobDetails.jenkinsJob = jenkinsJob;
    } else {
      jenkinsJobDetails.jenkinsJob = 'DT01 - Test On Demand Tool';
    }
  } else if (site === 'dc') {
    jenkinsJobDetails.jenkinsLink = 'https://dc.ci.corp.adobe.com';
    if (jenkinsJob != '' && jenkinsJob != true && !jenkinsJob.includes('$')) {
      jenkinsJobDetails.jenkinsJob = jenkinsJob;
    } else {
      jenkinsJobDetails.jenkinsJob = 'DT01 - Feature Job'; //put the jenkins job name created for dc
    }
  } else if (site === 'acom') {
    jenkinsJobDetails.jenkinsLink = 'https://acom.ci.corp.adobe.com:8443';
    if (jenkinsJob != '' && jenkinsJob != true && !jenkinsJob.includes('$')) {
      jenkinsJobDetails.jenkinsJob = jenkinsJob;
    } else {
      jenkinsJobDetails.jenkinsJob = ''; //put the jenkins job name created for titan
    }
  } else if (site === 'javelin') {
    jenkinsJobDetails.jenkinsLink = 'https://cc.ci.corp.adobe.com:8443';
    if (jenkinsJob != '' && jenkinsJob != true && !jenkinsJob.includes('$')) {
      jenkinsJobDetails.jenkinsJob = jenkinsJob;
    } else {
      jenkinsJobDetails.jenkinsJob = 'DT01 - Javelin Author Tests';
    }
  }
  return jenkinsJobDetails;
}


main().catch(err => {
  console.error(err);
  process.exit(1);
});
