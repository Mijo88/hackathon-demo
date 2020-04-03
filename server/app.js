const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./logger');
const moviedb = require('./moviedb');

const app = express();

// add middleware
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger.requests);

// add routers
app.use('/api/moviedb', moviedb.api);

// serve the index page on any get request and let the client handle the route
app.get('*', (_, res) => (
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
));

module.exports = app;
