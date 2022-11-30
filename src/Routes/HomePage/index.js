import React from 'react';
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
} from '@patternfly/react-core';
import { Main } from '@redhat-cloud-services/frontend-components/Main';
import { PageHeader } from '@redhat-cloud-services/frontend-components/PageHeader';
import ExternalLinkAltIcon from '@patternfly/react-icons/dist/js/icons/external-link-alt-icon';

import './home-page.scss';

const { analytics } = useChrome();

const HomePage = () => {
  return (
    <React.Fragment>
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
                    Simplifies and standardizes how teams provision, monitor,
                    and connect to cloud-hosted partner database services across
                    your environment on the managed OpenShift Platform.
                    OpenShift Database Access helps accelerate your development
                    for applications that use MongoDB Atlas, Crunchy Bridge,
                    CockroachDB Dedicated and Amazon RDS (MySQL, PostgreSQL,
                    MariaDB, Oracle BYOL, or SQL Server) cloud database
                    services.
                  </Text>
                </TextContent>
              </StackItem>
              <StackItem>
                <Button
                  onClick={() => {
                    analytics.track('rhoda-get-started-click');
                  }}
                  iconPosition="right"
                  icon={<ExternalLinkAltIcon />}
                  component="a"
                  target="_blank"
                  variant="secondary"
                  href="https://access.redhat.com/documentation/en-us/red_hat_openshift_database_access/1/html-single/quick_start_guide/index"
                >
                  Get Started with OpenShift Database Access
                </Button>
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
