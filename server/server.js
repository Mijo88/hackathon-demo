require('dotenv').config();
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./logger');
const moviedb = require('./moviedb');

const app = express();

const port = process.env.PORT || 3000;

// apply middleware
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger.requests);

//  apply router
app.use('/api/moviedb', moviedb.api);

app.get('*', (_, res) => (
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
));


app.listen(port, () => logger.listener(port));
