const fetch = require('node-fetch');

const { API_KEY } = process.env;

const basePath = 'https://api.themoviedb.org/3';

function constructQueryString(queryArray) {
  return queryArray
    .map((query) => query.join('='))
    .join('&');
}

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
        return;
      }

      return response.json();
    })
    .then((json) => resolve(json));
});

module.exports = {
  fromMoviedbApi,
};
