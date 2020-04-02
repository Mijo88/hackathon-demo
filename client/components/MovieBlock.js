import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { MovieDBContext } from '../contexts';
import Poster from './Poster';
import MovieBlockDetails from './MovieBlockDetails';

class MovieBlock extends Component {
  render() {
    const { movieData } = this.props;
    const { moviedbConf, moviedbGenres } = this.context;
    const { title } = movieData;

    const genres = movieData.genre_ids.map((genreID) => {
      const { name } = moviedbGenres.find(({ id }) => id === genreID);
      return name;
    }).join(', ');

    return (
      <div className="movie-block">
        <Link to={`/movies/${movieData.id}`}>
          <Poster
            posterPath={movieData.poster_path}
            altText={title}
            moviedbConf={moviedbConf}
          />
        </Link>
        <MovieBlockDetails
          title={title}
          media={movieData.media_type}
          genres={genres}
        />
      </div>
    );
  }
}

MovieBlock.contextType = MovieDBContext;

export default MovieBlock;
