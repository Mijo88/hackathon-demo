const express = require('express');
const fetch = require('node-fetch');
const moviedbConfig = require('./config.json');

const router = express.Router();

const { API_KEY } = process.env;

router.get('/test', (_, res) => {
  fetch(`https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}`)
    .then((response) => response.json())
    .then((data) => res.json(data));
});

module.exports.api = router;
