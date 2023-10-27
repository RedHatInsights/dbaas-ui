import React, { Suspense, lazy, useEffect } from 'react';

import { Spinner, Stack, StackItem } from '@patternfly/react-core';
import { Main } from '@redhat-cloud-services/frontend-components/Main';
import { PageHeaderTitle } from '@redhat-cloud-services/frontend-components/PageHeader';
import useChrome from '@redhat-cloud-services/frontend-components/useChrome';

const ArtifactSignerComponent = lazy(
  () => import('../../components/ArtifactSigner/artifact-signer')
);

import './artifact-signer.scss';
import { useDownloadPullSecret, useSteps, useDocumentation } from '../../hooks';

/**
 * https://reactjs.org/docs/components-and-props.html
 * https://medium.com/@thejasonfile/dumb-components-and-smart-components-e7b33a698d43
 */
const ArtifactSignerPage = () => {
  const { appAction } = useChrome();
  const { nextStep, prevStep, step } = useSteps();
  const { handleDownloadPullSecret, userHasDownloadedSecret } =
    useDownloadPullSecret();
  const { handleDocumentationClick } = useDocumentation();

  useEffect(() => {
    appAction('secure-sign');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <div
        style={{
          paddingLeft: '2.5rem',
          paddingTop: '1rem',
          paddingBottom: '1rem',
        }}
      >
        <PageHeaderTitle title="Artifact Signer" />
        <p>
          Enables cryptographic signing, verification and provenance of software
        </p>
      </div>
      <Main>
        <Stack hasGutter>
          <StackItem>
            <Suspense fallback={<Spinner />}>
              <ArtifactSignerComponent
                nextStep={nextStep}
                previousStep={prevStep}
                currentStep={step}
                onDownloadSecret={handleDownloadPullSecret}
                userHasDownloadedSecret={userHasDownloadedSecret}
                onDocumentationClick={handleDocumentationClick}
              />
            </Suspense>
          </StackItem>
        </Stack>
      </Main>
    </React.Fragment>
  );
};

ArtifactSignerPage.displayName = 'Trusted Artifact Signer';

export { ArtifactSignerPage };
