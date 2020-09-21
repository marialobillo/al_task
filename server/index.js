const express = require('express');
const routes = require('../routes');
const morgan = require('morgan');

const server = express();
server.use(express.json());
server.use(morgan('dev'));

server.use('/api', routes);

module.exports = server;