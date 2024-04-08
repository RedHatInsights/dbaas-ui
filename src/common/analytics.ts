// all analytics events for trusted artifact signer go here
const TrustedArtifactSignerEvents = {
  TAS_PULL_SECRET_DOWNLOAD_CLICKED: 'tas-ui-clicked-download-pull-secret',
  TAS_DOCUMENTATION_CLICKED: 'tas-ui-clicked-documentation',
};

// all analytics events for trusted profile analyzer go here
const TrustedContentEvents = {
  TC_WAITING_LIST_CLICK: 'tc-learn-more-1-click',
  TC_LAUNCH_1_CLICK: 'tc-launch-1-click',
  TC_LAUNCH_2_CLICK: 'tc-launch-2-click',
  TC_VSCODE_PLUGIN_CLICK: 'tc-vscode-plugin-click',
  TC_INTELLIJ_PLUGIN_CLICK: 'tc-intellij-plugin-click',
  TC_TEKTON_PLUGIN_CLICK: 'tc-tekton-plugin-click',
  TC_JENKINS_PLUGIN_CLICK: 'tc-tekton-jenkins-click',
  TC_OPEN_DEPLOYMENT_GUIDE_CLICK: 'tc-open-deployment-guide-click',
};

const ANALYTICS_EVENTS = {
  ...TrustedArtifactSignerEvents,
  ...TrustedContentEvents,
};

export default ANALYTICS_EVENTS;
