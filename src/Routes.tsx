import React, { Suspense, lazy } from 'react';
import { Route, Routes as RouterRoutes } from 'react-router-dom';

import { Bullseye, Spinner } from '@patternfly/react-core';

// eslint-disable-next-line prettier/prettier
const HomePage = lazy(() =>
  import(/* webpackChunkName: "HomePage" */ './Routes/HomePage')
);
const TASPage = lazy(
  () => import(/* webpackChunkName: "TASPage" */ './Routes/ArtifactSignerPage')
);

const Routes = () => (
  <Suspense
    fallback={
      <Bullseye>
        <Spinner />
      </Bullseye>
    }
  >
    <RouterRoutes>
      <Route path="artifact-signer/*" element={<TASPage />} />
      <Route path="/" element={<HomePage />} />
    </RouterRoutes>
  </Suspense>
);

export default Routes;
