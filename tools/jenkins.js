// Use "npm start -- ", "yarn start" or "node" command
// Arguments:
//  -j, --jobs,    Generate testrails yml from jobs
//
const { Request } = require('../common/support/classes/request');
const yargs = require('yargs');
const fs = require('fs');
const yaml = require('js-yaml');
const path = require('path');
const glob = require('glob');
const urljoin = require('url-join');
const { JSDOM } = require('jsdom');
const axios = require('axios');
const moment = require('moment');

const debugFolder = 'debug';

const main = async () => {
  let yargsOpts = yargs
    .options('project', { alias: 'p' })
    .options('milestone', { alias: 'm' })
    .options('jenkins', { alias: 'j' })
    .options('format', { alias: 'f' })
    .options('debug', { alias: 'd' })
    .option('exit', {
      description: 'Force exit code'
    })
    .parserConfiguration({ 'strip-aliased': true });

  // command line arguments
  let argv = yargsOpts.argv;

  // A site must be specified
  let site = argv._[0];
  if (site == undefined) {
    throw 'Please specify a site directory. e.g. acom or helpx';
  }

  // Read jenkins.yml from the specified site directory
  let jenkinsCfgPath = path.join(site, 'jenkins.yml');
  if (!fs.existsSync(jenkinsCfgPath)) {
    throw `Can't find the file: "${jenkinsCfgPath}"`;
  }

  let fileContents = fs.readFileSync(jenkinsCfgPath, 'utf8');
  let testrails = yaml.load(fileContents);

  // Command line argv overides default argv
  let argv_default = yargsOpts.parse(testrails.default.match(/(?:[^\s"']+|['"][^'"]*["'])+/g));

  argv = Object.assign(argv_default, argv);

  // A jenkins job must be specified for a site
  if (!argv.jenkins) {
    throw 'No jenkins job specified';
  }

  let jenkins = testrails[argv.jenkins];

  if (!jenkins) {
    throw `No jenkins job "${argv.jenkins}" in jenkins.yml`;
  }

  jenkins = Object.assign(jenkins, argv);

  // Set environment variables
  Object.keys(jenkins).forEach(key => {
    if (!key.match(/\$0|_/)) {
      process.env[key] = jenkins[key];
    }
  });

  let config = {
    url: jenkins.url,
  };

  if (!jenkins.jenkins === 'all') {
    // A project must be specified for a site
    if (!jenkins.project) {
      throw 'No project specified';
    }
    // A milestone must be specified for a site
    if (!jenkins.milestone) {
      throw 'No milestone specified';
    }
    // A env must be specified for a site
    if (!jenkins.envs) {
      throw 'No env job specified';
    }
    // A plan must be specified for a site
    if (!jenkins.plan) {
      throw 'No plan job specified';
    }
  }

  let localeCfgPath = path.join(site, 'config', jenkins.localeCfg);
  config.locales = yaml.load(fs.readFileSync(localeCfgPath, 'utf8'));
  config.localeDefault = jenkins.localeDefault;

  if (jenkins.format != null && jenkins.format != 'yml' && jenkins.format != 'json') {
    throw `${jenkins.format} format not supported`;
  }

  const arrPushUnqiue = (val, arr) => {
    if (arr.findIndex(x => x === val) === -1) {
      arr.push(val);
    }
  }

  const removeEmptyProp = obj => {
    return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null));
  }

  const handleLocales = locale => {
    let normalizeLocale = locale;
    if (normalizeLocale === 'none') {
      normalizeLocale = '';
    } else {
      let localeLookup = locale;
      if (normalizeLocale == null || normalizeLocale === 'default') {
        if (config.localeDefault == null || config.localeDefault === 'default') {
          localeLookup = '';
        } else {
          localeLookup = config.localeDefault;
        }
      }
      if (config.locales) {
        config.currentLocale = localeLookup;
        config.currentLocaleObj = config.locales.find(
          x => x.locale === localeLookup
        );
      }
    }
    if (!config.currentLocaleObj) {
      normalizeLocale = null;
    }
    return normalizeLocale;
  }

  const handleAkamiLocales = akamaiLocale => {
    let normalizeAkamiLocale = akamaiLocale;
    if (akamaiLocale === 'auto' && jenkins.jenkins !== 'all') {
      if (!config.locales) {
        throw 'The argument akamaiLocale or browserLocale needs a locale configuration file specified with localeCfg';
      }
      if (!config.currentLocaleObj) {
        throw `The locale "${config.currentLocale}" is not found in the locale configuration file`;
      } else {
        normalizeAkamiLocale = 'auto';
      }
    }
    return normalizeAkamiLocale;
  }

  // create entry for each locale when akamai set to auto in configuration
  const entryAkamiAuto = (entry, index) => {
    let newEntry = {};
    let newConfigs = {
      configs: {}
    };

    if (entry.configs.browsers) {
      newConfigs.configs.browsers = entry.configs.browsers;
    }

    if (entry.configs.locales) {
      newConfigs.configs.locales = [handleLocales(entry.configs.locales[index])];
      let akamai = handleAkamiLocales('auto');
      if (typeof akamai !== 'undefined') {
        newConfigs.configs.akamaiLocale = [akamai];
      }
    }

    newEntry = Object.assign({}, entry, newConfigs);

    return newEntry;
  }

  let textRailData = {
    project: jenkins.project,
    milestone: jenkins.milestone,
    envs: jenkins.envs,
    plan: jenkins.milestone + ' ' + jenkins.plan,
    entries: []
  };

  const createEntries = (jobName, jobUrl, activeConfigs, color, lastSuccessfulBuild, lastFailedBuild, lastSuccessTimeStamp, lastFailTimestamp, jobUseStatus) => {
    //console.log("Success Buil: "+)
    let entry = {};
    let browsers = [];
    let locales = [];
    let akamaiLocale = [];
    let automationIds = [];
    let akamaiAuto = false;
    let status = '';
    if (color === 'blue') {
      status = 'Passed';
    }
    if (color === 'red') {
      status = 'Failed';
    }
    if (color === 'notbuilt') {
      status = 'Not Executed';
    }
    if (jenkins.jenkins === 'all') {
      entry = {
        name: jobName,
        url: jobUrl.replace(':443', ''),
        automationIds: [],
        configs: {},
        jobStatus: status,
        lastSuccess: lastSuccessfulBuild,
        lastFail: lastFailedBuild,
        lastSuccessTime: lastSuccessTimeStamp,
        lastFailTime: lastFailTimestamp,
        jobInUse: jobUseStatus
      };
    } else {
      entry = {
        automationIds: [],
        configs: {}
      };
    }

    let tagExist = false;
    let noLocale = false;

    // loop through each active configuration entry for current sub job
    for (let activeConfig of activeConfigs) {
      let configArr = activeConfig.name.split(',');
      for (let key of configArr) {
        const value = key.split('=')[1];
        switch (key.split('=')[0]) {
          case 'Browser':
            arrPushUnqiue(value, browsers);
            break;
          case 'Locale':
          case 'Loc':
            let currentLocale = handleLocales(value);
            if (currentLocale) {
              arrPushUnqiue(currentLocale, locales);
            } else if (currentLocale === null) {
              if (jenkins.localeCfg2 && jenkins.localeDefault2) {
                let localeCfgPath2 = path.join(site, 'config', jenkins.localeCfg2);
                config.locales = yaml.load(fs.readFileSync(localeCfgPath2, 'utf8'));
                config.localeDefault = jenkins.localeDefault2;
                currentLocale = handleLocales(value);
              }
            }
            if (currentLocale === null) {
              noLocale = true;
            }
            break;
          case 'akamaiLocale':
            if (value === 'auto') {
              akamaiAuto = true;
            }
            let akamai = handleAkamiLocales(value);
            if (typeof akamai !== 'undefined') {
              arrPushUnqiue(akamai, akamaiLocale);
            }
            break;
          case 'Tag':
            tagExist = true;
            arrPushUnqiue(value.substring(1, value.length), automationIds);
            break;
        }
        if (noLocale) {
          break;
        }
      }
      // locale is specified in jenkins, but not found in config file.
      if (noLocale && jenkins.jenkins !== 'all') {
        throw `The locale "${config.currentLocale}" is not found in the locale configuration file"`;
      } else if (noLocale && jenkins.jenkins === 'all' && jenkins.debug) {
        console.log(`The locale "${config.currentLocale}" is not found in the locale configuration file, skipping "${jobName}"`);
        break;
      }
    }

    if (!tagExist && jenkins.jenkins !== 'all') {
      throw `No tags specified in "${jobName}"`;
    } else if (!tagExist && !noLocale && jenkins.jenkins === 'all' && jenkins.debug) {
      console.log(`No tags specified in "${jobName}"`);
    }

    if (automationIds.length) {
      entry.automationIds = automationIds;
    }
    if (browsers.length) {
      entry.configs.browsers = browsers;
    }
    if (locales.length) {
      entry.configs.locales = locales;
    }
    if (akamaiLocale.length) {
      entry.configs.akamaiLocale = akamaiLocale;
    }

    if (!noLocale) {
      if (akamaiAuto && jenkins.jenkins !== 'all') {
        entry.configs.locales.forEach((locale, index) => {
          let newEntry = entryAkamiAuto(entry, index);
          textRailData.entries.push(newEntry);
        });
      } else {
        textRailData.entries.push(entry);
      }
    }

    config.locales = yaml.load(fs.readFileSync(localeCfgPath, 'utf8'));
    config.localeDefault = jenkins.localeDefault;
  }

  const jenkinsWriteToFile = (data) => {
    let outputFormat = '.yml';
    let outputFile = jenkins.testrailCfg;
    if (jenkins.format != null) {
      outputFile = outputFile.replace(outputFormat, '.' + jenkins.format);
    }
    let outputDir = 'testrail';
    let outputData = yaml.dump(data, {
      'noRefs': true
    });
    let outputOption = 'utf8';

    if (jenkins.format === 'json') {
      outputDir = 'platform';
      outputData = JSON.stringify(data, null, 2);
    }

    let outputDirPath = path.join(site, outputDir);
    if (!fs.existsSync(outputDirPath)) {
      fs.mkdirSync(outputDirPath, { recursive: true });
    }
    let outputFilePath = path.join(outputDirPath, outputFile);
    try {
      fs.writeFileSync(outputFilePath, outputData, outputOption);
      console.log(`"${outputFile}" generated successfully`);
    } catch (error) {
      throw `Problem writing ${outputFile}: ${error.message}`;
    }
  }

  const jenkinsJson = await Request.getJson(config.url, {});

  const getJenkinsJobs = (subJobs) => {
    let allJson = [];
    let jenkinsSubJobs = [];
    let jenkinsJobLastSuccess = [];
    let jenkinsJobLastFail = [];
    let jenkinsLastBuild = [];
    subJobs.forEach(job => {
      if (jenkins.excludeJobs && jenkins.includeJobs) {
        throw `Cannot have both include and exclude jobs for "${jenkins.jenkins}"`;
      }
      let jobUrl = job.url.replace(':443', '');
      if (jenkins.excludeJobs || jenkins.includeJobs) {
        if ((jenkins.excludeJobs && !jenkins.excludeJobs.includes(job.name)) ||
          (jenkins.includeJobs && jenkins.includeJobs.includes(job.name))) {
          jenkinsSubJobs.push(`${jobUrl}api/json`);
          jenkinsJobLastFail.push(`${jobUrl}lastFailedBuild/api/json`);
          jenkinsJobLastSuccess.push(`${jobUrl}lastSuccessfulBuild/api/json`);
          jenkinsLastBuild.push(`${jobUrl}lastBuild/api/json`);
        }
      } else {
        jenkinsSubJobs.push(`${jobUrl}api/json`);
        jenkinsJobLastFail.push(`${jobUrl}lastFailedBuild/api/json`);
        jenkinsJobLastSuccess.push(`${jobUrl}lastSuccessfulBuild/api/json`);
        jenkinsLastBuild.push(`${jobUrl}lastBuild/api/json`);
      }
    });
    allJson.push(jenkinsSubJobs);
    allJson.push(jenkinsJobLastSuccess);
    allJson.push(jenkinsJobLastFail);
    allJson.push(jenkinsLastBuild);
    return allJson;
  }

  const processJenkinsJson = (jenkinsJson, jenkinsJobLastSuccess, jenkinsJobLastFail, jenkinsLastBuild) => {
    // loop through each sub job
    jenkinsJson.forEach(jenkinsSubJob => {
      if (!jenkinsSubJob.activeConfigurations) {
        // non matrix job
        let activeConfigurations = [];
        const dom = new JSDOM(jenkinsSubJob.description);
        const configRows = dom.window.document.querySelectorAll('table.activeConfigurations td');
        configRows.forEach(configRow => {
          if (configRow.textContent) {
            let currentConfig = { name: configRow.textContent };
            activeConfigurations.push(currentConfig);
          }
        });
        jenkinsSubJob.activeConfigurations = activeConfigurations;
      }
      if (jenkinsSubJob.name && jenkinsSubJob.activeConfigurations && jenkinsSubJob.activeConfigurations.length > 0) {
        config.currentSubJob = jenkinsSubJob.name;
        let lastSuccessfulBuild = '';
        let lastFailedBuild = '';
        let lastBuild = '';
        let lastSuccessTimeStamp = '';
        let lastFailTimestamp = '';
        let lastBuildTimestamp = '';
        let lastBuildDate = '';
        let lastBuildDiffInDays = 0;
        let jobUseStatus = '';
        //Get last sucess and fail timestamp
        jenkinsJobLastSuccess.forEach(eachJobLastSuccess => {
          if (eachJobLastSuccess.url.includes(jenkinsSubJob.url)) {
            lastSuccessTimeStamp = convertEpochToSpecificTimezone(eachJobLastSuccess.timestamp, -7); //adding offset to get time in PST
          }
        });
        jenkinsJobLastFail.forEach(eachJobLastFailure => {
          if (eachJobLastFailure.url.includes(jenkinsSubJob.url)) {
            lastFailTimestamp = convertEpochToSpecificTimezone(eachJobLastFailure.timestamp, -7); //adding offset to get time in PST
          }
        });
        jenkinsLastBuild.forEach(eachJobLastBuild => {
          if (eachJobLastBuild.url.includes(jenkinsSubJob.url)) {
            lastBuildTimestamp = convertEpochToSpecificTimezone(eachJobLastBuild.timestamp, -7); //adding offset to get time in PST
          }
        });               
        let currentDate = new Date(new Date().toDateString());
        //Get last success and fail build numbers
        if (jenkinsSubJob["lastSuccessfulBuild"] != null) {
          lastSuccessfulBuild = jenkinsSubJob["lastSuccessfulBuild"]["url"];
        }
        if (jenkinsSubJob["lastFailedBuild"] != null) {
          lastFailedBuild = jenkinsSubJob["lastFailedBuild"]["url"];
        }
        if (jenkinsSubJob["lastBuild"] != null) {
          lastBuild = jenkinsSubJob["lastBuild"]["url"];
          lastBuildDate = getTheDateWithoutTime(lastBuildTimestamp);
        }
        //code to check if the jenkins job has been executed in last 90 days or not
        if(lastBuildDate != ''){
          lastBuildDiffInDays = moment(currentDate).diff(moment(lastBuildDate), 'days');;
        }
        if(lastBuildDiffInDays > 90){
          jobUseStatus = 'Outdated';
        }
        else if(jenkinsSubJob.color === 'notbuilt'){
          jobUseStatus = 'Not Used';
        }   
        else{
          jobUseStatus = 'In Use';
        }
        createEntries(jenkinsSubJob.name, jenkinsSubJob.url, jenkinsSubJob.activeConfigurations, jenkinsSubJob.color, lastSuccessfulBuild, lastFailedBuild, lastSuccessTimeStamp, lastFailTimestamp, jobUseStatus);
      }
    });
  }

  // main jenkins job listing
  if (jenkinsJson.jobs && jenkinsJson.jobs.length > 0) {
    let allUrlJson = getJenkinsJobs(jenkinsJson.jobs);
    let jenkinsSubJobUrls = allUrlJson[0];
    let jenkinsJobLastSuccessUrls = allUrlJson[1];
    let jenkinsJobLastFailUrls = allUrlJson[2];
    let jenkinsJobLastBuildUrls = allUrlJson[3];
    // sub jenkins job listing
    if (jenkinsSubJobUrls && jenkinsSubJobUrls.length > 0) {
      let jenkinsJson = [];
      let jobLastSuccess = [];
      let jobLastFailure = [];
      let jobLastBuild = [];
      for (let url of jenkinsSubJobUrls) {
        jenkinsJson.push(await Request.getJson(url, {}));
      }
      if (jenkinsJobLastSuccessUrls && jenkinsJobLastSuccessUrls.length > 0) {
        for (let jobSuccess of jenkinsJobLastSuccessUrls) {
          try {
            let respSuccess = await axios.get(jobSuccess);
            if (respSuccess.status != 404) {
              jobLastSuccess.push(await Request.getJson(jobSuccess, {}));
            }
          } catch (error) {
            console.log(`Error HTTP Response for ${jobSuccess}`);
          }

        }
      }
      if (jenkinsJobLastFailUrls && jenkinsJobLastFailUrls.length > 0) {
        for (let jobFailure of jenkinsJobLastFailUrls) {
          try {
            let respFailure = await axios.get(jobFailure);
            if (respFailure.status != 404) {
              jobLastFailure.push(await Request.getJson(jobFailure, {}));
            }
          } catch (error) {
            console.log(`Error HTTP Response for ${jobFailure}`);
          }

        }
      }
      if (jenkinsJobLastBuildUrls && jenkinsJobLastBuildUrls.length > 0) {
        for (let jobBuild of jenkinsJobLastBuildUrls) {
          try {
            let respLastBuild = await axios.get(jobBuild);
            if (respLastBuild.status != 404) {
              jobLastBuild.push(await Request.getJson(jobBuild, {}));
            }
          } catch (error) {
            console.log(`Error HTTP Response for ${jobBuild}`);
          }

        }
      }
      if (jenkinsJson && jenkinsJson.length > 0) {
        processJenkinsJson(jenkinsJson, jobLastSuccess, jobLastFailure, jobLastBuild);
      }
    }
  };

  if (textRailData.entries.length) {
    if (jenkins.jenkins === 'all') {
      delete textRailData.project;
      delete textRailData.milestone;
      delete textRailData.envs;
      delete textRailData.plan;
    }
    jenkinsWriteToFile(textRailData);
  }
};

function convertEpochToSpecificTimezone(timeEpoch, offset) {
  let d = new Date(timeEpoch);
  let utc = d.getTime() + (d.getTimezoneOffset() * 60000);  //This converts to UTC 00:00
  let newDate = new Date(utc + (3600000 * offset));
  return newDate.toLocaleString();
}

function getTheDateWithoutTime(dateTime){
  let tempDate = new Date(dateTime);
  let date = new Date(tempDate.toDateString());
  return date;
}


main().catch(error => {
  console.log(error);
  process.exit(1);
});
