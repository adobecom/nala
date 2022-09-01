const fs = require('fs');
const yaml = require('js-yaml');
const path = require('path');

const intlConfigs = () => {
  let ymlPath = path.resolve(__dirname, '..', '..', 'config', 'intl.yml');
  let configs = yaml.load(fs.readFileSync(ymlPath));
  return configs;
};

const intlConfig = name => {
  let configs = intlConfigs();
  return configs[name];
};

const intlConfigByCurreny = code => {
  let configs = intlConfigs();
  let name = Object.keys(configs).find(x => configs[x].currency === code);
  if (!name) return null;
  configs[name].name = name;
  return configs[name];
};

const intlConfigByCountryCode = code => {
  let configs = intlConfigs();
  let name = Object.keys(configs).find(x => configs[x].countryCode === code.toUpperCase());
  if (!name) return null;
  configs[name].name = name;
  return configs[name];
};

exports.intlConfigs = intlConfigs;
exports.intlConfig = intlConfig;
exports.intlConfigByCurrency = intlConfigByCurreny;
exports.intlConfigByCountryCode = intlConfigByCountryCode;
