const { spawnSync } = require('child_process');

function checkVersion(tool, args, output) {
  let res = spawnSync(tool, [args], {
    shell: true
  });
  return res[output].toString().split('\n')[0].trim();
}

function checkTools() {
  const tools = [
    { name: 'NodeJS', exe: 'node', verArg: '--version', output: 'stdout' },
    { name: 'Yarn', exe: 'yarn', verArg: '--version', output: 'stdout' },
    { name: 'Java', exe: 'java', verArg: '-version', output: 'stderr' },
    { name: 'Python', exe: 'python', verArg: '--version', output: 'stderr' },
    { name: 'Appium', exe: 'appium', verArg: '--version', output: 'stdout' },
    {
      name: 'ImageMagick',
      exe: 'magick',
      verArg: '-version',
      output: 'stdout'
    },
    { name: 'FFMPEG', exe: 'ffmpeg', verArg: '-version', output: 'stdout' }
  ];

  for (let tool of tools) {
    try {
      console.log(
        `${tool.name}: ${checkVersion(tool.exe, tool.verArg, tool.output)}`
      );
    } catch (err) {
      console.log(`${tool.name}: Unavailable`);
    }
  }
}

function main() {
  checkTools();
}

main();
