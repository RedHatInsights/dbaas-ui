import React, { Fragment, useEffect } from 'react';
import NotificationsPortal from '@redhat-cloud-services/frontend-components-notifications/NotificationPortal';

import Routes from './Routes';
import './App.scss';

const App = () => {
  useEffect(() => {
    document.title = 'Trusted Content | Red Hat OpenShift Application Services';
  }, []);

  return (
    <Fragment>
      <NotificationsPortal />
      <Routes />
    </Fragment>
  );
};

export default App;
