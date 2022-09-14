const fs = require('fs');
const path = require('path');
const glob = require('glob');
const yaml = require('js-yaml');

/**
 * Filter out invalid scenarios or scenario outlines
 * This function only checks the line before Scenario: and Scenario Outline:
 * @param {string} ftrContent Content of a feature file
 */
function filterScenarios(ftrContent) {
    let lines = ftrContent.split('\n');
    let scenarios = [];
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim();
        if (line.startsWith('Scenario:') || line.startsWith('Scenario Outline:')) {
            let prevLine = lines[i - 1];
            let keep = true;
            if (prevLine.match(/<.*>/)) {
                keep = false;
            }
            scenarios.push({ line: i - 1, keep });
        }
    }
    for (let i = 0; i < scenarios.length; i++) {
        let scenario = scenarios[i];
        if (!scenario.keep) {
            let start = scenario.line;
            let end = start;
            if (i < scenarios.length - 1) {
                end = scenarios[i + 1].line;
            } else {
                end = lines.length;
            }
            if (process.env.DEBUG) {
                console.log('Invalid scenario in feature outline');
            }
            let arr = Array.from({ length: end - start }, (v, i) => start + i);
            if (process.env.DEBUG) {
                console.log(arr.map(x => lines[x]).join('\n'));
            }
            for (let j = start; j < end; j++) {
                lines[j] = '[X]';
            }
        }
    }
    lines = lines.filter(x => x != '[X]');

    return lines.join('\n');
}

/**
 * Process feature online YML files
 * @param {string} site Site name such as acom or dc
 */
function processFeatureOutlines(site) {
    if (!fs.existsSync(path.join(site, 'specs'))) {
        let outlineDir = 'outlines';
        let trimCount = path.join(site, outlineDir).length + 1;

        // Ouput feature file directory. Clean it or create it.
        let outputPath = path.join(site, 'features', 'outline');
        if (fs.existsSync(outputPath)) {
            try {
                fs.rm(outputPath, { recursive: true });
            } catch (err) {
                console.error(`Error while deleting ${outputPath}.`);
            }
        }
        fs.mkdirSync(outputPath, { recursive: true });

        // Convert feature.yml to feature
        let ftrYmls = glob.sync(path.join(site, outlineDir, '**/*.feature.yml'));
        for (let ftrYml of ftrYmls) {
            let ftrYmlCfg = yaml.load(fs.readFileSync(ftrYml));
            let outlineFile = path.join(
                'common',
                'outlines',
                ftrYmlCfg['Feature Outline']
            );

            // If the feature outline doesn't exist, give it a warning and continue.
            let outline = null;
            if (fs.existsSync(outlineFile)) {
                outline = fs.readFileSync(outlineFile, 'utf8');
            } else {
                outlineFile = outlineFile.replace(
                    'common/',
                    'node_modules/@mwp/common-automation/common/'
                );
                if (fs.existsSync(outlineFile)) {
                    outline = fs.readFileSync(outlineFile, 'utf8');
                } else {
                    console.log(
                        `Warning! The feauture outline "${outlineFile}" doesn't exist.`
                    );
                    continue;
                }
            }

            let params = ftrYmlCfg['Parameters'];
            if (params) {
                for (let key in params) {
                    const replacer = new RegExp(`<${key}>`, 'g');
                    outline = outline.replace(replacer, params[key]);
                }
            }

            let subs = ftrYmlCfg['Substitutions'];
            if (subs) {
                for (let key in subs) {
                    const replacer = new RegExp(key, 'g');
                    outline = outline.replace(replacer, subs[key]);
                }
            }

            let outputFile = path
                .join(outputPath, ftrYml.slice(trimCount))
                .replace('.yml', '');
            let outputFileDir = path.dirname(outputFile);
            if (!fs.existsSync(outputFileDir)) {
                fs.mkdirSync(outputFileDir, { recursive: true });
            }
            outline = filterScenarios(outline);
            fs.writeFileSync(outputFile, outline);
        }
    }
}

exports.processFeatureOutlines = processFeatureOutlines;