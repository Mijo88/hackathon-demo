const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./logger');
const moviedb = require('./moviedb');

const app = express();

// apply middleware
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger.requests);

//  apply router
app.use('/api/moviedb', moviedb.api);

app.get('*', (_, res) => (
  res.redirect(301, '/')
));

module.exports = app;
