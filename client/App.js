import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import { fetchJSON } from './util';
import { MovieDBContext } from './contexts';
import 'regenerator-runtime';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFetching: true,
      imagePath: {},
      genreMap: {},
    };
  }

  componentDidMount() {
    this.initialize();
  }

  normalizeData = (...args) => {
    const [configData, genresData] = args;
    const { images } = configData;
    const { genres } = genresData;

    const genreMap = genres.reduce((map, entry) => {
      /* eslint-disable no-param-reassign */
      map[entry.id] = entry.name;
      return map;
    }, {});

    const sizeCount = images.poster_sizes.length;

    const imagePath = {
      posterLarge: images.base_url + images.poster_sizes[sizeCount - 1],
      posterMedium: images.base_url + images.poster_sizes.find((size) => {
        const sizeInt = Number(size.replace(/\D/g, ''));
        if (Number.isNaN(sizeInt)) return false;

        return sizeInt > 200 && sizeInt <= 500;
      }),
    };

    return { imagePath, genreMap };
  }

  async initialize() {
    const [configData, genresData] = await Promise.all([
      fetchJSON('/config'),
      fetchJSON('/genres'),
    ]);

    if (configData.error || genresData.error) {
      // TODO: add proper error handling
      console.log('Oops! Something went terribly wrong!');
      return;
    }

    const normalizedData = this.normalizeData(configData, genresData);
    this.setState({ ...normalizedData, isFetching: false });
  }

  render() {
    const { isFetching, imagePath, genreMap } = this.state;

    const movieDBContext = {
      imagePath,
      genres: genreMap,
    };

    return (
      <Router>
        {isFetching ? (
          <h1>Fetching data...</h1>
        ) : (
          <MovieDBContext.Provider value={movieDBContext}>
            <Switch>

              <Route exact path="/media">
                <h1>All Media</h1>
              </Route>

              <Route exact path="/media/:type">
                <h1>Specific</h1>
              </Route>

              <Route path="/media/:type/:id">
                <h1>Single Movie</h1>
              </Route>

              <Route exact path="/">
                <Redirect to="/media" />
              </Route>

              <Route>
                <h1>404 - Page Not Found</h1>
              </Route>

            </Switch>
          </MovieDBContext.Provider>
        )}
      </Router>
    );
  }
}

export default App;
