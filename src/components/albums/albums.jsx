import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { getAlbumsByUser } from '../../reducer/selectors';

import Album from '../album/album.jsx';

const AlbumsList = styled.ul`
  margin: 0;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 0;
`;

const AlbumItemWrapper = styled.li`
  margin-right: 20px;
  margin-left: 20px;
  margin-bottom: 20px;
  list-style: none;
`;

const AlbumsTitle = styled.p`
  margin: 15px 0 30px 0;
  font-size: 24px;
  line-height: 26px;
  font-weight: 600;

  @media (min-width: 1280px) {
    font-size: 30px;
    line-height: 34px;
  }
`;

class Albums extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { albums } = this.props;
    return (
      <>
        <AlbumsTitle>Альбомы</AlbumsTitle>
        <AlbumsList>
          {albums.map((album) => (
            <AlbumItemWrapper key={album.id}>
              <Link to={`/album/${album.id}`}><Album album={album} /></Link>
            </AlbumItemWrapper>
          ))}
        </AlbumsList>
      </>
    );
  }
}

Albums.propTypes = {
  albums: PropTypes.shape([]).isRequired,
};

const mapStateToProps = (state) => ({
  albums: getAlbumsByUser(state),
});

export default connect(mapStateToProps, null)(Albums);
