const http_server = require('./server');
const udp_server = require('./udp-server');
const udp_client = require('./udp-client');

http_server.start();
udp_server.start();
// udp_client.start();

