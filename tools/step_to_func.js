const fs = require('fs');
const glob = require('glob');
const yargs = require('yargs');
const esprima = require('esprima');
const escodegen = require('escodegen');

// Esprima doesn't preserve space lines. Use this marker
// in pre- and post-processing
const emptyLineMark = '// 0123456789 Empty Line 9876543210';

/**
 * Insert empty line markers as a comment in order to preserve space lines
 * @param {string} lines JaveScript code text
 */
function injectSpaceComments(lines) {
  lines = lines.split('\n');
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();
    if (line.length === 0) {
      lines[i] = emptyLineMark;
    }
  }
  return lines.join('\n');
}

/**
 * Restore empty lines by removing empty line markers
 * @param {string} lines JaveScript code text
 */
function restoreSpaceLine(lines) {
  return lines.replace(new RegExp(emptyLineMark, 'g'), '');
}

/**
 * Step function name is a concatenation of words in the step
 * definition regular expression
 * @param {string} regex Regular expression for a step definition
 */
function formatStepFuncName(regex) {
  regex = regex.replace(/[^a-zA-Z ]/g, '');
  regex = regex.split(' ');
  for (let i = 0; i < regex.length; i++) {
    let text = regex[i];
    if (i == 0) {
      regex[i] = text.toLowerCase();
    } else {
      regex[i] = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    }
  }
  return regex.join('');
}

/**
 *
 * @param {string} regex
 * @param {string[]} paramNames
 */
function formatStepFuncComment(regex, paramNames) {
  let paramsText = paramNames
    .map(x => `\n * @param {${x === 'table' ? 'string[][]' : 'string'}} ${x} `)
    .join('');
  let text = `
/**
 * Step Definition:
 * \`\`\`
 * ${regex}
 * \`\`\`${paramsText}
 */
  `;
  return text;
}

/**
 * Convert step definitions to step function
 * @param {string} file File path of JavaScript code
 */
function convert(file) {
  let lines = fs.readFileSync(file, 'utf-8');
  lines = injectSpaceComments(lines);

  let funcs = [];
  let ast = esprima.parse(lines, {
    sourceType: 'module',
    loc: true,
    range: true,
    comment: true,
    tokens: true
  });
  for (let b of ast.body) {
    if (b.type == 'ExpressionStatement') {
      let exp = b.expression;
      let callee = exp.callee.name;
      if (!['Given', 'When', 'Then'].includes(callee)) {
        continue;
      }
      let regex = exp.arguments[0].raw;
      let argIndex = 1;
      if (exp.arguments[argIndex].type === 'ObjectExpression') {
        // arguments[1] could be { timeout: ... }, then use arguments[2]
        argIndex = 2;
      }
      let func = exp.arguments[argIndex];
      if (func.type === 'Identifier') {
        // Done already
        break;
      }
      let funcRange = func.body.range;
      let params = func.params;

      let paramNames = params.map(x => x.name);
      let funcBody = lines.slice(funcRange[0], funcRange[1]);
      let funcName = regex;
      let matches = [...funcName.matchAll(/(\(.+\))/g)];
      for (let i = 0; i < matches.length; i++) {
        funcName = funcName.replace(matches[i][0], paramNames[i]);
      }
      funcName = formatStepFuncName(funcName);
      let funcComment = formatStepFuncComment(regex, paramNames);
      let newFunc = `${emptyLineMark}\n${funcComment}\nfunction ${funcName}(${paramNames.join(
        ', '
      )})${funcBody}`;
      funcs.push(newFunc);
      let token = esprima.parseScript(funcName, {
        loc: true,
        range: true
      });
      exp.arguments[argIndex] = token.body[0].expression;
      // remove comments
      ast.comments = ast.comments.filter(x => {
        return !(funcRange[0] <= x.range[0] && x.range[1] <= funcRange[1]);
      });
    }
  }
  // Add module at beginning
  let module = file.split('/')
  module.pop();
  module = module.join('/');
  let modAst = esprima.parse(`/** @module ${module} */`, {
    loc: true,
    range: true,
    comment: true,
    tokens: true
  });
  modAst = escodegen.attachComments(
    modAst,
    modAst.comments,
    modAst.tokens
  );
  ast.body.unshift(modAst);

  // Add step functions
  for (let func of funcs) {
    let funcAst = esprima.parse(func, {
      loc: true,
      range: true,
      comment: true,
      tokens: true
    });
    funcAst = escodegen.attachComments(
      funcAst,
      funcAst.comments,
      funcAst.tokens
    );
    ast.body.push(funcAst);
  }

  ast = escodegen.attachComments(ast, ast.comments, ast.tokens);
  let newCode = escodegen.generate(ast, {
    format: {
      indent: {
        style: '  ',
        base: 0,
        adjustMultilineComment: false
      },
      compact: false
    },
    comment: true
  });

  newCode = restoreSpaceLine(newCode);

  return newCode;
}

function main() {
  let argv = yargs
    .options('path', {
      alias: 'p',
      required: true,
      description:
        'Folder path to convert step definitions. To convert all, use "*/steps/**/*_step*.js"'
    })
    .options('dryrun', {
      alias: 'd',
      description: 'Dry run and not to replace existing files'
    })
    .parserConfiguration({ 'strip-aliased': true }).argv;

  // To convert all step definitions
  // let argv.path = */steps/**/*_step*.js';
  let files = glob.sync(argv.path);

  let i = 0;
  for (let f of files) {
    console.log(f);
    let newCode = convert(f);
    let newFilename = f;
    if (argv.dryrun) {
      newFilename = f.replace('.js', '.dryrun.js');
    }
    fs.writeFileSync(newFilename, newCode);
  }
}

main();
