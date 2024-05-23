const http = require('http');
const routHandler = require('./routes/user.router');

const server = http.createServer(routHandler);
server.listen(3000, '127.0.0.1', () => {
  console.log('Listening on 127.0.0.1:3000');
});