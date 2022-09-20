const fs = require('fs');
const path = require('path');
const yargs = require('yargs');
const glob = require('glob');

let args = yargs.options({
  from: {
    describe: 'Input folder of Ruby step definitions',
    demandOption: true
  },
  to: {
    describe: 'Output folder of JavaScript step definitions',
    demandOption: true
  }
}).argv;

let files = glob.sync(path.join(args.from, '**', '*.rb'));

for (let file of files) {
  console.log(`Input: ${file}`);
  let output = path.join(args.to, path.basename(file).replace('.rb', '.js'));
  console.log(`output: ${output}`);
  let buffer = "const { Given } = require('@cucumber/cucumber');\n" + 
               "const { Then } = require('@cucumber/cucumber');\n" +
               "const { When } = require('@cucumber/cucumber');\n" +
               "\n";

  let lines = fs.readFileSync(file, 'utf8').match(/[^\r\n]+/g);
  let blockStart = false;
  let blockCode = [];
  for (let line of lines) {
    if (line.trim().length === 0) {
      continue;
    }
    if (blockStart) {
      blockCode.push(line);
    }
    let matchRe = line.match(/(Given|When|Then|And).*\/(.+)\/\s+do/);
    if (matchRe != undefined) {
      blockStart = true;
      if (blockCode.length > 0) {
        blockCode.pop();
        blockCode.pop();
        buffer += blockCode.map(x => {return `// ${x}`}).join('\n');
        buffer += "\n})\n\n";
        blockCode = [];
      }
      let prefix = matchRe[1];
      let regex = matchRe[2];
      let args = '';
      let matchArgs = line.match(/do\s*\|(.+)\|/);
      if (matchArgs != undefined) {
        args = matchArgs[1];
      }
      buffer += `${prefix}(/${regex}/, function(${args}) {\n`;
    }
  }
  if (blockCode.length > 0) {
    blockCode.pop();
    buffer += blockCode.map(x => {return `// ${x}`}).join('\n');
    buffer += "\n})\n";
  }
  fs.writeFileSync(output, buffer);
}

