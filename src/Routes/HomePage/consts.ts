export const RHOpenShiftServiceName = 'Red Hat OpenShift Service';

export const ClusterTypeAndNameMapping = {
  ARO: 'Azure Red Hat OpenShift',
  OSD: 'Openshift Dedicated',
  MOA: 'Red Hat OpenShift Service on AWS',
};

export const RHODAClusterAddonMode = {
  Detecting: 'Detecting',
  Install: 'Install',
  Upgrade: 'Upgrade',
  Create: 'Create',
};

export const CREATE_CLUSTER_HREF = `${document.baseURI}openshift/create `;
export const UPGRADE_CLUSTER_HREF = `${document.baseURI}openshift/details/s/{subscriptionID}#machinePools`;
export const INSTALL_ADDON_HREF = `${document.baseURI}openshift/details/s/{subscriptionID}#addOns`;
export const RHODA_ADDON_ID = 'dbaas-operator';
export const ARO_QUICK_START_GUIDE_HREF =
  'https://access.redhat.com/documentation/en-us/red_hat_openshift_database_access/1/html-single/quick_start_guide/index#manual-installation-of-openshift-database-access-on-azure-red-hat-openshift';

export const textContent = {
  cancelClusterAction: 'Cancel',
  createClusterAction: 'Create new cluster',
  createClusterContent:
    'Clicking Create new cluster redirects you to the OpenShift Cluster Manager where you can create a cluster, and install the OpenShift Database Access add-on.',
  createClusterDescription:
    'We didn’t detect any clusters. The minimal requirement for installing OpenShift Database Access is running OpenShift Container Platform (OCP) 4.10 or higher.',
  createClusterLabel:
    'Create a new cluster with the installation prerequisites',
  detectingClustersTitle: 'Detecting clusters…',
  installingClustersTitle: 'Installing add-on…',
  heroCallToActionButton: 'Learn more about OpenShift Database Access',
  heroDescription:
    'Accelerate your data science. OpenShift Database Access is a managed cloud service for data scientists and developers of intelligent applications. Within a fully supported sandbox, it allows businesses to rapidly develop, train, and test artificial intelligence (AI) and machine learning (ML) models using Red Hat and partner technology.',
  heroTagline: 'Add-on service for managed OpenShift',
  heroTitle: 'Get started with Red Hat OpenShift Database Access',
  heroTryItButton: 'Try it in the sandbox',
  heroViewDemo: 'View the demo',
  installButton: 'Install it on a cluster',
  installClusterAction: 'Install',
  installClusterContent:
    'The OpenShift Database Access add-on will be installed on the selected cluster. You can remove it later by accessing the Add-ons menu in the OpenShift Cluster Manager(OCM)',
  installClusterDescription:
    'We detected clusters that meet the pre-requisites for installing OpenShift Database Access.',
  installClusterSelectTitlePopoverContent:
    'A list of clusters that have a minimum required version of OpenShift 4.10 to be compatible with the OpenShift Database Access add-on.',
  installClusterTitle: 'Install OpenShift Database Access on your cluster',
  createClusterTitle: 'Clusters were not detected',
  selectClusterLabel: 'Existing clusters:',
  upgradeAction: 'Upgrade',
  upgradeClusterCPUs: 'At least 8 CPUs per node',
  upgradeClusterDescription:
    'We detected your clusters, but none meet the installation prerequisites. To install OpenShift Database Access, you can upgrade an existing cluster, or create a new one that meets the prerequisites.',
  upgradeClusterMemory: 'At least 32 GB of memory per node',
  upgradeClusterNodes: 'At least 2 worker nodes',
  upgradeClusterPrerequisites:
    'For this cluster to meet installation prerequisites, it must have:',
  upgradeClusterSelectDescription:
    "We'll automatically install OpenShift Database Access after the upgrade.",
  upgradeClusterSelectLabel: 'Select a cluster to upgrade',
  videoSectionInThisVideo:
    'In this video you’ll learn how to quickly build and deploy artificial intelligence and machine learning models using Red Hat and partner technology tools.',
  videoSectionTitle: 'Demo of Red Hat OpenShift Database Access',
  AROClusterAlertContent:
    'Installing OpenShift Database Access on an Azure Red Hat OpenShift (ARO) cluster requires a different process. See the Red Hat OpenShift Database Access Quick Start Guide for more details.',
};

export const getTrustificationUrl = () => {
  return window.location.hostname.indexOf('stage.') === -1
    ? 'https://trust.rhcloud.com'
    : 'https://staging.trustification.dev';
};
