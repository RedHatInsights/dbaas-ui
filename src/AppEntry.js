import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { init } from './store';
import App from './App';
import { getBaseName } from '@redhat-cloud-services/frontend-components-utilities/helpers';

const basename = getBaseName(window.location.pathname);
const AppEntry = () => (
  <Provider store={init().getStore()}>
    <Router basename={basename}>
      <App basename={basename} />
    </Router>
  </Provider>
);

export default AppEntry;
