const fs = require('fs');
const yaml = require('js-yaml');
const axios = require('axios');
const yargs = require('yargs');
const moment = require('moment');

const jenkinsToken = process.env.JENKINSTOKEN;

/**
 * The main function
 */
async function main() {
  let yargsOpts = yargs
    .options('jenkins', {
      alias: 'j',
      required: true,
      description: 'Jenkins server'
    })
    .parserConfiguration({ 'strip-aliased': true });

  let argv = yargsOpts.argv;
  let jenkins = argv.jenkins;
  let jenkinsUrl = `${jenkins}/api/json`;
  let res = await axios.get(jenkinsUrl);
  let jobs = res.data.jobs;
  let jenkinsReport = {
    entries: []
  };
  for (let job of jobs) {
    let jobUrl = job.url;
    let res = await axios.get(`${jobUrl}api/json`);
    let jobName = res.data.displayName;
    let configs = res.data.activeConfigurations;
    let browsers = new Set();
    let tags = new Set();
    let locales = new Set();
    let akamaiLocales = new Set();
    if (configs !== undefined) {
      for (let config of configs) {
        let params = config.name.split(',');
        params = params.map(x => x.split('='));
        for (let param of params) {
          if (param[0] === 'Browser') {
            browsers.add(param[1]);
          } else if (param[0] === 'Tag') {
            tags.add(param[1].slice(1));
          } else if (param[0] === 'Locale') {
            locales.add(param[1]);
          } else if (param[0] === 'akamaiLocale') {
            akamaiLocales.add(param[1]);
          }
        }
      }
    }
    let lastFailedData = {};
    let lastSuccessData = {};
    let lastBuildData = {};
    let lastFailTimestamp = '';
    let lastSuccessTimeStamp = '';
    let lastBuildTimestamp = '';
    let lastSuccessfulBuild = '';
    let lastFailedBuild = '';
    let lastBuildDate = '';
    let jobUseStatus = '';
    let lastBuildDiffInDays = '';

    try {
      let respFailure = await axios.get(
        `${jobUrl}lastFailedBuild/api/json`,
        {}
      );
      if (respFailure.status != 404) {
        lastFailedData = respFailure.data;
        lastFailTimestamp = convertEpochToSpecificTimezone(
          lastFailedData.timestamp,
          -7
        ); //adding offset to get time in PST
      }
    } catch (error) {
      console.log(`Error HTTP Response for ${jobUrl}lastFailedBuild/api/json`);
    }
    try {
      let respSuccess = await axios.get(
        `${jobUrl}lastSuccessfulBuild/api/json`
      );
      if (respSuccess.status != 404) {
        lastSuccessData = respSuccess.data;
        lastSuccessTimeStamp = convertEpochToSpecificTimezone(
          lastSuccessData.timestamp,
          -7
        ); //adding offset to get time in PST
      }
    } catch (error) {
      console.log(
        `Error HTTP Response for ${jobUrl}lastSuccessfulBuild/api/json`
      );
    }
    try {
      let respLastBuild = await axios.get(`${jobUrl}lastBuild/api/json`);
      if (respLastBuild.status != 404) {
        lastBuildData = respLastBuild.data;
        lastBuildTimestamp = convertEpochToSpecificTimezone(
          lastBuildData.timestamp,
          -7
        ); //adding offset to get time in PST
      }
    } catch (error) {
      console.log(`Error HTTP Response for ${jobUrl}lastBuild/api/json`);
    }

    //Get last success and fail build numbers
    let currentDate = new Date(new Date().toDateString());
    if (res.data.lastSuccessfulBuild != null) {
      lastSuccessfulBuild = res.data.lastSuccessfulBuild['url'];
    }
    if (res.data.lastFailedBuild != null) {
      lastFailedBuild = res.data.lastFailedBuild['url'];
    }
    if (res.data.lastBuild != null) {
      lastBuild = res.data.lastBuild['url'];
      lastBuildDate = getTheDateWithoutTime(lastBuildTimestamp);
    }
    //code to check if the jenkins job has been executed in last 90 days or not
    if (lastBuildDate != '') {
      lastBuildDiffInDays = moment(currentDate).diff(
        moment(lastBuildDate),
        'days'
      );
    }

    if (lastBuildDiffInDays > 90) {
      jobUseStatus = 'Outdated';
    } else if (res.data.color === 'notbuilt') {
      jobUseStatus = 'Not Used';
    } else {
      jobUseStatus = 'In Use';
    }
    let status = '';
    if (res.data.color === 'blue') {
      status = 'Passed';
    }
    if (res.data.color === 'red') {
      status = 'Failed';
    }
    if (res.data.color === 'notbuilt') {
      status = 'Not Executed';
    }
    try {
      jenkinsView = await getViews(jenkins, jobName);
    } catch (error) {
      throw error;
    }

    let entry = {
      name: jobName,
      url: jobUrl.replace(':443', ''),
      view: jenkinsView,
      automationIds: [],
      configs: {},
      jobStatus: status,
      lastSuccess: lastSuccessfulBuild,
      lastFail: lastFailedBuild,
      lastSuccessTime: lastSuccessTimeStamp,
      lastFailTime: lastFailTimestamp,
      jobInUse: jobUseStatus
    };

    entry.automationIds = Array.from(tags);
    if (browsers.size != 0) {
      entry.configs.browsers = Array.from(browsers);
    }
    if (locales.size != 0) {
      entry.configs.locales = Array.from(locales);
    }
    if (akamaiLocales.size != 0) {
      entry.configs.akamaiLocale = Array.from(akamaiLocales);
    }
    jenkinsReport.entries.push(entry);
  }
  fs.writeFileSync(
    'all_' + jenkins.split('.')[0].replace('https://', '') + '.json',
    JSON.stringify(jenkinsReport, null, 2)
  );
}

function convertEpochToSpecificTimezone(timeEpoch, offset) {
  let d = new Date(timeEpoch);
  let utc = d.getTime() + d.getTimezoneOffset() * 60000; //This converts to UTC 00:00
  let newDate = new Date(utc + 3600000 * offset);
  return newDate.toLocaleString();
}

function getTheDateWithoutTime(dateTime) {
  let tempDate = new Date(dateTime);
  let date = new Date(tempDate.toDateString());
  return date;
}

function getViewsScript() {
  return (
    'import groovy.json.*\n' +
    'def data = [:]\n' +
    'Jenkins.instance.views.each {\n' +
    '  view ->\n' +
    '  data[view.name] = []\n' +
    '  view.items.each {\n' +
    '    item ->\n' +
    '    data[view.name].add(item.name)\n' +
    '  }\n' +
    '}\n' +
    'return new JsonBuilder(data).toString()'
  );
}

async function getViews(baseURL, jenkinsJobName) {
  let node = '(master)';
  let creds = jenkinsToken.split(':');
  let username = creds[0];
  let password = creds[1];
  let jenkinsViews = [];
  let path = `/computer/${node}/scriptText`;
  let script = getViewsScript();
  let params = new URLSearchParams();
  params.append('script', script);
  try {
    let res = await axios.post(path, params, {
      baseURL,
      auth: {
        username,
        password
      }
    });
    let jsonText = res.data.substring(8); // remove the leading "Results: "
    let views = JSON.parse(jsonText);
    for (let k in views) {
      if (views[k].includes(jenkinsJobName)) {
        if (k.toLowerCase().trim() !== 'all') {
          jenkinsViews.push(k);
        }
      }
    }
  } catch (error) {
    throw error;
  }
  return jenkinsViews;
}

main().catch(error => {
  console.log(error);
  process.exit(1);
});
