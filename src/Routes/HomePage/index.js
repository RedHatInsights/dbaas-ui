import React, { Suspense, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import {
  Button,
  StackItem,
  Stack,
  Title,
  Text,
  Spinner,
  TextContent,
  Grid,
  GridItem,
  CardBody,
  Card,
  Bullseye,
} from '@patternfly/react-core';
import { Main } from '@redhat-cloud-services/frontend-components/Main';
import {
  PageHeader,
  PageHeaderTitle,
} from '@redhat-cloud-services/frontend-components/PageHeader';
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
        <Grid hasGutter>
          <GridItem md={6} sm={12}>
            <TextContent>
              <Text>
                In this video you’ll learn how as a database admin you can
                assign your purchased MongoDB Atlas and/or Crunchy Bridge
                managed database service to your managed OpenShift Cluster.
              </Text>
            </TextContent>
            <Button
              iconPosition="right"
              icon={<ExternalLinkAltIcon />}
              target="_blank"
              className="pf-u-mt-xl"
              component="a"
              variant="secondary"
            >
              View the demo
            </Button>
          </GridItem>
          <GridItem md={6} sm={12}>
            <Card>
              <CardBody>
                <Bullseye className="dbaas-home-page__video-card">
                  <div>
                    <Title headingLevel="h3" size="lg">
                      Video is comming soon
                    </Title>
                    <Bullseye>
                      <VideoIcon
                        size="xl"
                        color="var(--pf-global--danger-color--100)"
                      />
                    </Bullseye>
                  </div>
                </Bullseye>
              </CardBody>
            </Card>
          </GridItem>
        </Grid>
      </Main>
    </React.Fragment>
  );
};

export default HomePage;
