const fs = require('fs');
const urlJoin = require('url-join');
var expect = require('expect');
//Run instructions
//node run common tools/sizecheck/sizecheck.js --devtools --config dc/tools/sizecheck/sizecheck.yml --locale  default --env prod --profiles dc/profiles.yml
const {
  readYamlConfig
} = require('../../../common/support/functions/read_yaml_config');
describe('Verify the file size of JS page resources', () => {
  before(() => {
    browser.enablePerformanceAudits();
  });
  it('Verify no JS resource is greater than 500 KB', function () {
    this.timeout(0);
    let configYml = browser.config.profile.config;
    console.log(configYml);
    if (!configYml) {
      throw `Please provide --config`;
    }
    let config = readYamlConfig(configYml);
    let env = browser.config.profile.env;
    let profilesYml = browser.config.profile.profiles;
    let profiles = readYamlConfig(profilesYml);
    let locale = browser.config.profile.locale;
    let enter = [];
    let lognetwork = [];
    let urls = config.urls;
    browser.cdp('Network', 'enable');
    browser.on('Network.responseReceived', params => {
      if (params.response.url.endsWith('.js')) {
        console.log(params.response.url);
        console.log(params.response.encodedDataLength);
        //only push JS resources that are larger than 500 KB
        if (params.response.encodedDataLength > 512000) {
          lognetwork.push(params.response);
        }
      }
    });
    for (let i = 0; i < urls.length; i++) {
      let urli = urls[i];
      let pageUrl = urlJoin(profiles[env].baseUrl, locale, urli);
      browser.url(pageUrl);
      browser.pause(5000);
      //Retrieve url and encoded data length data for resources larger than 500 KB
      enter = lognetwork.map(x => ({
        url: x.url,
        encodedDataLength: x.encodedDataLength
      }));
      lognetwork = [];
    }
    if (enter.length >= 1) {
      fs.writeFileSync('jsResourceSize.json', JSON.stringify(enter, null, 2));
    }
  });
  after(() => {
    browser.disablePerformanceAudits();
  });
});