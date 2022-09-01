const net = require('net');
const Socket = net.Socket;

async function getFreePort() {
  return new Promise((resolve, reject) => {
    let srv = net.createServer(function(sock) {
      sock.end('Get a free port\n');
    });

    srv.listen(0, function() {
      let port = srv.address().port;
      srv.close();
      resolve(port)
    });    
  });
}

exports.getFreePort = getFreePort;