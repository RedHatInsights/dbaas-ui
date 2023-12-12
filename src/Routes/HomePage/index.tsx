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
import { getTrustificationUrl } from './consts';
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
              Get started with Red Hat Trusted Profile Analyzer
            </Title>
            <Stack hasGutter>
              <StackItem>
                <TextContent className="dbaas-home-page__subtitle">
                  <Text>&nbsp;</Text>
                  <Text>
                    Verify trust in components easily by using Red Hat Trusted
                    Profile Analyzer to quickly find Software Bill of Materials
                    (SBOMs) and Vulnerability Exploitability eXchange (VEX) for
                    Red Hat products and packages or upload your own SBOM for
                    analysis. Red Hat Trusted Profile Analyzer is in the
                    beginning stages of offering Red Hat Trusted Content. Check
                    back often for updates. Use what we use, know what we know.
                  </Text>
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
                  </Split>
                  <Text component="small">
                    Service preview is available <u>for free</u> to console
                    customers for a limited time.
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
                <Popover
                  aria-label="Subcribe popover"
                  headerContent={<div>Red Hat Trusted Profile Analyzer</div>}
                  bodyContent={
                    <div>
                      Service preview is available for free to console customers
                      for a limited time.
                    </div>
                  }
                  footerContent={
                    <Button
                      onClick={() => {
                        analytics.track(events.TC_LAUNCH_2_CLICK);
                        window.open(getTrustificationUrl(), '_blank');
                        return false;
                      }}
                      variant="primary"
                      ouiaId="button-launch-tc-2"
                      size="lg"
                      isBlock
                    >
                      Subscribe and launch
                    </Button>
                  }
                >
                  <Button
                    variant="primary"
                    ouiaId="button-get-started-tc-2"
                    size="lg"
                  >
                    Get Started
                  </Button>
                </Popover>
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
