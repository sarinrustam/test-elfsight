import React from 'react';
import PropTypes from 'prop-types';
import { Router, Route, Switch } from 'react-router-dom';
import '../../styles/App.css';
import { connect } from 'react-redux';
import Albums from '../albums/albums.jsx';
import Photos from '../photos/photos.jsx';
import { isLoaded } from '../../reducer/selectors';
import history from '../../history';

const App = (props) => {
  const renderAlbums = () => (props.isLoaded ? <Albums /> : '');
  const renderPhotos = (albumId) => (props.isLoaded ? <Photos albumId={albumId} /> : '');

  return (
    <Router history={history}>
      <Switch>
        <>
          <div className="App">
            <section className="App-header">
              <Route exact path="/" render={() => renderAlbums()} />
              <Route
                exact
                path="/album/:id"
                render={(localProps) => {
                  const albumId = parseInt(localProps.match.params.id, 10);

                  return renderPhotos(albumId);
                }}
              />
            </section>
          </div>
        </>
      </Switch>
    </Router>
  );
};

App.propTypes = {
  isLoaded: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isLoaded: isLoaded(state),
});

export default connect(mapStateToProps, null)(App);
