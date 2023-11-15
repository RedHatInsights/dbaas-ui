import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getRegistry } from '@redhat-cloud-services/frontend-components-utilities/Registry';
import NotificationsPortal from '@redhat-cloud-services/frontend-components-notifications/NotificationPortal';
import { notificationsReducer } from '@redhat-cloud-services/frontend-components-notifications/redux';
import useChrome from '@redhat-cloud-services/frontend-components/useChrome';
import { useNavigate } from "react-router-dom";

import Routes from './Routes';
import './App.scss';

const App = () => {
  let navigate = useNavigate();
  const chrome = useChrome();

  useEffect(() => {
    const registry = getRegistry();
    registry.register({ notifications: notificationsReducer });
    chrome.init();
    const unregister = insights.chrome.on('APP_NAVIGATION', (event) => {
      if (event?.domEvent?.href) {
        navigate(event?.domEvent?.href)
      }
    });
    document.title = 'Trusted Content | Red Hat OpenShift Application Services';
    return () => {
      unregister();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      <NotificationsPortal />
      <Routes />
    </Fragment>
  );
};

App.propTypes = {
  basename: PropTypes.string.isRequired,
};

export default App;
