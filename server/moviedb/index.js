const express = require('express');
const fetch = require('node-fetch');
const moviedbConfig = require('./config.json');

const router = express.Router();

const { API_KEY } = process.env;

const setAllowCors = (_, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
};

// allow CORS for this router
router.use(setAllowCors);

router.get('/test', (_, res) => {
  fetch(`https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}`)
    .then((response) => response.json())
    .then((data) => res.json(data));
});

module.exports.api = router;
