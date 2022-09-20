const fs = require('fs');
const yaml = require('js-yaml');
const path = require('path');

var test = 'dc'

var url = `https://s3-sj3.corp.adobe.com/mwp/jenkins/${test}/OneTrust/`;


var localeCfgPath = path.join(test, 'config', 'locales.yml');
//console.log(localeCfgPath);
var locales = yaml.load(fs.readFileSync(localeCfgPath, 'utf8'));
//console.log(locales);

var json_content = '[';

for (let locale of locales) {
  let key = locale.locale;
  //console.log(locale.locale);
  if(key == '') key = 'us';

  key = key.replace(/\//, '_');  // au/en  -> au_en

  let file1 = '\'banner\': \'' + url + key + '-chrome-win10g-banner.png\'';
  let file2 = '\'cookie-setting-top\': \'' + url + key + '-chrome-win10g-cookie-setting-top.png\'';
  let file3 = '\'cookie-setting-bottom\': \'' + url + key + '-chrome-win10g-cookie-setting-bottom.png\'';
  let file4 = '\'cookie-details\': \'' + url + key + '-chrome-win10g-cookie-details.png\'';
  let file5 = '\'first-host-cookies\': \'' + url + key + '-chrome-win10g-first-host-cookies.png\'';
  json_content += '{ \'locale\': \'' + key + '\',' + file1 + ',' + file2 + ',' + file3 + ',' + file4 + ',' + file5 + '}' + ',';
}
  json_content = json_content.slice(0, -1) + ']';

fs.writeFileSync(
  'onetrust_screenshots.json',
  JSON.stringify(json_content, null, 2)
);

json_content = '[';

for (let locale of locales) {
  let key = locale.locale;
  //console.log(locale.locale);
  if(key == '') key = 'us';

  key = key.replace(/\//, '_');

  let file1 = '\'banner\': \'' + url + 'tablet-' + key + '-chrome-win10g-banner.png\'';
  let file2 = '\'cookie-setting-top\': \'' + url + 'tablet-' + key + '-chrome-win10g-cookie-setting-top.png\'';
  let file3 = '\'cookie-setting-bottom\': \'' + url + 'tablet-' + key + '-chrome-win10g-cookie-setting-bottom.png\'';
  let file4 = '\'cookie-details\': \'' + url + 'tablet-' + key + '-chrome-win10g-cookie-details.png\'';
  let file5 = '\'first-host-cookies\': \'' + url + 'tablet-' + key + '-chrome-win10g-first-host-cookies.png\'';
  json_content += '{ \'locale\': \'' + key + '\',' + file1 + ',' + file2 + ',' + file3 + ',' + file4 + ',' + file5 +'}' + ',';
}
  json_content = json_content.slice(0, -1) + ']';

fs.writeFileSync(
  'onetrust_tablet_screenshots.json',
  JSON.stringify(json_content, null, 2)
);

json_content = '[';

for (let locale of locales) {
  let key = locale.locale;
  //console.log(locale.locale);
  if(key == '') key = 'us';

  key = key.replace(/\//, '_');

  let file1 = '\'banner\': \'' + url + 'mobile-' + key + '-chrome-win10g-banner.png\'';
  let file2 = '\'cookie-setting-top\': \'' + url + 'mobile-' + key + '-chrome-win10g-cookie-setting-top.png\'';
  let file3 = '\'cookie-setting-bottom\': \'' + url + 'mobile-' + key + '-chrome-win10g-cookie-setting-bottom.png\'';
  let file4 = '\'cookie-details\': \'' + url + 'mobile-' + key + '-chrome-win10g-cookie-details.png\'';
  let file5 = '\'first-host-cookies\': \'' + url + 'mobile-' + key + '-chrome-win10g-first-host-cookies.png\'';
  json_content += '{ \'locale\': \'' + key + '\',' + file1 + ',' + file2 + ',' + file3 + ',' + file4 + ',' + file5+ '}' + ',';
}
  json_content = json_content.slice(0, -1) + ']';

fs.writeFileSync(
  'onetrust_mobile_screenshots.json',
  JSON.stringify(json_content, null, 2)
);