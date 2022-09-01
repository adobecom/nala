const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const {
  readYamlConfig
} = require('../../../common/support/functions/read_yaml_config');

function command(cmd, args) {
  let output = spawnSync(cmd, [args], {
    shell: true
  });
  return output;
}

function magickCommand(cmd) {
  let output = command('magick', cmd);
  return output.stdout.toString('utf8');
}

function thumbnailImage(filename, size, outfile) {
  let cmd = `convert "${filename}" -resize ${size} "${outfile}"`;
  return magickCommand(cmd);
}

describe('Take Screenshots', () => {
  it('should take screenshots', function () {
    this.timeout(0);
    let configYml = browser.config.profile.config;

    if (!configYml) {
      throw `Please provide --config`;
    }
    let config = readYamlConfig(configYml);
    let outputDir = 'screenshots';
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    //let pages = ['https://acrobat.adobe.com/us/en'];
    let results = [];
    let pages = config.pages;
    for (let i = 0; i < pages.length; i++) {
      let url = '';
      if (browser.config.profile.site == 'dc') {
        if (pages[i].includes('/online/')) {
          let tempPage = pages[i].substring(0, 29);
          url = pages[i].replace(tempPage, 'https://www.adobe.com/acrobat/')
        }
        else {
          url = pages[i].replace('/content/dx-dc/', 'https://acrobat.adobe.com/').replace('index.html', '');
        }
      }
      else if(browser.config.profile.site == 'cc'){
        url = pages[i].replace('/content/cc/us/en/', 'https://www.adobe.com/'); 
      }
      else if(browser.config.profile.site == 'ec'){
        url = pages[i].replace('/content/dx/us/en/', 'https://business.adobe.com/');
      }
      console.log(url);
      browser.navigateTo(url);
      browser.setWindowSize(1920, 1080);
      browser.pause(5000);

      let filePath = path.join(outputDir, `${i}.png`);
      let filePathThumbnail = path.join(outputDir, `${i}_t.png`);

      browser.saveScreenshot(filePath);
      thumbnailImage(filePath, '240x240', filePathThumbnail);

      results.push({
        url,
        file: filePath,
        thumbnail: filePathThumbnail
      })
    }

    let resultsPath = path.join(outputDir, 'results.json')
    fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2));
  });
});
