/*
 * Get the insight of the state of automation
 */

const fs = require('fs').promises;
const path = require('path');
const axios = require('axios');
const { processFeatureOutlines } = require('./feature_outline');

async function walk(dir) {
  let files = await fs.readdir(dir);
  files = await Promise.all(
    files.map(async file => {
      const filePath = path.join(dir, file);
      const stats = await fs.stat(filePath);
      if (stats.isDirectory()) return walk(filePath);
      else if (stats.isFile()) return filePath;
    })
  );

  return files.reduce((all, folderContents) => all.concat(folderContents), []);
}

const getStepDefs = async file => {
  let basename = path.basename(file);
  let stepDefs = [];
  let data = await fs.readFile(file, 'utf-8');
  let matches = data.matchAll(
    /^(Given|When|Then|And)\(\s*\/\^(.*)\$\/\s*,\s*(.*)$/gm
  );
  for (let m of matches) {
    let regex = m[2];
    let funcName = m[3].replace(')', '').replace(';', '').trim();
    let start = data.substring(
      data.indexOf(funcName + '(') + funcName.length + 1
    );
    let args = start.substring(0, start.indexOf(')'));
    stepDefs.push({
      regex: regex,
      args: args,
      source: basename
    });
  }
  return stepDefs;
};

let jenkinsJobsDataCache = {};

const getAllStepDefs = async files => {
  return Promise.all(files.map(f => getStepDefs(f)));
};

const getScenarios = async file => {
  let tempBasename = path.basename(file);
  let basename = '';
  let scenarios = [];
  let data = await fs.readFile(file, 'utf-8');
  let lines = [];
  lines = data.split(/\r\n|\r|\n/);
  let currSite = getCurrentSite(file);
  let featureFilePath = getGitLinkForFeatureFile(file, currSite);
  if (featureFilePath.includes('.outline')) {
    basename = tempBasename + '.outline';
  } else {
    basename = tempBasename;
  }
  for (let i = 0; i < lines.length; i++) {
    line = lines[i];
    let m = line.match(/^\s*(Scenario:|Scenario Outline:)\s*(.*)$/);
    if (m != null) {
      let scenario = {
        title: m[2],
        source: basename,
        sourceGitLink: featureFilePath,
        testPage: ''
      };
      let tags = lines[i - 1].trim();
      let tag = tags.match(/@MWPW-\S+/g);
      if (tag != null) {
        scenario.id = tag[0];
        scenario.idJiraLink = getJiraLink(scenario.id.replace('@', ''));
      }
      tag = tags.match(/@desc-\S+/g);
      if (tag != null) {
        scenario.desc = tag[0];
      }
      let baseUrl = getBaseUrl(currSite, scenario.desc);

      //get jenkins job details
      let jenkinsJobsData = [];
      let jenkinsJobs = [];
      try {
        if (currSite == 'dc') {
          if (!jenkinsJobsDataCache.dc) {
            jenkinsJobsDataCache.dc = await axios.get(
              'https://acom.ci.corp.adobe.com/job/JenkinsJob_Report/lastSuccessfulBuild/artifact/dc/platform/all.json'
            );
          }
          jenkinsJobsData = jenkinsJobsDataCache.dc;
        } else if (
          currSite == 'acom' ||
          currSite == 'helpx' ||
          currSite == 'common'
        ) {
          if (!jenkinsJobsDataCache.acom) {
            jenkinsJobsDataCache.acom = await axios.get(
              'https://acom.ci.corp.adobe.com/job/JenkinsJob_Report/lastSuccessfulBuild/artifact/acom/platform/all.json'
            );
          }
          jenkinsJobsData = jenkinsJobsDataCache.acom;
        } else if (currSite == 'ec') {
          if (!jenkinsJobsDataCache.ec) {
            jenkinsJobsDataCache.ec = await axios.get(
              'https://acom.ci.corp.adobe.com/job/JenkinsJob_Report/lastSuccessfulBuild/artifact/ec/platform/all.json'
            );
          }
          jenkinsJobsData = jenkinsJobsDataCache.ec;
        } else if (currSite == 'dexter') {
          if (!jenkinsJobsDataCache.dexter) {
            jenkinsJobsDataCache.dexter = await axios.get(
              'https://acom.ci.corp.adobe.com/job/JenkinsJob_Report/lastSuccessfulBuild/artifact/dexter/platform/all.json'
            );
          }
          jenkinsJobsData = jenkinsJobsDataCache.dexter;
        }else if (
          currSite == 'helpx'
        ) {
          if (!jenkinsJobsDataCache.helpx) {
            jenkinsJobsDataCache.helpx = await axios.get(
              'https://helpx.ci.corp.adobe.com/job/JenkinsJob_Report/lastSuccessfulBuild/artifact/helpx/platform/all.json'
            );
          }
          jenkinsJobsData = jenkinsJobsDataCache.helpx;
        } else if (
          currSite == 'cc' ||
          currSite == 'feds_new'
        ) {
          if (!jenkinsJobsDataCache.cc) {
            jenkinsJobsDataCache.cc = await axios.get(
              'https://hawks.ci.corp.adobe.com/job/Jenkins_Job_Report/lastSuccessfulBuild/artifact/all_hawks.json'
            );
            }
          jenkinsJobsData = jenkinsJobsDataCache.cc;

        } 
        if (!jenkinsJobsData.data) {
          jenkinsJobsData.data = { entries: [] };
        }
        let entriesJenkins = jenkinsJobsData.data['entries'];
        jenkinsJobs = [];
        for (let s = 0; s < entriesJenkins.length; s++) {
          let entryJenkins = entriesJenkins[s];
          if (
            entryJenkins.automationIds != undefined &&
            scenario.desc != undefined
          ) {
            if (
              entryJenkins.automationIds.includes(
                scenario.desc.replace('@', '')
              )
            ) {
              if (
                !jenkinsJobs.includes(
                  '[' + entryJenkins.name + '|' + entryJenkins.url + '] \n'
                )
              ) {
                jenkinsJobs.push(
                  '[' + entryJenkins.name + '|' + entryJenkins.url + '] \n'
                );
              }
            }
          }
        }
      } catch (err) {
        console.log(err);
      }
      scenario.jenkinsJobs =
        'Jenkins Jobs Urls: \n' + jenkinsJobs.toString().replace(/,/g, ' ');
      if (scenario.jenkinsJobs === 'Jenkins Jobs Urls: \n') {
        scenario.jenkinsJobs = '';
      }
      let s = lines[parseInt(i) + 1].trim();
      let sPlusOne = lines[parseInt(i) + 2].trim();

      //Find test pages for scenario outline
      if (m.includes('Scenario Outline:')) {
        let number = 2;
        let start = i;
        for (j = ++start; j < lines.length; j++) {
          lineBelow = lines[j];
          let table = '';
          let t = lineBelow.match(/Examples:/g);
          if (t != null) {
            while (lines[j + number].trim().includes('|')) {
              table = lines[j + number] + table;
              number += 1;
              if (lines[j + number] == undefined) {
                break;
              }
            }
            let page = table.split(' ');
            for (let k in page) {
              if (page[k].includes('.html') | page[k].includes('.com')) {
                let url = '';
                if (page[k].includes('https')) {
                  url = page[k];
                } else {
                  url = baseUrl + page[k];
                }
                scenario.testPage += url + ' ';
              } else if (getTestPage(page[k]) != undefined) {
                scenario.testPage = getTestPage(page[k]);
              } else if (page[k].includes('/') && scenario.testPage == '') {
                scenario.testPage = baseUrl;
              }
            }
            break;
          }
        }
      } //Scenario outline section ends
      //Find test pages for scenario
      //1. In the fetaure file statement
      else if (lines[parseInt(i) + 1].includes('.html')) {
        let page = '';
        page = lines[parseInt(i) + 1].split(' ');
        for (let k in page) {
          if (page[k].includes('.html')) {
            let url = page[k].replace(/"|'/g, '');
            scenario.testPage = baseUrl + url;
          }
        }
      }
      //2.In the step file
      else {
        let step = s.substr(s.indexOf(' ')).trim();
        let testpage = '';
        let result = await getStepDefOfCurrProj(currSite);
        let allStepDefLines = result;
        let stepFunctDef = '';
        for (let o in allStepDefLines) {
          stepDefLine = allStepDefLines[o];
          if (stepDefLine.includes(step)) {
            while (!allStepDefLines[o].trim().includes('}')) {
              stepFunctDef = allStepDefLines[o] + ' ' + stepFunctDef;
              o = parseInt(o) + 1;
              if (allStepDefLines[o] == undefined) {
                break;
              }
            }
          }
        }
        let stepLines = stepFunctDef.split(';');
        if (stepLines.includes('.html')) {
          for (let k in stepLines) {
            if (stepLines[k].includes('open(')) {
              let url = stepLines[k].slice(
                parseInt(stepLines[k].indexOf('open(')) + 5,
                stepLines[k].lastIndexOf(')')
              );
              if (url.includes('.html')) {
                testpage = url.replace(/'|"/g, '');
                scenario.testPage = baseUrl + testpage;
              }
            }
          }
        } //step file check ends
        //In page class
        else {
          let pageFunctDef = '';
          for (let r in stepLines) {
            if (stepLines[r].includes('this.page = new')) {
              let pageClassName = stepLines[r]
                .replace(/this.page = new|;|\(\)/g, '')
                .trim();
              let result2 = await getPageClassOfCurrProj(currSite);
              let allPageClassLines = result2;
              // page in constructor
              for (let q in allPageClassLines) {
                pageClassLine = allPageClassLines[q];
                if (pageClassLine.includes(pageClassName)) {
                  while (!allPageClassLines[q].trim().includes('}')) {
                    pageFunctDef = allPageClassLines[q] + pageFunctDef;
                    q = parseInt(q) + 1;
                    if (allPageClassLines[q] == undefined) {
                      break;
                    }
                  }
                }
              }
              // page in urlPath
              for (let q in allPageClassLines) {
                pageClassLine = allPageClassLines[q];
                if (pageClassLine.includes(pageClassName)) {
                  while (!allPageClassLines[q].trim().includes('urlPath')) {
                    q = parseInt(q) + 1;
                    if (allPageClassLines[q] == undefined) {
                      break;
                    }
                  }
                  if (allPageClassLines[q] != undefined) {
                    while (!allPageClassLines[q].trim().includes('}')) {
                      pageFunctDef = allPageClassLines[q] + pageFunctDef;
                      q = parseInt(q) + 1;
                      if (allPageClassLines[q] == undefined) {
                        break;
                      }
                    }
                  }
                }
              }
            }
          }
          let pageLines = pageFunctDef.split(' ');
          for (let n in pageLines) {
            if (pageLines[n].includes('.html')) {
              let url = pageLines[n];
              testpage = url.replace(/'|"|super|,|;|\(/g, '');
              scenario.testPage = baseUrl + testpage;
            }
          }
        } //page class check ends
      }
      //For cases where steps don't match exactly because of conditional statements and step is the scenario line plus 1
      if (scenario.testPage == null || scenario.testPage == '') {
        let pageName = s
          .replace(
            /Given I go to|And I go to|with geoIP spoof|and keep geooverlay|in a new window/g,
            ''
          )
          .trim();

        if (s.includes('Given I repeat')) {
          pageName =
            s.substring(s.indexOf('repeat') + 7, s.indexOf('convert') - 1) +
            ' page';
        }

        let url = getTestPage(pageName);
        if (url != null) {
          if (scenario.testPage != null) scenario.testPage = url;
        }
      }

      // For cases where steps don't match exactly because of conditional statements and step is the scenario line plus 2
      if (scenario.testPage == null || scenario.testPage == '') {
        let pageName = sPlusOne
          .replace(
            /Given I go to|And I go to|with geoIP spoof|and keep geooverlay|in a new window/g,
            ''
          )
          .trim();
        let url = getTestPage(pageName);
        if (url != null) {
          if (scenario.testPage != null) scenario.testPage = url;
        }
      }

      scenarios.push(scenario);
    }
  }
  return scenarios;
};

const getAllScenarios = async files => {
  let results = [];
  for (let f of files) {
    results.push(await getScenarios(f));
  }
  return results;
  //return Promise.all(files.map(f => getScenarios(f)));
};

/*
 * Sites
 */

let sites = ['common', 'acom', 'dc', 'helpx', 'ec', 'cc', 'dexter', 'feds_new'];

/*
 * Get Step Definitions
 */

const getStepDefSummary = async () => {
  let stepDefs = {};
  for (let site of sites) {
    let dir = path.join(__dirname, '..', site, 'steps');
    let items = await walk(dir);
    stepDefs[site] = (await getAllStepDefs(items)).flat();
  }
  sites.map(site => {
    fs.writeFile(
      `site_${site}_stepdefs.json`,
      JSON.stringify(
        {
          site: site,
          stepDefs: stepDefs[site].sort()
        },
        null,
        2
      )
    );
  });
};

getStepDefSummary();

/*
 * Get Scenarios
 */

const getScenarioSummary = async () => {
  let scenarios = {};
  for (let site of sites) {
    processFeatureOutlines(site);
    let dir = path.join(__dirname, '..', site, 'features');
    let items = await walk(dir);
    scenarios[site] = (await getAllScenarios(items)).flat();
  }
  sites.map(site => {
    fs.writeFile(
      `site_${site}_scenarios.json`,
      JSON.stringify(
        {
          site: site,
          scenarios: scenarios[site]
        },
        null,
        2
      )
    );
  });
};

getScenarioSummary();

/*
Get step def lines for current project only
*/
const getStepDefOfCurrProj = async currSite => {
  let stepLines = [];
  let dir = path.join(__dirname, '..', currSite, 'steps');
  let items = await walk(dir);
  stepLines = (await getAllLines(items)).flat();
  return stepLines;
};

/*
Get all the lines of passed file
*/
const getlines = async file => {
  let data = await fs.readFile(file, 'utf-8');
  let allLines = data.split(/\r\n|\r|\n/);
  return allLines;
};

/*
Get all the lines of a dir
*/
const getAllLines = async files => {
  return Promise.all(files.map(f => getlines(f)));
};

/*
Get page class lines for current project only
*/
const getPageClassOfCurrProj = async currSite => {
  let pagesLines = [];
  let dir = path.join(__dirname, '..', currSite, 'pages');
  let items = await walk(dir);
  pagesLines = (await getAllLines(items)).flat();
  return pagesLines;
};

/*
Get current site of the feature file
*/
function getCurrentSite(filePath) {
  let splitPath = filePath.split(path.sep);
  let site = '';
  for (let s of splitPath) {
    if (
      s == 'helpx' ||
      s == 'dc' ||
      s == 'acom' ||
      s == 'common' ||
      s == 'ec' ||
      s == 'cc' ||
      s == 'dexter' ||
      s == 'feds_new'
    )
      site = s;
  }
  return site;
}

/*
Get base url for the scenario to be added to test page
*/
function getBaseUrl(site, descTag) {
  let baseUrl = '';
  if (site == 'acom' || site == 'common' || site == 'dc' ) {
    baseUrl = 'https://www.adobe.com';
  } else if (site == 'helpx') {
    baseUrl = 'https://www.helpx.adobe.com';
  } else if (site == 'dc') {
    if (descTag != undefined) {
      if (descTag.includes('frictionless')) baseUrl = 'https://www.adobe.com';
      else baseUrl = 'https://acrobat.adobe.com/us/en';
    }
  } else if (site == 'ec' || site == 'cc') {
    baseUrl = 'https://www.adobe.com/';
  } else if (site == 'dexter') {
    baseUrl = 'https://dexter.dev01.corp.adobe.com/';
  }
  return baseUrl;
}

/*
Get git repo link to the feature file
*/
function getGitLinkForFeatureFile(filePath, currSite) {
  let finalRelativePath = '';
  let basepath = 'https://git.corp.adobe.com/wcms/Platform-UI/tree/master/';
  let index = filePath.indexOf(currSite);
  let relativePath = filePath.substr(index);
  let relativePathForUrl = relativePath.split(path.sep).join('/');
  if (relativePathForUrl.includes('/features/outline')) {
    finalRelativePath = relativePathForUrl
      .replace('.feature', '.feature.outline')
      .replace('/features/outline', '/outlines')
      .replace(currSite, 'common');
  } else {
    finalRelativePath = relativePathForUrl;
  }
  return basepath + finalRelativePath;
}

function getJiraLink(id) {
  let baseJiraUrl = 'https://jira.corp.adobe.com/browse/';
  return baseJiraUrl + id;
}

/*
Get test page for scenarios
*/
function getTestPage(name) {
  let testPage = {
    'Adobe home page': 'https://www.adobe.com',
    'Creative Cloud page': 'https://www.adobe.com/creativecloud.html',
    'Creative Cloud for Teams page':
      'https://www.adobe.com//creativecloud/business/teams.html',
    'Creative Cloud plans page':
      'https://www.adobe.com//creativecloud/plans.html',
    'Experience Cloud page': 'https://www.adobe.com/experience-platform.html',
    'Adobe Account': 'https://www.adobe.com',
    'Creative Cloud home page': 'https://www.adobe.com/creativecloud.html',
    'Acrobat home page': 'https://acrobat.adobe.com/us/en/',
    'DxDC Acrobat Free Trial page':
      'https://www.adobe.com/free-trial-download.html',
    'Excel-to-PDF page':
      'https://www.adobe.com/acrobat/online/excel-to-pdf.html',
    'Compress-PDF page':
      'https://www.adobe.com/acrobat/online/compress-pdf.html',
    'PPT-to-PDF page': 'https://www.adobe.com/acrobat/online/ppt-to-pdf.html',
    'frictionless PDF overview page':
      'https://www.adobe.com/acrobat/online.html',
    'Fill & Sign page': 'https://www.adobe.com/acrobat/online/sign-pdf.html',
    'JPG-to-PDF page': 'https://www.adobe.com/acrobat/online/jpg-to-pdf.html',
    'Request Signature page':
      'https://www.adobe.com/acrobat/online/request-signature.html',
    'Word-to-PDF page': 'https://www.adobe.com/acrobat/online/word-to-pdf.html',
    'frictionless PDF pricing page':
      'https://www.adobe.com/acrobat/online/pricing.html',
    'Helpx home page': 'https://helpx.adobe.com',
    'the Acrobat Contact Form page':
      'https://acrobat.adobe.com/us/en/acrobat/contact.html',
    'the Sign Contact Form page':
      'https://acrobat.adobe.com/us/en/sign/contact.html',
    'the Sign Free Trial page':
      'https://acrobat.adobe.com/us/en/sign/free-trial-global.html',
    'the Salesforce Free Trial page':
      'https://acrobat.adobe.com/us/en/business/integrations/salesforce/free-trial.html',
    'the Developer Form page':
      'https://acrobat.adobe.com/us/en/sign/developer-form.html',
    'the Partner Form page':
      'https://acrobat.adobe.com/us/en/business/integrations/isv-partner-form.html',
    'Convert-to-PDF': 'https://www.adobe.com/acrobat/online/convert-pdf.html',
    'PDF-to-JPG': 'https://www.adobe.com/acrobat/online/pdf-to-jpg.html',
    'PDF-to-Word': 'https://www.adobe.com/acrobat/online/pdf-to-word.html',
    'PDF-to-PPT': 'https://www.adobe.com/acrobat/online/pdf-to-ppt.html',
    'PDF-to-Excel': 'https://www.adobe.com/acrobat/online/pdf-to-excel.html',
    'Rearrange-PDF': 'https://www.adobe.com/acrobat/online/rearrange-pdf.html',
    'Rotate-PDF': 'https://www.adobe.com/acrobat/online/rotate-pdf.html',
    'Delete-PDF-Pages':
      'https://www.adobe.com/acrobat/online/delete-pdf-pages.html',
    'NS Experience Cloud home page':
      'https://www.adobe.com/advertising/adobe-advertising-cloud.html',
    'Product Catalog page': 'https://www.adobe.com/products/catalog.html',
    'Creative Cloud Plans for Teams page':
      'https://www.adobe.com/content/offers-plans/us/en/creativecloud/business-plans-cct-filter.html?allowfullpath=true',
    'Plans page': 'https://www.adobe.com/creativecloud/plans.html',
    'Experience Cloud home page':
      'https://www.adobe.com/experience-platform.html',
    'Protect-PDF page':
      'https://www.adobe.com/acrobat/online/password-protect-pdf.html',
    'PDF-Editor page': 'https://www.adobe.com/acrobat/online/pdf-editor.html',
    'Split-PDF page': 'https://www.adobe.com/acrobat/online/split-pdf.html',
    'PDF-to-Word page': 'https://www.adobe.com/acrobat/online/pdf-to-word.html'
  }[name];
  return testPage;
}
