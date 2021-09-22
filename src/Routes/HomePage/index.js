import React from 'react';

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
import VideoIcon from '@patternfly/react-icons/dist/js/icons/video-slash-icon';

import './home-page.scss';

const HomePage = () => {
  return (
    <React.Fragment>
      <PageHeader className="dbaas-home-page__header pf-u-p-xl">
        <Grid>
          <GridItem sm={12} md={6}>
            <Title size="2xl" headingLevel="h1">
              Get started with OpenShift Database Access
            </Title>
            <TextContent>
              <Text size="lg" className="dbaas-home-page__subtitle">
                Add-on service for managed OpenShift
              </Text>
              <Text>
                Easily discover, consume, monitor, and manage databases as a
                service on the managed OpenShift Platform. OpenShift database
                access helps accelerate your development for applications that
                use MongoDB Atlas and Crunchy Bridge managed database services.
              </Text>
            </TextContent>
            <div className="pf-u-mt-lg">
              <Button
                iconPosition="right"
                icon={<ExternalLinkAltIcon />}
                component="a"
                target="_blank"
                variant="secondary"
                href="https://access.redhat.com/documentation/en-us/red_hat_managed_data_services/1/html-single/red_hat_openshift_database_access_quick_start_guide/index"
              >
                Get Started with accessing databases from OpenShift
              </Button>
            </div>
          </GridItem>
        </Grid>
      </PageHeader>
      <Main className="pf-u-p-xl">
        <Title className="pf-u-mb-xl" headingLevel="h2" size="xl">
          Demo of OpenShift Database Access
        </Title>
        <Stack hasGutter>
          <StackItem>
            <Grid hasGutter>
              <GridItem md={6} sm={12}>
                <TextContent>
                  <Text>
                    <b>For database admins.</b> In this video you’ll learn how
                    as a database admin you can access your purchased MongoDB
                    Atlas and/or Crunchy Bridge managed database service to your
                    managed OpenShift Cluster.
                  </Text>
                </TextContent>
                <Button
                  iconPosition="right"
                  icon={<ExternalLinkAltIcon />}
                  target="_blank"
                  className="pf-u-mt-xl"
                  component="a"
                  variant="secondary"
                  href="https://youtu.be/QmF5da2LvnU "
                >
                  View the demo
                </Button>
              </GridItem>
              <GridItem md={6} sm={12}>
                <iframe
                  style={{ width: '100%', height: '315px' }}
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/QmF5da2LvnU"
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
                <TextContent>
                  <Text>
                    <b>For database developers.</b> In this video you’ll learn
                    how as a developer you can quickly build and deploy an
                    application using the database access service in a few
                    simple steps.
                  </Text>
                </TextContent>
                <Button
                  iconPosition="right"
                  icon={<ExternalLinkAltIcon />}
                  target="_blank"
                  className="pf-u-mt-xl"
                  component="a"
                  variant="secondary"
                  href="https://youtu.be/wEcqQziu17o"
                >
                  View the demo
                </Button>
              </GridItem>
              <GridItem md={6} sm={12}>
                <iframe
                  style={{ width: '100%', height: '315px' }}
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/wEcqQziu17o"
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
