const envList = require('../envs/envs');

function buildUrl(url, env) {
  const branch = process.env.MILO_LIBS;
  if (!branch) return url;
  if (env !== '@milo') {
    return `${url}?milolibs=${branch}`;
  }
  return url.replace('main', branch);
}


/**
 * Parse a feature file based on name
 */
module.exports = (spec) => {
  const parsed = spec.features.reduce((rdx, feat) => {
    const envs = feat.envs.split(' ');
    const tags = feat.tags.split(' ');

    // For every environment
    envs.forEach((env) => {
      const domain = envList[env];
      const url = buildUrl(`${domain}${feat.path}`, env);

      // Run each tag
      tags.forEach(tag => {
        rdx.push({ name: feat.name, url, env: env, tag, path: feat.path });
      });
    });
    return rdx;
  }, []);

  return {
    name: spec.name,
    features: parsed,
  }
};
