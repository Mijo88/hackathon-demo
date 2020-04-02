import React, { Component } from 'react';
import { MovieDBContext } from '../../contexts';
import MovieBlock from '../MovieBlock';
import {
  Section,
  Container,
  Page,
  Column,
} from '../common';

class MoviesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      listData: {},
    };
  }

  componentDidMount() {
    this.fetchTrending('movie', 'week');
  }

  fetchTrending = (mediaType, timeWindow) => {
    this.setState({ isFetching: true });
    const { moviedbApi } = this.context;

    fetch(`${moviedbApi}/trending?mediaType=${mediaType}&timeWindow=${timeWindow}`)
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          listData: json,
          isFetching: false,
        });
      });
  }

  render() {
    const { listData, isFetching } = this.state;
    const { results } = listData;

    const movieBlocks = !results
      ? null
      : results.map((movie) => (<MovieBlock key={movie.id} movieData={movie} />));

    return isFetching ? (
      <Page suffix="movies">

        <Section suffix="main">
          <Container>
            <Column className="col-12">
              <h1 className="text-center">Loading...</h1>
            </Column>
          </Container>
        </Section>

      </Page>
    ) : (
      <Page suffix="movies">

        <Section suffix="main">
          <Container>
            <Column className="col-12">
              <h1 className="text-center">Movie List</h1>
            </Column>
          </Container>
        </Section>

        <Section suffix="movies">
          <Container>
            <Column className="col-12 f-wrap justify-center">
              {movieBlocks}
            </Column>
          </Container>
        </Section>

      </Page>
    );
  }
}

MoviesContainer.contextType = MovieDBContext;

export default MoviesContainer;
