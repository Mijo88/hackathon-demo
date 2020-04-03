const fetch = require('node-fetch');

const { API_KEY } = process.env;

// base path external api
const basePath = 'https://api.themoviedb.org/3';

// helper that turns an array of key / value pairs into a query string
function constructQueryString(queryArray) {
  return queryArray
    .map((query) => query.join('='))
    .join('&');
}

// wrapper for fetching data from external api
const fromMoviedbApi = (path, query) => new Promise((resolve) => {
  const fullPath = `${basePath}${path}?api_key=${API_KEY}`;

  const additionalQueries = query
    ? constructQueryString(query)
    : null;

  const resource = additionalQueries
    ? `${fullPath}&${additionalQueries}`
    : fullPath;

  fetch(resource)
    .then((response) => {
      if (response.status !== 200) {
        resolve({ error: response.status });
        return true;
      }

      return response.json();
    })
    .then((json) => resolve(json))
    .catch((err) => ({ error: err.message }));
});

module.exports = {
  fromMoviedbApi,
};
