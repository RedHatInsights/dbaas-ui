import React, { useMemo } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { init } from './store';
import App from './App';
import { getBaseName } from '@redhat-cloud-services/frontend-components-utilities/helpers';
import useChrome from '@redhat-cloud-services/frontend-components/useChrome';

const AppEntry = () => {
  const chrome = useChrome();
  const basename = useMemo(
    () => getBaseName(window.location.pathname, chrome.isBeta() ? 3 : 2),
    []
  );
  return (
    <Provider store={init().getStore()}>
      <Router basename={basename}>
        <App basename={basename} />
      </Router>
    </Provider>
  );
};

export default AppEntry;
