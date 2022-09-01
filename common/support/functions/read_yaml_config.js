const fs = require('fs');
const yaml = require('js-yaml');
/**
 * Expand configurations in pages
 * @param {string} configYaml Path to the YAML config file
 */
function readYamlConfig(configYml) {

  let config = yaml.load(fs.readFileSync(configYml));

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

  return config;
}

exports.readYamlConfig = readYamlConfig;