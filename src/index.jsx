import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './components/app/app.jsx';
import { createAPI } from './api/api';
import { createStore, applyMiddleware } from 'redux';
import { Operation as DataOperation, reducer } from './reducer/data';
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const api = createAPI();

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument(api))
  )
);
store.dispatch(DataOperation.loadUsers());
store.dispatch(DataOperation.loadAlbums());
store.dispatch(DataOperation.loadPhotos());


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
