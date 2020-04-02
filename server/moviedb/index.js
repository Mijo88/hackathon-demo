const path = require('path');
const fs = require('fs');
const express = require('express');
const { fetch } = require('./util');
const moviedbConfig = require('./config.json');

const router = express.Router();

// fetch the API configuration data required to construct image sources
fetch.fromMoviedbApi('/configuration')
  .then((response) => {
    if (response.error) {
      return;
    }

    fs.writeFileSync(
      path.resolve(__dirname, 'config.json'),
      JSON.stringify(response),
      'utf8',
    );
  });

// enable CORS for this api resource
const allowCrossDomain = (_, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
};

// apply middleware
router.use(allowCrossDomain);

// routes
router.get('/config', (_, res) => {
  res.json(moviedbConfig);
});

router.get('/genres', (_, res) => {
  fetch.fromMoviedbApi('/genre/movie/list')
    .then((response) => {
      res.json(response);
    });
});

router.get('/movies/:id', (req, res) => {
  const { id } = req.params;

  fetch.fromMoviedbApi(`/movie/${id}`)
    .then((response) => {
      res.json(response);
    });
});

router.get('/trending', (req, res) => {
  const { mediaType, timeWindow } = req.query;

  fetch.fromMoviedbApi(`/trending/${mediaType}/${timeWindow}`)
    .then((response) => {
      res.json(response);
    });
});

module.exports.api = router;
