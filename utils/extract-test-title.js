const TITLE_REGEX = /(@\S+)\s+(@\S+)\s+(@\S+).*\s+on\s+(\S+)/;
// [, branch, repo, org, mode]
const URL_REGEX = /https:\/\/(\S+?)--(\S+?)--(\S+?)\.hlx\.(\S+).*/;

function cleanTag(t) {
  return t.replace(/@/g, '');
}

function extractTags(title) {
  const [, name, env, tag, url] = TITLE_REGEX.exec(title);
  let branch;
  if (/_prod/.test(env)) {
    branch = 'prod';
  } else {
    [, branch] = URL_REGEX.exec(url);
  }
  return {
    name: cleanTag(name),
    env: cleanTag(env),
    tag: cleanTag(tag),
    url,
    branch,
  };
}

module.exports = { extractTags, TITLE_REGEX };
