const envList = require('../envs/envs.js');

/**
 * This file will take a spec file and flatten it to individual
 * specs that can be tested.
 *
 */
function buildUrl(url, env) {
  let { branch } = process.env;
  let { repoName } = process.env;
  if (!branch) return url;
  if (branch.includes('/')) {
    const branchPath = branch.split('/');
    if (branchPath.length > 1) {
      let branchBuild = '';
      branchPath.forEach((pathName) => {
        branchBuild += `${pathName}-`;
      });
      branch = branchBuild.slice(0, (branchBuild.lastIndexOf('-')));
    }
  }

  if (!repoName) {
    repoName = 'milo';
  } else {
    repoName = repoName.substring(repoName.lastIndexOf('/') + 1);
    if (repoName === 'business-website') { repoName = 'bacomblog'; } // Switch repo name to coincide with env tag naming
  }
  if (env !== `@${repoName}_preview` && env !== `@${repoName}_live`) {
    return `${url}?milolibs=${branch}`;
  }
  return url.replace('main', branch);
}

function loopTags({ rdx, name, env, tags, url }) {
  tags.forEach((tag) => {
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
      if (Array.isArray(feat.path)) {
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
  };
};
