const express = require('express');
const { fetch } = require('./util');

const router = express.Router();


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

// fetch the api configuration data required to construct image sources
router.get('/config', async (_, res) => {
  const json = await fetch.fromMoviedbApi('/configuration');
  res.json(json);
});

// fetch all the genres (id, name pairs) that the client needs to display name by id
router.get('/genres', async (_, res) => {
  const json = await fetch.fromMoviedbApi('/genre/movie/list');
  res.json(json);
});

// fetch additional movie data
router.get('/movies/:id', async (req, res) => {
  const { id } = req.params;

  const json = await fetch.fromMoviedbApi(`/movie/${id}`);
  res.json(json);
});

// fetch trending movies based on specified query from the client
router.get('/trending', async (req, res) => {
  const { mediaType, timeWindow } = req.query;

  const json = await fetch.fromMoviedbApi(`/trending/${mediaType}/${timeWindow}`);
  res.json(json);
});

module.exports.api = router;
