import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { store } from './app/store';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));

// const store = createStore(reducers, compose(applyMiddleware(thunk)));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>
);


