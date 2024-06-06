const fs = require('fs');
const path = require('path');
const { validatePath } = require('./utils.js');

function mergeResults(folderPath) {
  try {
    const resultsFiles = fs.readdirSync(validatePath(folderPath, { allowDirectory: true }))
      .filter((file) => file.startsWith('results-'));
    let finalResults = {};

    // eslint-disable-next-line no-restricted-syntax
    for (const file of resultsFiles) {
      const content = JSON.parse(fs.readFileSync(validatePath(path.join(folderPath, file)), 'utf-8'));
      finalResults = { ...finalResults, ...content };
    }

    // Write the final merged results
    fs.writeFileSync(
      validatePath(`${folderPath}/results.json`, { forWriting: true }),
      JSON.stringify(finalResults, null, 2),
    );

    // Optionally, clean up individual files
    resultsFiles.forEach((file) => fs.unlinkSync(path.join(folderPath, file)));

    console.log('Results merged and saved successfully.');
  } catch (error) {
    console.error('Error merging results:', error);
  }
}

// Example usage: node thisScript.js ./path/to/folder
const folderPath = process.argv[2]; // Get folder path from command line argument
if (!folderPath) {
  console.error('Please specify a folder path. e.g., screenshots/milo');
  process.exit(1);
}

mergeResults(folderPath);
