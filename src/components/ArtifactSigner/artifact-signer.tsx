import './artifact-signer.scss';
import {
  Button,
  Text,
  TextContent,
  TextVariants,
} from '@patternfly/react-core';
import { ExternalLinkSquareAltIcon } from '@patternfly/react-icons';
import React from 'react';
import { ExternalLink } from '../ExternalLink';

type ArtifactSignerProps = {
  currentStep: number;
  onDownloadSecret: () => void;
  onDocumentationClick: () => void;
  userHasDownloadedSecret: boolean;
  nextStep: () => void;
  previousStep: () => void;
};

const GettingStarted = () => {
  return (
    <div>
      <TextContent>
        <Text component={TextVariants.p}>
          Trusted Artifact Signer empowers software developers and consumers to
          securely sign and verify software artifacts - source code, release
          files, images, binaries, SBOM, playbook, and more to enhance software
          supply chain security. Signing metadata are stored in a
          tamper-resistant log for transparency & verification.
        </Text>
        <Text component={TextVariants.p}>
          Trusted Artifact Signer provides a production ready deployment of the{' '}
          <ExternalLink href={'https://www.sigstore.dev/'} testId={''}>
            Sigstore project
          </ExternalLink>{' '}
          within an enterprise.
        </Text>
      </TextContent>
    </div>
  );
};

type DownloadPullSecretStepProps = {
  onDownloadSecret: () => void;
  onDocumentationClick: () => void;
};
const DownloadPullSecretStep = ({
  onDownloadSecret,
  onDocumentationClick,
}: DownloadPullSecretStepProps) => {
  return (
    <div
      style={{
        marginTop: '1rem',
      }}
    >
      <TextContent>
        <Text component={TextVariants.p}>
          To get started, download the pull secret needed for your deployment.
        </Text>
        <div
          style={{
            flexDirection: 'row',
            display: 'flex',
          }}
        >
          <Button variant="primary" onClick={onDownloadSecret}>
            Download Pull Secret
          </Button>
          <Button
            variant="link"
            onClick={onDocumentationClick}
            iconPosition="right"
            icon={<ExternalLinkSquareAltIcon />}
          >
            Trusted Artifact Signer Documentation
          </Button>
        </div>
      </TextContent>
    </div>
  );
};

const ArtifactSigner: React.FC<ArtifactSignerProps> = ({
  onDownloadSecret,
  onDocumentationClick,
}: ArtifactSignerProps) => {
  return (
    <div
      className="secure-sign-component"
      id="secure-sign-component"
      style={{
        paddingLeft: '1rem',
      }}
    >
      <GettingStarted />
      <DownloadPullSecretStep
        onDownloadSecret={onDownloadSecret}
        onDocumentationClick={onDocumentationClick}
      />
    </div>
  );
};

ArtifactSigner.displayName = 'ArtifactSigner';

export default ArtifactSigner;
