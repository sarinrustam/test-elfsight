import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import { getAlbumsByUser } from '../../reducer/selectors';

import Album from '../album/album.jsx';

class Albums extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { albums } = this.props;
    return (
      <ul>
        {albums.map((album) => {
          console.log(album)
          return <Album key={album.id} album={album}/>
        })}
      </ul>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    albums: getAlbumsByUser(state),
  };
};

export default connect(mapStateToProps, null)(Albums);