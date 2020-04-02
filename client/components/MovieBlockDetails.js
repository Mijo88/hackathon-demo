import React from 'react';

function MovieBlockDetails({ title, media, genres }) {
  return (
    <div className="movie-block-info">
      <h3 className="movie-block-title">{title}</h3>
      <p className="movie-block-media">
        <strong>Media: </strong>
        {media}
      </p>
      <p className="movie-block-genres">
        <strong>Genres: </strong>
        {genres}
      </p>
    </div>
  );
}

export default MovieBlockDetails;
