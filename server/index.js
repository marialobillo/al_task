const express = require('express');
const routes = require('../routes');
const morgan = require('morgan');
const cors = require('cors');

const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(morgan('dev'));
server.use(cors());

server.use('/api', routes);

module.exports = server;