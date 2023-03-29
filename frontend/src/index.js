import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store'
import * as ReactDOMClient from 'react-dom/client'
import csrfFetch, { restoreCSRF } from './store/csrf';

const root = ReactDOMClient.createRoot(document.getElementById('root'))

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
  window.csrfFetch = csrfFetch
}

function Root() {
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
}

const renderApp = () => {
  root.render(
    <React.StrictMode>
      <Root />
    </React.StrictMode>
  );
}

if (sessionStorage.getItem('X-CSRF-Token') === null) {
  restoreCSRF().then(renderApp);
} else {
  renderApp();
}

