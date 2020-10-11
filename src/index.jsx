import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import './styles/index.css';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createAPI } from './api/api';
import { Operation as DataOperation, reducer } from './reducer/data';
import App from './components/app/app.jsx';

const api = createAPI();

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk.withExtraArgument(api)))
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
