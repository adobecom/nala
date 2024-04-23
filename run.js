const { spawn } = require('child_process');

function displayHelp() {
  console.log(`
Usage: node run.js [options]

Options:
-p, --project       Specify the project to run tests on, e.g., milo-live-chrome (required).
-c, --config        Specify name of configuration file, e.g., milo (required).
-g, --grep          Filter tests by grep pattern, e.g., '@milo'.
-r, --reporter      Specify the reporter to use, e.g., 'html'.
-h, --help          Display this help message and exit.
--headed            Run tests in headed mode.
--headless          Run tests in headless mode (default).

Examples:
node run.js -p=milo-live-chrome -c=milo
node run.js --project milo-live-chrome --config milo --grep '@milo' --headed
node run.js -h
`);
}

function parseArgs(args) {
  const result = {};
  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i];

    // Check for help option
    if (arg === '-h' || arg === '--help') {
      displayHelp();
      process.exit(0); // Exit after displaying help
    }

    // Handle both short and long options
    if (arg.startsWith('-')) {
      const isLongOption = arg.startsWith('--');
      const hasEqualSign = arg.indexOf('=') !== -1;

      let key;
      let value;

      if (hasEqualSign) {
        // Split on the first '=' found
        const splitIndex = arg.indexOf('=');
        key = arg.slice(isLongOption ? 2 : 1, splitIndex);
        value = arg.slice(splitIndex + 1);

        // Normalize key for known long options
        if (key === 'project' || key === 'p') key = 'project';
        if (key === 'config' || key === 'c') key = 'config';
        if (key === 'grep' || key === 'g') key = 'grep';
        if (key === 'reporter' || key === 'r') key = 'reporter';

        result[key] = value;
      } else {
        // If just -option, set it to true (boolean flag)
        key = arg.slice(isLongOption ? 2 : 1);

        // Normalize key for known long options
        if (key === 'project' || key === 'p') key = 'project';
        if (key === 'config' || key === 'c') key = 'config';
        if (key === 'grep' || key === 'g') key = 'grep';
        if (key === 'reporter' || key === 'r') key = 'reporter';

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

  if (Object.keys(argv).length === 0) {
    console.log('No options provided, displaying help.');
    displayHelp();
    process.exit(0);
  }

  // Add options dynamically based on argv
  if (argv.headed) {
    options.push('--headed');
  }

  if (argv.project) {
    if (argv.project === 'all') {
      console.log('Running tests for all projects');
    } else {
      const projectArray = argv.project.split(',');
      projectArray.forEach((project) => {
        options.push(`--project=${project}`);
      });
    }
  } else {
    console.error('Error: -p (project) is required');
    process.exit(1);
  }

  if (argv.config) {
    options.push(`--config=configs/${argv.config}.config.js`);
  } else {
    console.error('Error: -c (config) is required');
    process.exit(1);
  }

  if (argv.grep) {
    options.push(`--grep="${argv.grep}"`);
  }

  if (argv.reporter) {
    options.push(`--reporter=${argv.reporter}`);
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
