// all analytics events for trusted artifact signer go here
const TrustedArtifactSignerEvents = {
  TAS_PULL_SECRET_DOWNLOAD_CLICKED: 'tas-ui-clicked-download-pull-secret',
  TAS_DOCUMENTATION_CLICKED: 'tas-ui-clicked-documentation',
};

// all analytics events for trusted content go here
const TrustedContentEvents = {};

const ANALYTICS_EVENTS = {
  ...TrustedArtifactSignerEvents,
  ...TrustedContentEvents,
};

export default ANALYTICS_EVENTS;
