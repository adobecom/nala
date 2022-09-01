/**
 * Use text mapping to translate text
 * browser.config.localeText should be populated with the mapping strings
 * The profile should have a setting `localeCfg` pointing to a YAML file,
 * e.g. locales.yml, the directory config\locales has mapping files for
 * each locale.
 * @param {object} obj String or Array or Array of Array of String
 */
function localize(obj) {
  if (Array.isArray(obj)) {
    return obj.map(x => localize(x));
  }
  
  if (browser.config.localeText && obj in browser.config.localeText) {
    return browser.config.localeText[obj];
  } else {
    return obj;
  }
};

export default localize;
