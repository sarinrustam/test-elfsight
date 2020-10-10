import React from 'react';
import './App.css';
import Albums from './components/albums/albums.jsx';
import { connect } from "react-redux";
import { isLoaded } from './reducer/selectors';

const App = (props) => {
  const renderAlbums = () => props.isLoaded ? <Albums/> : '';
  
  return (
    <div className="App">
      <header className="App-header">
        {renderAlbums()}
      </header>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoaded: isLoaded(state),
  };
}

export default connect(mapStateToProps, null)(App);
