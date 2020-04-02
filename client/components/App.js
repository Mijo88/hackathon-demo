import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import 'regenerator-runtime';

import { MovieDBContext } from '../contexts';
import { Column, Section, Container } from './common';
import { MoviesContainer, SingleContainer } from './container';
import Header from './Header';
import NotFound from './NotFound';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moviedbConf: null,
      moviedbGenres: [],
      moviedbApi: 'http://localhost:5000/api/moviedb',
      isFetching: true,
    };
  }

  componentDidMount() {
    this.fetchRequiredData();
  }

  async fetchRequiredData() {
    const { moviedbApi } = this.state;

    const moviedbConf = await fetch(`${moviedbApi}/config`)
      .then((res) => res.json());

    const moviedbGenres = await fetch(`${moviedbApi}/genres`)
      .then((res) => res.json());

    this.setState({
      moviedbConf,
      moviedbGenres: moviedbGenres.genres,
      isFetching: false,
    });
  }

  render() {
    const {
      moviedbConf,
      moviedbGenres,
      moviedbApi,
      isFetching,
    } = this.state;

    const movieDBContext = {
      moviedbConf,
      moviedbGenres,
      moviedbApi,
    };

    return (
      <div className="app">
        <Router>
          <Header />
          {isFetching ? (
            <Section suffix="main">
              <Container>
                <Column className="col-12">
                  <h1 className="text-center">Fetching data...</h1>
                </Column>
              </Container>
            </Section>
          ) : (
            <MovieDBContext.Provider value={movieDBContext}>
              <Switch>

                <Route exact path="/movies">
                  <MoviesContainer />
                </Route>

                <Route path="/movies/:id">
                  <SingleContainer />
                </Route>

                <Route exact path="/">
                  <Redirect to="/movies" />
                </Route>

                <Route>
                  <NotFound />
                </Route>

              </Switch>
            </MovieDBContext.Provider>
          )}
        </Router>
      </div>
    );
  }
}

export default App;
