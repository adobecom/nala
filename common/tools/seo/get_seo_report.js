const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');
const urljoin = require('url-join');
const { AdobeWiki } = require('../../../tools/wiki/adobe_wiki');

/**
 * Entry point of this tool
 */
describe('SEO check', () => {
  before(function () {
    let configYml = browser.config.profile.config;
    if (!configYml) {
      throw `Please provide --config`;
    }
    let config = yaml.load(fs.readFileSync(configYml));
    processConfig(config);
    let params = ['envUrl', 'envUrlA', 'envUrlB'];
    let envUrls = [config[params[0]], config[params[1]], config[params[2]]];
    for (let i = 0; i < params.length; i++) {
      if (browser.config.profile[params[i]]) {
        envUrls[i] = browser.config.profile[params[i]];
      }
    }
    if (!envUrls[0] && !(envUrls[1] && envUrls[2])) {
      throw `Please provide --envUrl or (--envUrlA and --envUrlB)`;
    }
    // If profiles is provided, env is profile name.
    if (browser.config.profile.profiles) {
      let profilesYml = browser.config.profile.profiles;
      let profiles = yaml.load(fs.readFileSync(profilesYml));
      for (let i = 0; i < envUrls.length; i++) {
        if (envUrls[i]) {
          envUrls[i] = profiles[envUrls[i]].baseUrl;
        }
      }
    }
    this.config = config;
    this.envUrls = envUrls;
  });
  it('should get seo data', function () {
    this.timeout(0);

    let locale = browser.config.profile.locale;
    let config = this.config;
    let envUrls = this.envUrls;
    let pages = config.pages;
    let summary = [];
    let results = [];
    let errorPagesSummary = [];
    let expected = '';
    let appendLocale = browser.config.profile.locale.toUpperCase();
    if (appendLocale === '') {
      appendLocale = 'US';
    }
    //Only US wiki is ready right now. If condition will be removed once wiki is ready for all locales
    if (
      appendLocale === 'US' &&
      browser.config.profile.envUrl === 'acom-prod'
    ) {
      //Get the title of page from wiki
      let wiki = new AdobeWiki('seoteam');
      let page = browser.call(x =>
        wiki.getPageByTitle('DC Frictionless QA - ' + appendLocale)
      );
      let body = wiki.getBody(page);
      let tables = wiki.getElements(body, { name: 'table' });
      expected = wiki.getTableText(tables[0]);
      console.log(expected);
    }

    for (let i = 0; i < pages.length; i++) {
      for (let envIndex = 0; envIndex < envUrls.length; envIndex++) {
        let envUrl = envUrls[envIndex];
        if (!envUrl) continue;
        results = checkSeoMetaData(envUrl, locale, pages[i], expected);
        summary.push(results[0]);
        if (results[1].length > 0) {
          errorPagesSummary.push(results[1]);
        }
      }
    }
    fs.writeFileSync('seo_report.json', JSON.stringify(summary, null, 2));
    fs.writeFileSync(
      'seo_404pages.json',
      JSON.stringify(errorPagesSummary, null, 2)
    );
  });
});

/**
 *
 * @param {string} envUrl  environemnt url like https://www.adobe.com
 * @param {string} locale locale passed through node run command
 * @param {string} pagePath page url like /acrobat/online.html
 */
function checkSeoMetaData(envUrl, locale, pagePath, expected) {
  let results = [];
  let result = {};
  let errorPage = {};
  let errorPages = [];
  let url = urljoin(envUrl, locale, pagePath);
  console.log(url);
  try {
    browser.url(url);
    let title = browser.getTitle();
    let description = '';
    let robot = '';
    let canonicalUrl = '';
    let titleInSource = '';
    if (
      title != null &&
      !title.includes('Page not found') &&
      !title.includes('404')
    ) {
      if ($('//link[@rel="canonical"]').isExisting()) {
        canonicalUrl = $('//link[@rel="canonical"]').getAttribute('href');
      }
      if ($('//title').isExisting()) {
        titleInSource = $('//title').getAttribute('textContent');
      }
      if ($('//meta[@name="robots"]').isExisting()) {
        robot = $('//meta[@name="robots"]').getAttribute('content');
      }
      if ($('//meta[@name="description"]').isExisting()) {
        description = $('//meta[@name="description"]').getAttribute(
          'content'
        );
      }
      let noDupliateJson = true;
      let jsonLD = [];

      if ($('//script[@type="application/ld+json"]').isExisting()) {
        $$('//script[@type="application/ld+json"]').forEach(element => {
          let eachJsonLD = JSON.parse(
            element
              .getHTML()
              .replace('<script type="application/ld+json">', '')
              .replace('</script>', '')
              .trim()
              .split('@')
              .join('')
          );
          //Checking if there are duplicate jsonLD on the page
          if (noDupliateJson) {
            if (JSON.stringify(jsonLD).includes(JSON.stringify(eachJsonLD))) {
              noDupliateJson = false;
            }
          }
          jsonLD.push(eachJsonLD);
        });
      } else {
        jsonLD = 'None';
      }
      let match = true;
      if (canonicalUrl === url) {
        match = true;
      } else {
        match = false;
      }
      let titleMatch = true;
      let descriptionMatch = true;
      //checking title and description against values in wiki(currently checking only for US as wiki is ready only for that)
      if (
        browser.config.profile.locale === '' &&
        browser.config.profile.envUrl === 'acom-prod'
      ) {
        for (let i = 0; i < expected.length; i++) {
          if (i === 0) {
            continue;
          }
          let pageLink = expected[i][0];
          let expectedTitle = expected[i][1];
          let expectedDescription = expected[i][2];
          if (pageLink === url) {
            if (expectedTitle.trim() != titleInSource.trim()) {
              titleMatch = false;
            }
            if (expectedDescription.trim() != description.trim()) {
              descriptionMatch = false;
            }
          }
        }
      }

      result = {
        url: url,
        canonical: canonicalUrl,
        title: titleInSource,
        titleMatch: titleMatch ? '(/)' : '(x)',
        description: description,
        descriptionMatch: descriptionMatch ? '(/)' : '(x)',
        robot: robot,
        jsonLD: jsonLD,
        match: match ? '(/)' : '(x)',
        noDuplicatejsonLD: noDupliateJson ? '(/)' : '(x)'
      };
      results.push(result);
    } else {
      errorPage = {
        url: url,
        status: '404'
      };
      errorPages.push(errorPage);
    }
  } catch (err) {
    console.log(err);
  }
  return [results, errorPages];
}

/**
 * Expand configurations in pages
 * @param {Object} config - content of seo config file
 */
function processConfig(config) {
  let pages = config.pages;
  let configs = config.configs;
  if (configs) {
    for (let key in configs) {
      let newPages = [];
      let holder = `<${key}>`;
      for (let i = 0; i < pages.length; i++) {
        if (pages[i].includes(holder)) {
          for (let j = 0; j < configs[key].length; j++) {
            let exPath = pages[i].replace(holder, configs[key][j].path);
            if (configs[key][j].query) {
              let params = exPath.split('?');
              let newParams = params[1] ? querystring.decode(params[1]) : {};
              Object.assign(newParams, configs[key][j].query);
              exPath = `${params[0]}?${querystring.encode(newParams)}`;
            }
            newPages.push(exPath);
          }
        } else {
          newPages.push(pages[i]);
        }
      }
      pages = newPages;
    }
  }
  config.pages = pages;
}
