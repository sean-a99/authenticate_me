import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import * as ReactDOMClient from 'react-dom/client'
import csrfFetch from './store/csrf';
import configureStore from './store';
import * as sessionActions from './store/session';
import { restoreSession } from './store/session';


const root = ReactDOMClient.createRoot(document.getElementById('root'))

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
  window.csrfFetch = csrfFetch;
  window.sessionActions = sessionActions;
}

function Root() {
  return(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  )
}

const renderApp = () => {
  root.render(
    <React.StrictMode>
      <Root />
    </React.StrictMode>
  );
}


if (sessionStorage.getItem('X-CSRF-Token') === null) {
  restoreSession().then(renderApp);
} else {
  renderApp();
}

