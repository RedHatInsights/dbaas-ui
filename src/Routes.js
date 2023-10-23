import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';

import { Bullseye, Spinner } from '@patternfly/react-core';

// eslint-disable-next-line prettier/prettier
const HomePage = lazy(() =>
  import(/* webpackChunkName: "HomePage" */ './Routes/HomePage')
);
const OopsPage = lazy(() =>
  import(/* webpackChunkName: "OopsPage" */ './Routes/OopsPage/OopsPage')
);
const TASPage = lazy(() =>
  import(/* webpackChunkName: "TASPage" */ './Routes/ArtifactSignerPage')
);

const Routes = () => (
  <Suspense
    fallback={
      <Bullseye>
        <Spinner />
      </Bullseye>
    }
  >
    <Switch>
      <Route path="/artifact-signer">
        <TASPage />
      </Route>
      <Route path="/">
        <HomePage />
      </Route>
      <Route>
        <OopsPage />
      </Route>
    </Switch>
  </Suspense>
);

export default Routes;
