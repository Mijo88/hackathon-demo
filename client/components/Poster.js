import React from 'react';

function Poster(props) {
  const {
    moviedbConf,
    posterPath,
    altText,
    size,
  } = props;

  const baseImagePath = moviedbConf.images.base_url;
  const imageSize = size || 'w342';
  const imageSourcePath = baseImagePath + imageSize + posterPath;

  return (
    <figure className="poster">
      <img
        className="poster-image"
        src={imageSourcePath}
        alt={altText}
      />
    </figure>
  );
}

export default Poster;
