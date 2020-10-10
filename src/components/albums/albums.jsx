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

class Albums extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { albums } = this.props;
    return (
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
    );
  }
};

const mapStateToProps = (state) => {
  return {
    albums: getAlbumsByUser(state),
  };
};

export default connect(mapStateToProps, null)(Albums);