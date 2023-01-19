const fs = require('fs/promises');
const { extractTags } = require('./extract-test-title.js');
const parse = require('../features/parse.js');

const pathToSpecs = `${__dirname}/../features`;

async function checkSpecFile(specFile) {
  if (!specFile.endsWith('.spec.js')) return;
  const filePath = `${pathToSpecs}/${specFile}`;

  // eslint-disable-next-line import/no-dynamic-require, global-require
  const spec = await require(filePath);

  const { features } = parse(spec);
  features.forEach((feature) => {
    const extracted = extractTags(feature.title);
    ['name', 'env', 'tag', 'url'].forEach((e) => {
      if (!(e in extracted)) {
        throw new Error(
          `When parsing ${specFile}, ${e} is missing from extracted title (${feature.title}): ${e}`,
        );
      }
    });
  });
}

async function main() {
  const specFiles = await fs.readdir(pathToSpecs);
  const fileCheckPromises = specFiles.map((specFile) =>
    checkSpecFile(specFile),
  );
  await Promise.all(fileCheckPromises);
  console.log('All specs passed the check');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
