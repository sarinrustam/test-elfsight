import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
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

store.dispatch(DataOperation.loadAlbums());
store.dispatch(DataOperation.loadPhotos());
store.dispatch(DataOperation.loadUsers());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
