/** @module common/steps */
const { Given } = require('@cucumber/cucumber');
const { When } = require('@cucumber/cucumber');
const { Then } = require('@cucumber/cucumber');

const XOR = (a, b) => {
  return (a ? 1 : 0) ^ (b ? 1 : 0);
};

// Conditionally run a step for an environment.
// Add "if env in prod" or "if env not in prod" to conditionally run a step
Then(/^(.*) if env (|not )in ([^:]*)$/, stepEnv);

Then(/^(.*) if env (|not )in (.+):$/, stepEnvTable);

// Conditionally run a step for a locale.
// Add "if locale in jp,ru" or "if locale not in jp,ru" to conditionally run a step
Then(/^(.*) if locale (|not )in ([^:]*)$/, stepLocale);

Then(/^(.*) if locale (|not )in (.+):$/, { timeout: 1200000 }, stepLocaleTable);

// Conditionally run a step for a geo-ip.
// Add "if in jp,ru" or "if not in jp,ru" to conditionally run a step
Then(/^(.*) if (|not )in ([^:]*)$/, stepGeoIp);

Then(/^(.*) if (|not )visiting from a different country$/, stepAkamai);

// Conditionally run a step based on Dexter version
Then(/^(.*) if Dexter "(.+)" (version|build) (>|<|=|<=|>=) ([^:]+)$/, stepDexterModVersion);

Then(/^(.*) if Dexter "(.+)" (version|build) (>|<|=|<=|>=) ([^:]+):$/, stepDexterModVersionTable);

Then(/^(.*) if (|not )using regular nav$/, stepRegularNav);

Then(/^(.*) if (|not )browser url contains "([^"]*)"$/, stepBrowserUrl);


/* Old condition steps

Then(/^(.*) if (|not )on ([^:]*)$/, function (text, neg, locales) {
  //   locales = locales.split(',').map(&:strip)
  //   if (neg != '') ^ locales.include?(ENV['GEO_IP'])
  //     step text
  //   end
  // end
});

Then(/^(.*) if (|not )on ([^:]*):$/, function (text, neg, envs, table) {
  //   envs = envs.split(',').map(&:strip)
  //   if ((neg != '') ^ envs.include?(ENV['env']))
  //     step text + ":", table
  //   end
  // end
  // # It is used to put a condition on a region.
});

Then(/^(.*) if (|not )in ([^:]*):$/, function (text, neg, regions, table) {
  //   regions = regions.split(',').map(&:strip)
  //   if ((neg != '') ^ regions.include?($geo_ip))
  //     step text + ":", table
  //   end
  // end
  // # It is used to put a condition on region language.
});

Then(/^(.*) if language is (|not )([^:]*)$/, function (text, neg, languages) {
  //   languages = languages.split(',').map(&:strip)
  //   if ((neg != '') ^ languages.include?($locale_info['language']))
  //     step text
  //   end
  // end
});
Then(/^(.*) if (|not )(phone|tablet|desktop) layout$/, stepLayout)
*/

Then(/^(.*) if (|not )using ([^:]*) browser$/, stepBrowser)

/**
 * Step Definition:
 * ```
 * /^(.*) if env (|not )in ([^:]*)$/
 * ```
 * @param {string} step The step to be executed
 * @param {string} neg "" for postive or "not " for negative
 * @param {string} values Comma separated values of envs
 */
function stepEnv(step, neg, values) {
  let envs = values.split(',').map(Function.prototype.call, String.prototype.trim);
  if (XOR(neg != '', envs.includes(process.env.env))) {
    return this.step(step);
  }
}

/**
 * Step Definition:
 * ```
 * /^(.*) if (|not )using ([^:]*) browser$/
 * ```
 * @param {string} step The step to be executed
 * @param {string} neg "" for postive or "not " for negative
 * @param {string} values Comma separated values of envs
 */
 function stepBrowser(step, neg, values) {
  let browsers = values.split(',').map(Function.prototype.call, String.prototype.trim);
  if (XOR(neg != '', browsers.includes(process.env.browser))) {
    return this.step(step);
  }
}

/**
 * Step Definition:
 * ```
 * /^(.*) if env (|not )in (.+):$/
 * ```
 * @param {string} step The step to be executed
 * @param {string} neg "" for positive or "not " for negative
 * @param {string} values Comma separated values of envs
 * @param {string[][]} table Table for the step
 */
function stepEnvTable(step, neg, values, table) {
  let envs = values.split(',').map(Function.prototype.call, String.prototype.trim);
  if (XOR(neg != '', envs.includes(process.env.env))) {
    return this.step(step + ':', table);
  }
}

/**
 * Step Definition:
 * ```
 * /^(.*) if locale (|not )in ([^:]*)$/
 * ```
 * @param {string} step The step to be executed
 * @param {string} neg "" for positive or "not " for negative
 * @param {string} values Comma separated values of locales
 */
function stepLocale(step, neg, values) {
  let envs = values.split(',').map(Function.prototype.call, String.prototype.trim);
  if (XOR(neg != '', envs.includes(process.env.locale))) {
    return this.step(step);
  }
}

/**
 * Step Definition:
 * ```
 * /^(.*) if locale (|not )in (.+):$/
 * ```
 * @param {string} step The step to be executed
 * @param {string} neg "" for positive or "not " for negative
 * @param {string} values Comma separated values of locales
 * @param {string[][]} table Table for the step
 */
function stepLocaleTable(step, neg, values, table) {
  let envs = values.split(',').map(Function.prototype.call, String.prototype.trim);
  if (XOR(neg != '', envs.includes(process.env.locale))) {
    return this.step(step + ':', table);
  }
}

/**
 * Step Definition:
 * ```
 * /^(.*) if (|not )in ([^:]*)$/
 * ```
 * @param {string} step The step to be executed
 * @param {string} neg "" for positive or "not " for negative
 * @param {string} values Comma separated values of geo-IP location
 */
function stepGeoIp(step, neg, values) {
  let envs = values.split(',').map(Function.prototype.call, String.prototype.trim);
  if (XOR(neg != '', envs.includes(process.env.akamaiLocale))) {
    return this.step(step);
  }
}

/**
 * Step Definition:
 * ```
 * /^(.*) if (|not )visiting from a different country ([^:]*)$/
 * ```
 * @param {string} step The step to be executed
 * @param {string} neg "" for positive or "not " for negative
 */
 function stepAkamai(step, neg) {
  if (XOR(neg != '', browser.config.locales.find(x => x.locale === browser.config.profile.locale).akamai !== browser.config.profile.akamaiLocale)) {
    return this.step(step);
  }
}

/**
 * Dexter module version comparison used by the conditional steps
 * @param {string} modName A Dexter module
 * @param {string} verOrBld version or build to be compared
 * @param {string} condition A condition operator <, >, or =
 * @param {string} version Dexter module version/build to be compared
 * @returns {boolean}
 */
function dexterModVersionCompare(modName, verOrBld, condition, version) {
  const compareVersions = require('compare-versions');
  let mods = browser.config.buildInfo.filter(x => x.product.includes(modName));
  if (mods.length === 0) {
    throw `No module "${modName}" is found`;
  } else if (mods.length > 1) {
    throw `Multiple modules are found for "${modName}"`;
  }
  let mod = mods[0];
  let actual = '';
  if (verOrBld === 'version') {
    actual = mod.version.split('-')[0];
  } else if (verOrBld === 'build') {
    actual = mod.build;
  }
  return compareVersions.compare(actual, version, condition);
}

/**
 * Step Definition:
 * ```
 * /^(.*) if Dexter "(.+)" (version|build) (>|<|=|<=|>=) ([^:]+)$/
 * ```
 * @param {string} step The step to be executed
 * @param {string} modName A Dexter module
 * @param {string} verOrBld version or build to be compared
 * @param {string} condition A condition operator <, >, or =
 * @param {string} version Dexter module version/build to be compared
 */
function stepDexterModVersion(step, modName, verOrBld, condition, version) {
  if (dexterModVersionCompare(modName, verOrBld, condition, version)) {
    return this.step(step);
  }
}

/**
 * Step Definition:
 * ```
 * /^(.*) if Dexter "(.+)" (version|build) (>|<|=|<=|>=) ([^:]+):$/
 * ```
 * @param {string} step The step to be executed
 * @param {string} modName A Dexter module
 * @param {string} verOrBld version or build to be compared
 * @param {string} condition A condition operator <, >, or =
 * @param {string} version Dexter module version/build to be compared
 * @param {string[][]} table Table for the step
 */
function stepDexterModVersionTable(step, modName, verOrBld, condition, version, table) {
  if (dexterModVersionCompare(modName, verOrBld, condition, version)) {
    // handle those step definitions not conforming the convention.
    if (this.stepExists(step)) {
      return this.step(step, table);
    } else if (this.stepExists(step + ':')) {
      return this.step(step + ':', table);
    } else {
      throw `No step definition for "${step}"`;
    }
  }
}

/**
 * Step Definition:
 * ```
 * /^(.*) if (|not )using regular nav$/
 * ```
 * @param {string} step The step to be executed
 * @param {string} neg "" for positive or "not " for negative
 */
 function stepRegularNav(step, neg) {
  let usingLocalNav = ['default', 'uk'];
  if (XOR(neg != '', !usingLocalNav.includes(process.env.locale))) {
    return this.step(step);
  }
}

function stepBrowserUrl(step, table, neg, url) {
  if (XOR(neg != '', !browser.getUrl().includes(url))) {
    return this.step(step, table);
  }
}
