/* eslint react/prop-types: 0 */
import React from 'react';
import semver from 'semver';
import { useDispatch } from 'react-redux';
import {
  addNotification,
  clearNotifications,
} from '@redhat-cloud-services/frontend-components-notifications/redux';
import { useState, useCallback, useEffect } from 'react';
import useChrome from '@redhat-cloud-services/frontend-components/useChrome';

import {
  Button,
  Title,
  Text,
  TextContent,
  Grid,
  GridItem,
  Stack,
  StackItem,
  Modal,
  Flex,
  Bullseye,
  Spinner,
  List,
  ListItem,
  Radio,
  Select,
  SelectOption,
  Alert,
  Popover,
  Split,
  SplitItem,
} from '@patternfly/react-core';
import { Main } from '@redhat-cloud-services/frontend-components/Main';
import { PageHeader } from '@redhat-cloud-services/frontend-components/PageHeader';
import { HelpIcon, ExternalLinkAltIcon } from '@patternfly/react-icons';

import {
  RHODAClusterAddonMode,
  CREATE_CLUSTER_HREF,
  UPGRADE_CLUSTER_HREF,
  INSTALL_ADDON_HREF,
  RHODA_ADDON_ID,
  ARO_QUICK_START_GUIDE_HREF,
  textContent,
  ClusterTypeAndNameMapping,
  RHOpenShiftServiceName,
} from './consts';

import './home-page.scss';

const ClusterSelect = ({
  clusters,
  handleSelectCluster,
  selectedCluster,
  isDisabled,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const getClusterTypeAndName = (cluster) => {
    const clusterType =
      cluster.plan?.type !== undefined
        ? ClusterTypeAndNameMapping[cluster.plan?.type]
        : `${RHOpenShiftServiceName} on ${cluster.cloud_provider_id}`;
    return `${cluster.display_name} (${clusterType})`;
  };
  return (
    <Select
      isDisabled={isDisabled}
      data-testid="select-RHODA-cluster"
      onSelect={() => setIsOpen(false)}
      selections={
        selectedCluster
          ? {
              toString: () => getClusterTypeAndName(selectedCluster),
              compareTo: (selectOption) =>
                selectOption === selectedCluster.cluster_id,
            }
          : undefined
      }
      isOpen={isOpen}
      menuAppendTo="parent"
      variant="single"
      onToggle={(isOpen) => setIsOpen(isOpen)}
    >
      {clusters.map((cluster) => (
        <SelectOption
          onClick={() => {
            setIsOpen(false);
            handleSelectCluster(cluster);
          }}
          key={cluster.cluster_id}
          value={{
            toString: () => getClusterTypeAndName(cluster),
            compareTo: (selectOption) => selectOption === cluster.cluster_id,
          }}
        />
      ))}
    </Select>
  );
};

const InstallClusterModalContent = (props) => {
  return (
    <Stack hasGutter>
      <StackItem>
        <TextContent>
          <Text>{textContent.installClusterContent}</Text>
        </TextContent>
      </StackItem>
      <StackItem>
        <TextContent>
          <Text>{textContent.createClusterContent}</Text>
        </TextContent>
      </StackItem>
      <StackItem>
        <Split style={{ alignItems: 'center' }}>
          <SplitItem>
            <TextContent className="pf-u-mb-sm">
              <Text component="p">{textContent.selectClusterLabel}</Text>
            </TextContent>
          </SplitItem>
          <SplitItem style={{ marginLeft: '5px' }}>
            <Popover
              headerContent="Clusters"
              bodyContent={
                <div>
                  <p>{textContent.installClusterSelectTitlePopoverContent}</p>
                  <br />
                  <b>Support clusters</b>
                  <List>
                    <ListItem>Red Hat OpenShift Service on AWS (ROSA)</ListItem>
                    <ListItem>OpenShift Dedicated (OSD)</ListItem>
                    <ListItem>Azure Red Hat OpenShift (ARO)</ListItem>
                  </List>
                </div>
              }
            >
              <button
                type="button"
                aria-label="more info"
                onClick={(e) => e.preventDefault()}
                aria-describedby="more-info"
                className="pf-c-form__group-label-help"
              >
                <HelpIcon noVerticalAlign />
              </button>
            </Popover>
          </SplitItem>
        </Split>
        <ClusterSelect {...props} />
      </StackItem>
      <StackItem>
        {props.selectedCluster && props.selectedCluster.plan?.type === 'ARO' && (
          <Alert
            variant="info"
            isInline
            title="You have selected an ARO cluster"
            className="co-info co-break-word"
          >
            <p>{textContent.AROClusterAlertContent}</p>
            <Button
              variant="link"
              component="a"
              href={ARO_QUICK_START_GUIDE_HREF}
              target="_blank"
              rel="noopener noreferrer"
              icon={<ExternalLinkAltIcon />}
              iconPosition="right"
              isInline
            >
              Quick Start Guide
            </Button>
          </Alert>
        )}
      </StackItem>
    </Stack>
  );
};

const UpgradeClusterModalContent = ({
  handleStrategyChange,
  upgradeStrategy,
  ...props
}) => {
  const upgradeBody = (
    <TextContent>
      <Text component="small">
        {textContent.upgradeClusterSelectDescription}
      </Text>
      <ClusterSelect {...props} isDisabled={upgradeStrategy !== 'Upgrade'} />
      <TextContent>
        <Text>{textContent.upgradeClusterPrerequisites}</Text>
        <List>
          <ListItem>{textContent.upgradeClusterNodes}</ListItem>
          <ListItem>{textContent.upgradeClusterCPUs}</ListItem>
          <ListItem>{textContent.upgradeClusterMemory}</ListItem>
        </List>
      </TextContent>
    </TextContent>
  );
  return (
    <Stack hasGutter>
      <StackItem>
        <Radio
          id="upgrade-cluster"
          name="upgrade-cluster"
          data-testid="radio-RHODA-action-upgrade"
          label={textContent.upgradeClusterSelectLabel}
          onChange={() => handleStrategyChange('Upgrade')}
          isChecked={upgradeStrategy === 'Upgrade'}
          body={upgradeBody}
        />
      </StackItem>
      <StackItem>
        <Radio
          id="create-cluster"
          name="create-cluster"
          data-testid="radio-RHODA-action-create"
          label={textContent.createClusterLabel}
          onChange={() => handleStrategyChange('Create')}
          isChecked={upgradeStrategy === 'Create'}
        />
      </StackItem>
    </Stack>
  );
};

const CreateClusterContent = () => {
  return (
    <TextContent>
      <Text>{textContent.createClusterContent}</Text>
    </TextContent>
  );
};

const ClusterModalContent = ({
  mode,
  clusters,
  handleSelectCluster,
  selectedCluster,
  upgradeStrategy,
  handleStrategyChange,
}) => {
  if (
    mode === RHODAClusterAddonMode.Detecting ||
    mode === RHODAClusterAddonMode.Installing
  ) {
    return (
      <Bullseye>
        <Spinner size="xl" />
      </Bullseye>
    );
  }

  if (mode === RHODAClusterAddonMode.Install) {
    return (
      <InstallClusterModalContent
        selectedCluster={selectedCluster}
        handleSelectCluster={handleSelectCluster}
        clusters={clusters}
      />
    );
  }

  if (mode === RHODAClusterAddonMode.Upgrade) {
    return (
      <UpgradeClusterModalContent
        selectedCluster={selectedCluster}
        handleSelectCluster={handleSelectCluster}
        clusters={clusters}
        upgradeStrategy={upgradeStrategy}
        handleStrategyChange={handleStrategyChange}
      />
    );
  }

  if (mode === RHODAClusterAddonMode.Create) {
    return <CreateClusterContent />;
  }

  return null;
};

function findValidClusterWithNodes(cluster) {
  const hasWorkerNodes = !!cluster.metrics?.find((metric) => {
    return metric && metric.nodes && metric.nodes.compute >= 2;
  });
  return hasWorkerNodes;
}

async function fetchAddonInquirues(cluster) {
  // TODO: FIx the data fetching according the app standards
  await window.insights.chrome.auth.getUser();
  const token = await window.insights.chrome.auth.getToken();
  const getCluster = fetch(
    `https://api.openshift.com/api/clusters_mgmt/v1/clusters/${cluster.cluster_id}/addon_inquiries/${RHODA_ADDON_ID}`,
    {
      method: 'get',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  ).then((d) => d.json());
  return getCluster.then((data) => ({
    clusterId: cluster.cluster_id,
    ...data,
  }));
}

function getEligbleRHODAClusters({ value: { clusterId, ...items } }) {
  const hasAddon = items?.requirements?.every(({ enabled }) => enabled);
  const canInstallAddon = items?.requirements?.every(
    ({ status: { fulfilled } }) => fulfilled
  );
  const minimumClusterVersion = items?.requirements[0]?.data['version.raw_id']
    ?.split('=')[1]
    .trim();
  return { clusterId, hasAddon, canInstallAddon, minimumClusterVersion };
}

async function loadClusters() {
  // TODO: FIx the data fetching according the app standards
  await window.insights.chrome.auth.getUser();
  const token = await window.insights.chrome.auth.getToken();
  const search = `status IN ('Active', 'Reserved')`;
  const clusters = (
    await fetch(
      `https://api.openshift.com/api/accounts_mgmt/v1/subscriptions?search=${search}&fetchMetrics=true`,
      {
        method: 'get',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ).then(function (d) {
      return d.json();
    })
  ).items;
  const clusterswithNodes = clusters.filter((cluster) =>
    findValidClusterWithNodes(cluster)
  );
  const notAROClusters = clusterswithNodes.filter(
    (cluster) => cluster.plan?.type !== 'ARO'
  );
  const clusterAddonInquirues = await Promise.allSettled(
    notAROClusters.map(fetchAddonInquirues)
  );
  const clustersAvailability = clusterAddonInquirues
    .filter(({ status }) => status === 'fulfilled')
    .reduce((acc, value) => {
      const result = getEligbleRHODAClusters(value);
      return {
        ...acc,
        [result.clusterId]: result,
      };
    }, {});
  const installableClusters = clusterswithNodes.filter((cluster) => {
    if (cluster.plan?.type === 'ARO') return true;
    const isVersionCorrect = cluster.metrics?.every(({ openshift_version }) =>
      semver.gt(
        semver.valid(semver.coerce(openshift_version)),
        semver.valid(
          semver.coerce(
            clustersAvailability[cluster.cluster_id]?.minimumClusterVersion
          )
        )
      )
    );
    return (
      clustersAvailability[cluster.cluster_id]?.canInstallAddon &&
      isVersionCorrect
    );
  });
  return {
    installableClusters,
    clusters,
  };
}

const HomePage = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCluster, setSelectedCluster] = useState();
  const [upgradeStrategy, setUpgradeStrategy] = useState('Upgrade');
  const [{ mode, clusters }, setClustersState] = useState({
    clusters: [],
    mode: RHODAClusterAddonMode.Detecting,
  });
  const { analytics } = useChrome();

  const modalActions = (mode) => {
    const isAROClusterSelected =
      selectedCluster && selectedCluster.plan?.type === 'ARO';
    if (
      mode === RHODAClusterAddonMode.Detecting ||
      mode === RHODAClusterAddonMode.Installing
    ) {
      return [];
    }
    if (mode === RHODAClusterAddonMode.Install) {
      return [
        <Button
          isDisabled={isAROClusterSelected}
          variant="primary"
          key="install"
          onClick={() => {
            installAddon();
          }}
          data-testid="install-RHODA-button"
        >
          {textContent.installClusterAction}
        </Button>,
        <Button
          component="a"
          href={CREATE_CLUSTER_HREF}
          variant="secondary"
          key="install"
        >
          {textContent.createClusterAction}
        </Button>,
        <Button
          onClick={() => setIsModalOpen(false)}
          key="cancel"
          variant="link"
          data-testid="install-RHODA-cancel"
        >
          {textContent.cancelClusterAction}
        </Button>,
      ];
    }
    if (mode === RHODAClusterAddonMode.Upgrade) {
      return [
        <Button
          variant="primary"
          key="install"
          component="a"
          data-testid="upgrade-RHODA-button"
          href={
            upgradeStrategy === 'Create'
              ? CREATE_CLUSTER_HREF
              : UPGRADE_CLUSTER_HREF.replace(
                  '{subscriptionID}',
                  selectedCluster?.id || ''
                )
          }
        >
          {upgradeStrategy === 'Create'
            ? textContent.createClusterAction
            : textContent.upgradeAction}
        </Button>,
        <Button
          onClick={() => setIsModalOpen(false)}
          key="cancel"
          variant="link"
          data-testid="install-RHODA-cancel"
        >
          {textContent.cancelClusterAction}
        </Button>,
      ];
    }
    if (mode === RHODAClusterAddonMode.Create) {
      return [
        <Button
          component="a"
          href={CREATE_CLUSTER_HREF}
          variant="primary"
          key="install"
        >
          {textContent.createClusterAction}
        </Button>,
        <Button
          onClick={() => setIsModalOpen(false)}
          key="cancel"
          variant="link"
          data-testid="install-RHODA-cancel"
        >
          {textContent.cancelClusterAction}
        </Button>,
      ];
    }
  };

  const clusterModalDescriptions = {
    [RHODAClusterAddonMode.Install]: textContent.installClusterDescription,
    [RHODAClusterAddonMode.Upgrade]: textContent.upgradeClusterDescription,
    [RHODAClusterAddonMode.Create]: textContent.createClusterDescription,
  };

  const clusterModalTitles = {
    [RHODAClusterAddonMode.Detecting]: textContent.detectingClustersTitle,
    [RHODAClusterAddonMode.Installing]: textContent.installingClustersTitle,
    [RHODAClusterAddonMode.Install]: textContent.installClusterTitle,
    [RHODAClusterAddonMode.Upgrade]: textContent.installClusterTitle,
    [RHODAClusterAddonMode.Create]: textContent.createClusterTitle,
  };

  const getData = useCallback(async () => {
    const { clusters, installableClusters } = await loadClusters();
    if (installableClusters.length > 0) {
      setClustersState({
        mode: RHODAClusterAddonMode.Install,
        clusters: installableClusters,
      });
      //Select the first cluster by default
      setSelectedCluster(installableClusters[0]);
    } else {
      setClustersState({
        mode: RHODAClusterAddonMode.Create,
        clusters,
      });
    }
  }, [loadClusters]);

  const parsePayload = (res) => {
    setIsModalOpen(false);
    setClustersState({ mode: RHODAClusterAddonMode.Detecting, clusters: [] });
    if (res && res.state === 'ready') {
      dispatch(
        addNotification({
          variant: 'success',
          title: 'RHODA add-on successfully installed',
          description: (
            <>
              <p>
                The add-on has been installed on {selectedCluster.display_name}.
                To view the cluster or to interact with it go to the OpenShift
                Cluster Manager (OCM).
              </p>
              <br />
              <Button
                variant="link"
                component="a"
                href={selectedCluster.console_url}
                target="_blank"
                rel="noopener noreferrer"
                icon={<ExternalLinkAltIcon />}
                iconPosition="right"
                isInline
              >
                Go to the OpenShift Cluster Manager console
              </Button>
            </>
          ),
        })
      );
    }

    if (res && res.state === 'installing') {
      dispatch(
        addNotification({
          variant: 'info',
          title: 'Add-on installation in progress',
          description: (
            <>
              <p>
                The Red Hat OpenShift Database Access add-on is being installed
                on the cluster you selected. To monitor the installation
                progress click on the link below.
              </p>
              <br />
              <Button
                variant="link"
                component="a"
                href={INSTALL_ADDON_HREF.replace(
                  '{subscriptionID}',
                  selectedCluster?.id || ''
                )}
                rel="noopener noreferrer"
                icon={<ExternalLinkAltIcon />}
                iconPosition="right"
                isInline
              >
                View progress
              </Button>
            </>
          ),
        })
      );
    }

    if (res && res.kind === 'Error') {
      dispatch(
        addNotification({
          variant: 'danger',
          title: 'RHODA add-on successfully failed',
          description:
            res && res.reason
              ? res.reason
              : `The add-on could not be installed on ${selectedCluster.display_name}.`,
        })
      );
    }
  };

  const installAddon = async () => {
    await window.insights.chrome.auth.getUser();
    const token = await window.insights.chrome.auth.getToken();
    const payload = {
      addon: { id: RHODA_ADDON_ID },
      billing: { billing_model: 'standard' },
    };
    setClustersState({
      mode: RHODAClusterAddonMode.Installing,
    });
    await fetch(
      `https://api.openshift.com/api/clusters_mgmt/v1/clusters/${selectedCluster.cluster_id}/addons`,
      {
        method: 'post',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      }
    )
      .then((response) => response.json())
      .then((data) => parsePayload(data))
      .catch((err) => {
        setIsModalOpen(false);
        setClustersState({
          mode: RHODAClusterAddonMode.Detecting,
          clusters: [],
        });
        dispatch(
          addNotification({
            variant: 'danger',
            title: 'RHODA add-on successfully failed',
            description:
              err && err.reason
                ? err.reason
                : `The add-on could not be installed on ${selectedCluster.display_name}. Please try again later.`,
          })
        );
      });
  };

  const handleInstallModalOpen = () => {
    // eslint-disable-next-line
    analytics.track('rhoda-install-it-on-cluster-button-click');
    getData();
    setIsModalOpen(true);
  };

  const handleSelectCluster = (cluster) => {
    setSelectedCluster(cluster);
  };

  useEffect(() => {
    dispatch(clearNotifications());
  }, []);

  return (
    <React.Fragment>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        variant="medium"
        data-testid="database-access-modal"
        actions={modalActions(mode)}
        title={clusterModalTitles[mode]}
        description={
          mode !== RHODAClusterAddonMode.Detecting ||
          mode !== RHODAClusterAddonMode.Installing ? (
            <Title headingLevel="h2" size="md">
              {clusterModalDescriptions[mode]}
            </Title>
          ) : undefined
        }
      >
        <ClusterModalContent
          upgradeStrategy={upgradeStrategy}
          handleSelectCluster={handleSelectCluster}
          selectedCluster={selectedCluster}
          mode={mode}
          clusters={clusters}
          handleStrategyChange={setUpgradeStrategy}
        />
      </Modal>
      <PageHeader className="dbaas-home-page__header pf-u-p-2xl">
        <Grid>
          <GridItem sm={12} md={6}>
            <Title size="2xl" headingLevel="h1">
              Get started with Red Hat OpenShift Database Access
            </Title>
            <Stack hasGutter>
              <StackItem>
                <TextContent>
                  <Text size="lg" className="dbaas-home-page__subtitle">
                    Add-on service for managed OpenShift
                  </Text>
                  <Text>
                    OpenShift Database Access helps accelerate development for
                    applications using cloud-hosted database services like
                    MongoDB Atlas, Crunchy Bridge, CockroachDB or Amazon’s
                    Aurora and Relational Database Service (RDS) with support
                    for popular database engines, including: MySQL, PostgreSQL,
                    SQL Server, MariaDB, and Oracle.
                  </Text>
                  <Text>
                    To learn more access the &nbsp;
                    <Button
                      onClick={() => {
                        analytics.track('rhoda-get-started-click');
                      }}
                      iconPosition="right"
                      icon={<ExternalLinkAltIcon />}
                      isInline
                      variant="link"
                      component="a"
                      target="_blank"
                      href="https://access.redhat.com/documentation/en-us/red_hat_openshift_database_access/1/html-single/quick_start_guide/index"
                    >
                      quick start guide
                    </Button>
                  </Text>
                </TextContent>
              </StackItem>
              <StackItem>
                <Flex>
                  <Button
                    data-testid="hero-buttonInstall"
                    ouiaId="button-rhoda-install"
                    onClick={handleInstallModalOpen}
                  >
                    {textContent.installButton}
                  </Button>
                  <Button
                    onClick={() => {
                      analytics.track('rhoda-try-it-on-sandbox-button-click');
                    }}
                    iconPosition="right"
                    icon={<ExternalLinkAltIcon />}
                    component="a"
                    target="_blank"
                    variant="secondary"
                    href="https://developers.redhat.com/developer-sandbox"
                  >
                    Try it in the Developer Sandbox
                  </Button>
                </Flex>
              </StackItem>
            </Stack>
          </GridItem>
        </Grid>
      </PageHeader>
      <Main className="pf-u-pt-xl pf-u-pb-xl pf-u-pl-2xl pf-u-pr-2xl">
        <Title className="pf-u-mb-lg" headingLevel="h2" size="xl">
          Demo of OpenShift Database Access
        </Title>
        <Stack hasGutter>
          <StackItem>
            <Grid hasGutter>
              <GridItem md={6} sm={12}>
                <Stack hasGutter>
                  <StackItem>
                    <TextContent>
                      <Text>
                        <b>For database admins:</b> in this video you’ll learn
                        how to set up a cloud database service connection on
                        your OpenShift cluster for self-service consumption by
                        application developers.
                      </Text>
                    </TextContent>
                  </StackItem>
                  <StackItem>
                    <Button
                      onClick={() => {
                        analytics.track('rhoda-video-1-click');
                      }}
                      iconPosition="right"
                      icon={<ExternalLinkAltIcon />}
                      target="_blank"
                      component="a"
                      variant="secondary"
                      href="https://youtu.be/vDrh3SnciL0"
                    >
                      View the demo
                    </Button>
                  </StackItem>
                </Stack>
              </GridItem>
              <GridItem md={6} sm={12}>
                <iframe
                  style={{ width: '100%', height: '315px' }}
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/vDrh3SnciL0"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </GridItem>
            </Grid>
          </StackItem>
          <StackItem>
            <Grid hasGutter>
              <GridItem md={6} sm={12}>
                <Stack hasGutter>
                  <StackItem>
                    <TextContent>
                      <Text>
                        <b>For application developers:</b> in this video, you’ll
                        learn how to quickly and easily connect your application
                        to a cloud database service on your OpenShift cluster.
                      </Text>
                    </TextContent>
                  </StackItem>
                  <StackItem>
                    <Button
                      onClick={() => {
                        analytics.track('rhoda-video-2-click');
                      }}
                      iconPosition="right"
                      icon={<ExternalLinkAltIcon />}
                      target="_blank"
                      component="a"
                      variant="secondary"
                      href="https://youtu.be/qWaAwhxwjWs"
                    >
                      View the demo
                    </Button>
                  </StackItem>
                </Stack>
              </GridItem>
              <GridItem md={6} sm={12}>
                <iframe
                  style={{ width: '100%', height: '315px' }}
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/qWaAwhxwjWs"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </GridItem>
            </Grid>
          </StackItem>
        </Stack>
      </Main>
    </React.Fragment>
  );
};

export default HomePage;
