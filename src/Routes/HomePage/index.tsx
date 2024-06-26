/* eslint react/prop-types: 0 */
import React from 'react';
import useChrome from '@redhat-cloud-services/frontend-components/useChrome';

import {
  Button,
  Divider,
  Flex,
  FlexItem,
  Grid,
  GridItem,
  List,
  ListItem,
  PageSection,
  Popover,
  Split,
  SplitItem,
  Stack,
  StackItem,
  Text,
  TextContent,
  Title,
} from '@patternfly/react-core';
import ExternalLinkSquareAltIcon from '@patternfly/react-icons/dist/esm/icons/external-link-square-alt-icon';
import { PageHeader } from '@redhat-cloud-services/frontend-components/PageHeader';
import {
  getTrustificationDeploymentGuide,
  getTrustificationUrl,
} from './consts';
import events from '../../common/analytics';
import './home-page.scss';
import { Table, Tbody, Td, Th, Thead, Tr } from '@patternfly/react-table';

const HomePage = () => {
  const { analytics } = useChrome();

  return (
    <React.Fragment>
      <PageHeader className="dbaas-home-page__header pf-v5-u-p-2xl">
        <Grid>
          <GridItem sm={12} md={6}>
            <Title size="2xl" headingLevel="h1">
              Discover the Power of Red Hat Trusted Profile Analyzer for SBOM
              Management – Available Now!
            </Title>
            <Stack hasGutter>
              <StackItem>
                <TextContent className="dbaas-home-page__subtitle">
                  <Text>&nbsp;</Text>
                  <Text>
                    Enhance your software integrity with the unique capabilities
                    of the all-new Red Hat Trusted Profile Analyzer (RHTPA).
                    This robust tool not only swiftly locates Software Bill of
                    Materials (SBOMs) and Vulnerability Exploitability eXchange
                    (VEX) documents but also provides Red Hat Dependency
                    Analytics reports, all customized for your organization{"'"}
                    s products and packages.
                  </Text>

                  <Text component="h4">Key Benefits:</Text>
                  <List>
                    <ListItem>
                      Manage and store {'"'}Software bill of materials{'"'} to
                      accurately identify the components in use and their
                      locations.
                    </ListItem>
                    <ListItem>
                      Analyze and secure the use of open source and third-party
                      components.
                    </ListItem>
                    <ListItem>
                      Uncover all component dependencies and identify known
                      vulnerabilities or license risks.
                    </ListItem>
                    <ListItem>
                      Ensure compliance with security regulations such as the
                      Cyber Supply Chain Act, GDPR, and PCI.
                    </ListItem>
                  </List>
                  <Text>
                    Interested in RHTPA? Click <b>Install on Premise</b> to
                    install on your cluster or <b>Subscribe</b> to dive in. With
                    it, you can quickly explore Red Hat{"'"}s SBOM and VEX
                    product data and even upload your own SBOMs for thorough
                    analysis.
                  </Text>
                  <Split hasGutter style={{ paddingTop: 17 }}>
                    <SplitItem>
                      <Split hasGutter>
                        <SplitItem>
                          <Button
                            onClick={() => {
                              analytics.track(events.TC_LAUNCH_1_CLICK);
                              window.open(getTrustificationUrl(), '_blank');
                              return false;
                            }}
                            variant="primary"
                            ouiaId="button-launch-tc-1"
                            size="lg"
                            isBlock
                          >
                            Subscribe and launch
                          </Button>
                        </SplitItem>
                        <SplitItem>
                          <Button
                            onClick={() => {
                              analytics.track(
                                events.TC_OPEN_DEPLOYMENT_GUIDE_CLICK
                              );
                              window.open(
                                getTrustificationDeploymentGuide(),
                                '_blank'
                              );
                              return false;
                            }}
                            variant="secondary"
                            ouiaId="button-open-deployment-guide-tc-1"
                            size="lg"
                            isBlock
                            className="white-button"
                          >
                            Install on premises
                          </Button>
                        </SplitItem>
                      </Split>
                    </SplitItem>
                  </Split>
                  <Text
                    component="small"
                    style={{
                      marginTop: 5,
                      color: 'var(--pf-v5-global--Color--light-100)',
                    }}
                  >
                    Red Hat Trusted Profile Analyzer is available{' '}
                    <u>for free</u> to console customers for a limited time.
                  </Text>
                  <Text>&nbsp;</Text>

                  <Text>
                    Red Hat Dependency Analytics is a companion tool that
                    increases trust and integrity in source code and accelerates
                    the application development process by providing
                    recommendations for trusted components, software composition
                    analysis and vulnerability remediation tactics directly in
                    your IDE.
                  </Text>
                  <Split hasGutter>
                    <SplitItem>
                      <Popover
                        aria-label="Subcribe popover"
                        headerContent={<div>Red Hat Dependency Analytics</div>}
                        bodyContent={
                          <div>
                            <Table variant="compact">
                              <Thead>
                                <Tr>
                                  <Th>IDE</Th>
                                  <Th>Automation</Th>
                                </Tr>
                              </Thead>
                              <Tbody>
                                <Tr>
                                  <Td>
                                    <Button
                                      variant="link"
                                      component="a"
                                      href="https://marketplace.visualstudio.com/items?itemName=redhat.fabric8-analytics"
                                      target="_blank"
                                      icon={<ExternalLinkSquareAltIcon />}
                                      iconPosition="end"
                                      onClick={() =>
                                        analytics.track(
                                          events.TC_VSCODE_PLUGIN_CLICK
                                        )
                                      }
                                      style={{ padding: 0 }}
                                    >
                                      VSCode
                                    </Button>
                                  </Td>
                                  <Td>
                                    <Button
                                      variant="link"
                                      component="a"
                                      href="https://hub.tekton.dev/tekton/task/redhat-dependency-analytics"
                                      target="_blank"
                                      icon={<ExternalLinkSquareAltIcon />}
                                      iconPosition="end"
                                      onClick={() =>
                                        analytics.track(
                                          events.TC_TEKTON_PLUGIN_CLICK
                                        )
                                      }
                                      style={{ padding: 0 }}
                                    >
                                      Tekton
                                    </Button>
                                  </Td>
                                </Tr>
                                <Tr>
                                  <Td>
                                    <Button
                                      variant="link"
                                      component="a"
                                      href="https://plugins.jetbrains.com/plugin/12541-red-hat-dependency-analytics"
                                      target="_blank"
                                      icon={<ExternalLinkSquareAltIcon />}
                                      iconPosition="end"
                                      onClick={() =>
                                        analytics.track(
                                          events.TC_INTELLIJ_PLUGIN_CLICK
                                        )
                                      }
                                      style={{ padding: 0 }}
                                    >
                                      IntelliJ
                                    </Button>
                                  </Td>
                                  <Td>
                                    <Button
                                      variant="link"
                                      component="a"
                                      href="https://plugins.jenkins.io/redhat-dependency-analytics/"
                                      target="_blank"
                                      icon={<ExternalLinkSquareAltIcon />}
                                      iconPosition="end"
                                      onClick={() =>
                                        analytics.track(
                                          events.TC_JENKINS_PLUGIN_CLICK
                                        )
                                      }
                                      style={{ padding: 0 }}
                                    >
                                      Jenkins
                                    </Button>
                                  </Td>
                                </Tr>
                              </Tbody>
                            </Table>
                          </div>
                        }
                      >
                        <Button
                          variant="secondary"
                          ouiaId="button-launch-tc-1"
                          size="lg"
                          className="white-button"
                        >
                          Download
                        </Button>
                      </Popover>
                    </SplitItem>
                  </Split>
                </TextContent>
              </StackItem>
            </Stack>
          </GridItem>
        </Grid>
      </PageHeader>

      {
        <PageSection
          variant="light"
          className="appsrv-marketing--page-section--marketing pf-v5-u-background-color-100"
        >
          <Flex justifyContent={{ default: 'justifyContentSpaceBetween' }}>
            <Flex>
              <FlexItem spacer={{ default: 'spacerXl' }}>&nbsp;</FlexItem>
            </Flex>

            <Flex flex={{ default: 'flex_1' }}>
              <FlexItem className="rh-icon-flex">
                <Stack>
                  <StackItem>
                    <div className="pf-v5-u-text-align-center rh-secure rh-icon">
                      &nbsp;
                    </div>
                  </StackItem>
                  <StackItem>
                    <div className="pf-v5-u-text-align-center">
                      Get recommendations and <br />
                      fixes right in your IDE
                    </div>
                  </StackItem>
                </Stack>
              </FlexItem>
            </Flex>

            <Divider className="pf-m-vertical" />

            <Flex flex={{ default: 'flex_1' }}>
              <FlexItem className="rh-icon-flex">
                <Stack>
                  <StackItem>
                    <div className="pf-v5-u-text-align-center rh-clipboard rh-icon">
                      &nbsp;
                    </div>
                  </StackItem>
                  <StackItem>
                    <div className="pf-v5-u-text-align-center">
                      Find SBOMs or VEXes for your
                      <br /> Red Hat package or product
                    </div>
                  </StackItem>
                </Stack>
              </FlexItem>
            </Flex>

            <Divider className="pf-m-vertical" />

            <Flex flex={{ default: 'flex_1' }}>
              <FlexItem className="rh-icon-flex">
                <Stack>
                  <StackItem>
                    <div className="pf-v5-u-text-align-center rh-shield rh-icon">
                      &nbsp;
                    </div>
                  </StackItem>
                  <StackItem>
                    <div className="pf-v5-u-text-align-center">
                      Upload your own SBOM to learn more
                      <br /> about dependencies and vulnerabilities
                    </div>
                  </StackItem>
                </Stack>
              </FlexItem>
            </Flex>

            <Flex>
              <FlexItem spacer={{ default: 'spacerXl' }}>&nbsp;</FlexItem>
            </Flex>
          </Flex>
        </PageSection>
      }

      <PageSection>
        <Split hasGutter>
          <SplitItem span={6} isFilled className="border-gray">
            <Stack hasGutter>
              <StackItem className="inner-title pad-bottom">
                Not Just Trust. Verifiable Trust.
              </StackItem>
              <StackItem className="pad-bottom">
                <p>
                  Search and use trusted verified artifacts delivered with
                  provenance, signatures, and attestation. Enable developers to
                  choose the dependencies they trust and enable security teams
                  to verify that trust.
                </p>
              </StackItem>
              <StackItem className="pad-bottom">
                <div className="venn-img">&nbsp;</div>
              </StackItem>
            </Stack>
          </SplitItem>
          <SplitItem span={6} isFilled className="border-gray">
            <Stack hasGutter>
              <StackItem className="inner-title pad-bottom">
                Shift Security Left. Recognize your dependencies early.
              </StackItem>
              <StackItem className="pad-bottom">
                <p>
                  Making trusted choices early in the software development life
                  cycle does not have to be difficult. Red Hat Dependency
                  Analytics (RHDA) plugs into your IDE to analyze your
                  transitive dependencies and offer recommendations on when to
                  use Red Hat packages.
                </p>
              </StackItem>
              <StackItem className="inner-title pad-bottom">
                Take advantage of Red Hat expertise.
              </StackItem>
              <StackItem className="pad-bottom">
                <p>
                  Red Hat has over 20 years of experience curating, building,
                  and delivering secure software. Organizations, globally, have
                  taken advantage of Red Hat&apos;s dedicated product security
                  team to monitor, identify, and address vulnerabilities for all
                  of Red Hat&apos;s product portfolio - extending that expertise
                  from OpenSource to the Enterprise.
                </p>
              </StackItem>
              <StackItem>
                <Stack>
                  <StackItem>
                    <Button
                      onClick={() => {
                        analytics.track(events.TC_LAUNCH_2_CLICK);
                        window.open(getTrustificationUrl(), '_blank');
                        return false;
                      }}
                      variant="primary"
                      ouiaId="button-launch-tc-2"
                      size="lg"
                    >
                      Subscribe and launch
                    </Button>
                  </StackItem>
                  <StackItem>
                    <Text
                      component="small"
                      style={{
                        marginTop: 5,
                      }}
                    >
                      Red Hat Trusted Profile Analyzer is available{' '}
                      <u>for free</u> to console customers for a limited time.
                    </Text>
                  </StackItem>
                </Stack>
              </StackItem>
            </Stack>
          </SplitItem>
        </Split>
      </PageSection>
    </React.Fragment>
  );
};

HomePage.displayName = 'HomePage';

export default HomePage;
