require('dotenv').config();
const express = require('express');
const http = require('http');
const socket = require('socket.io');

const app = express();
const server = http.createServer(app);
const socketIO = socket.listen(server);

socketIO.on('connection', (socket) => {
  console.log('socket is working');
  require('./routes')(socket);
});

server.listen(8080);
