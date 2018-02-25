const express = require('express');
const morgan = require('morgan');
const http = require('http');
const cors = require('cors');
const jsonParser = require('body-parser').json;
const mongoose = require('mongoose');
const socketIO = require('socket.io');

mongoose.connect('mongodb://localhost:27017/iotDB');
const db = mongoose.connection;

db.on('error', err => {
  console.error(`Error while connecting to DB: ${err.message}`);
});
db.once('open', () => {
  console.log('DB connected successfully!');
});

const app = express();
app.use(morgan(':req[x-forwarded-for] - :remote-addr - [:date] ":method :url HTTP/:http-version" :status :res[content-length]'));
app.use(jsonParser());
app.use(express.static(__dirname + '/public'));

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

const routes = require('./routes.js');
routes(app);

const server = http.createServer(app);
const port = process.env.PORT || 3001;
const io = socketIO(server);

module.exports = {
  'app': app,
  'socket_io': io,
  'start': function(env) {
    server.listen(port, () => console.log(`HTTP Server is listening on 127.0.0.1:${port}`));
  } 
};