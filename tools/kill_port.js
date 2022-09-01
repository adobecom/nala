const { spawnSync } = require('child_process');
const { execSync } = require('child_process');

function killPort(port, method = 'tcp') {
  port = Number.parseInt(port);

  if (!port) {
    throw 'Invalid argument provided for port';
  }

  if (process.platform === 'win32') {
    let res = spawnSync('netstat', [`-nao`]);

    const lines = res.stdout.toString().split('\n');

    const lineWithLocalPortRegEx = new RegExp(
      `^ *${method.toUpperCase()} *[^ ]*:${port}`,
      'gm'
    );
    const linesWithLocalPort = lines.filter(line =>
      line.match(lineWithLocalPortRegEx)
    );

    let pids = linesWithLocalPort.reduce((acc, line) => {
      const match = line.match(/(\d*)\w*(\n|$)/gm);
      return match && match[0] && !acc.includes(match[0])
        ? acc.concat(match[0])
        : acc;
    }, []);

    pids = pids.filter(x => x != 0);
    pids = pids.flatMap(x => ['/PID', x]);
    pids.unshift('/F');

    return spawnSync('TaskKill', pids);
  }

  let cmd = `lsof -i ${method === 'udp' ? 'udp' : 'tcp'}:${port} | grep ${
    method === 'udp' ? 'UDP' : 'LISTEN'
    } | awk '{print $2}' | xargs -r kill -9`;

  return execSync(cmd);
}

exports.killPort = killPort;
