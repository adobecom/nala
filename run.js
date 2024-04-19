const { spawn } = require('child_process');

function parseArgs(args) {
  const result = {};
  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i];

    // Check if it's a flag (e.g., -option)
    if (arg.startsWith('-')) {
      const equalIndex = arg.indexOf('=');
      if (equalIndex !== -1) {
        // If -option=value format
        const key = arg.slice(1, equalIndex);
        const value = arg.slice(equalIndex + 1);
        result[key] = value;
      } else {
        // If just -option, set it to true (boolean flag)
        const key = arg.slice(1);
        // Check next argument to see if it's a standalone value or another flag
        if (args[i + 1] && !args[i + 1].startsWith('-')) {
          result[key] = args[i + 1];
          i += 1; // Skip next arg since it's consumed as the value of this option
        } else {
          result[key] = true;
        }
      }
    }
  }
  return result;
}

function runPlaywrightTests() {
  // Start from the first actual argument (skip node and script paths)
  const args = process.argv.slice(2);
  const argv = parseArgs(args);

  // Construct the Playwright CLI command
  const command = 'npx playwright test';
  const options = [];

  // Add options dynamically based on argv
  if (argv.h) {
    options.push('--headed');
  }
  if (argv.p) {
    options.push(`--project=${argv.p}`);
  }
  if (argv.c) {
    options.push(`--config=configs/${argv.c}.config.js`);
  }
  if (argv.g) {
    options.push(`--grep="${argv.g}"`);
  }
  if (argv.r) {
    options.push(`--reporter=${argv.r}`);
  }

  // More flags can be dynamically handled here
  const finalCommand = `${command} ${options.join(' ')}`;
  console.log(`Executing command: ${finalCommand}`);

  // Spawn the Playwright test process
  const testProcess = spawn(finalCommand, { stdio: 'inherit', shell: true });

  testProcess.on('close', (code) => {
    console.log(`Playwright tests exited with code ${code}`);
    process.exit(code);
  });
}

runPlaywrightTests();
