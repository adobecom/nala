const TITLE_REGEX = /(@\S+)\s+(@\S+)\s+(@\S+).*\s+on\s+(\S+)/;
// [, branch, repo, org, mode]
const URL_REGEX = /https:\/\/(\S+?)--(\S+?)--(\S+?)\.hlx\.(\S+).*/;

/**
This function takes test title string and then processes it .
@param {string} str - The input string to be processed
@returns {'name', 'env', 'tags', 'url', and 'branch'}
*/
function processTestTitle(title) {
  // Check if the string contains a comma or space seperator
  const separator = title.includes(',') ? ',' : ' ';
  const arr = title.split(separator);

  // Remove '@' prefix from each item in the array
  const processedArr = arr.map((item) => item.trim().replace(/^@/, ''));

  // Extract the URL
  const url = processedArr.pop().startsWith('http') ? processedArr.pop() : '';

  // Get name, env and tags,
  // Assign default value of empty string upon any falsy or null value in array.
  const name = processedArr[0] || '';
  const env = processedArr[1] || '';
  const tags = processedArr[2] || '';

  // Get the branch
  // eslint-disable-next-line no-nested-ternary
  const branch = /_prod/.test(env) ? 'prod' : /_stage/.test(env) ? 'stage' : URL_REGEX.exec(url)?.[1];

  return {
    name,
    env,
    tags,
    url,
    branch,
  };
}

function cleanTag(t) {
  return t.replace(/@/g, '');
}

function extractTags(title) {
  const [, name, env, tag, url] = TITLE_REGEX.exec(title);
  let branch;
  if (/_prod/.test(env)) {
    branch = 'prod';
  } else if (/_stage/.test(env)) {
    branch = 'stage';
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

module.exports = { extractTags, processTestTitle, TITLE_REGEX };
