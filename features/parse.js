const selectors = require('../selectors/selectors');

function buildUrl(url, env) {
  const branch = process.env.MILO_LIBS;
  if (!branch) return url;
  if (env === '@consumer') {
    return `${url}?milolibs=${branch}`;
  }
  return url.replace('main', branch);
}


/**
 * Parse a feature file based on name
 */
module.exports = (feature) => {
  const parsed = feature.features.reduce((rdx, feat) => {
    const url = buildUrl(feat.url, feat.env);
    const parsedTags = feat.tags.split(' ');
    parsedTags.forEach(tag => {
      rdx.push({ name: feat.name, url, env: feat.env, tag, selector: selectors[tag] });
    });
    return rdx;
  }, []);
  return {
    name: feature.name,
    features: parsed,
  }
};
