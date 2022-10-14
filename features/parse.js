const envList = require('../envs/envs');

/**
 * This file will take a spec file and flatten it to individual
 * specs that can be tested.
 * 
 */

function buildUrl(url, env) {
  const branch = process.env.MILO_LIBS;
  if (!branch) return url;
  if (env !== '@milo') {
    return `${url}?milolibs=${branch}`;
  }
  return url.replace('main', branch);
}

function loopTags({ rdx, name, env, tags, url }) {
  tags.forEach(tag => {
    const title = `${name} ${env} ${tag} on ${url}`;
    rdx.push({ title, url, tag });
  });
}

module.exports = (spec) => {
  const parsed = spec.features.reduce((rdx, feat) => {
    const envs = feat.envs.split(' ');
    const tags = feat.tags.split(' ');

    // For every environment
    envs.forEach((env) => {
      const domain = envList[env];

      // If an array is supplied, break the paths down.
      if(Array.isArray(feat.path)) {
        feat.path.forEach((path) => {
          const url = buildUrl(`${domain}${path}`, env);
          loopTags({ rdx, name: feat.name, env, tags, url });
        });
      } else {
        const url = buildUrl(`${domain}${feat.path}`, env);
        loopTags({ rdx, name: feat.name, env, tags, url });
      }
    });

    return rdx;
  }, []);

  return {
    name: spec.name,
    features: parsed,
  }
};
