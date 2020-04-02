import React from 'react';

function MovieDetails({ data }) {
  const { title, tagline } = data;

  const details = [
    ['Status', data.status],
    ['Release date', data.release_date],
    ['Rating', data.vote_average],
    ['Overview', data.overview],
  ];

  const listItems = details.map((detail) => {
    const [desc, value] = detail;
    return (
      <li key={desc}>
        <strong>{desc}: </strong>
        {value}
      </li>
    );
  });

  return (
    <div className="movie-details">
      <h3 className="movie-title">{title}</h3>
      {tagline ? (
        <p><small>{tagline}</small></p>
      ) : (
        null
      )}
      <ul className="movie-info-list">
        {listItems}
      </ul>
    </div>
  );
}

export default MovieDetails;
