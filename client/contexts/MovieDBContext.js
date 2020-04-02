import React from 'react';

const MovieDBContext = React.createContext({
  moviedbApi: '',
  moviedbConf: {},
  moviedbGenres: [],
});

export default MovieDBContext;
