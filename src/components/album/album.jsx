import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const AlbumItem = styled.div`
  box-sizing: border-box;
  background-image: url(${(props) => props.src});
  background-repeat: no-repeat;
  display: flex;
  width: 150px;
  height: 150px;
  padding: 10px;
`;

const Title = styled.p`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
  text-align: left;
`;

const CountPhotos = styled(Title)`
  align-self: flex-end;
`;

const Album = (props) => {
  const { title, photosCount, imageSrc } = props.album;
  return (
    <AlbumItem src={imageSrc}>
      <Title>{title}</Title>
      <CountPhotos>{photosCount}</CountPhotos>
    </AlbumItem>
  );
};

Album.propTypes = {
  album: PropTypes.shape({
    title: PropTypes.string.isRequired,
    photosCount: PropTypes.number.isRequired,
    imageSrc: PropTypes.string.isRequired,
  }).isRequired,
};

export default Album;
