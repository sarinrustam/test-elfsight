import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import { getAlbumsByUser } from '../../reducer/selectors';
import styled from 'styled-components';

import Album from '../album/album.jsx';

const AlbumsList = styled.ul`
  margin: 0;
  display: flex;
  flex-wrap: wrap;
`;

const AlbumItemWrapper = styled.li`
  margin-right: 20px;
  margin-bottom: 20px;
  list-style: none;
`;

const AlbumsTitle = styled.p`
  margin: 15px 0 15px 0;
  font-size: 24px;
  line-height: 26px;
  font-weight: 600;
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
        {albums.map((album) => {
          console.log(album)
          return (
            <AlbumItemWrapper key={album.id}>
              <Album album={album}/>
            </AlbumItemWrapper>
          )
        })}
      </AlbumsList>
      </>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    albums: getAlbumsByUser(state),
  };
};

export default connect(mapStateToProps, null)(Albums);