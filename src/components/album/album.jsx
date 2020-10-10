import React from 'react';
import PropTypes from 'prop-types';

const Album = (props) => {
  const {title, imageSrc, photosCount} = props.album;

  return (
    <li style={ {backgroundImage: `url(${imageSrc})`, display: 'flex'} }>
      <p>{title}</p>
      <p>{photosCount}</p>
    </li>
  );
}; 

export default Album;