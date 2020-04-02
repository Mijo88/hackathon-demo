import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { MovieDBContext } from '../../contexts';
import Poster from '../Poster';
import MovieDetails from '../MovieDetails';
import {
  Page,
  Section,
  Container,
  Column,
} from '../common';

class SingleContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFetching: true,
      movieData: {},
    };
  }

  componentDidMount() {
    this.fetchMovieData();
  }

  fetchMovieData = () => {
    const { moviedbApi } = this.context;
    const { match } = this.props;
    const { id } = match.params;

    fetch(`${moviedbApi}/movies/${id}/`)
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          isFetching: false,
          movieData: json,
        });
      });
  }

  render() {
    const { isFetching, movieData } = this.state;
    const { moviedbConf } = this.context;

    return isFetching ? (
      <Page suffix="movie">

        <Section suffix="main">
          <Container>
            <Column className="col-12">
              <h1 className="text-center">Loading...</h1>
            </Column>
          </Container>
        </Section>

      </Page>
    ) : (
      <Page suffix="movie">

        <Section suffix="main">
          <Container>
            <Column className="col-12">
              <h1 className="text-center">{movieData.title}</h1>
            </Column>
          </Container>
        </Section>

        <Section suffix="movie">
          <Container>
            <Column className="col-6">
              <Poster
                moviedbConf={moviedbConf}
                altText={movieData.title}
                posterPath={movieData.poster_path}
                size="original"
              />
            </Column>
            <Column className="col-6">
              <MovieDetails data={movieData} />
            </Column>
          </Container>
        </Section>

      </Page>
    );
  }
}

SingleContainer.contextType = MovieDBContext;

export default withRouter(SingleContainer);
