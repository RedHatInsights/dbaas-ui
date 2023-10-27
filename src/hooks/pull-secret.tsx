import React from 'react';
import { useDispatch } from 'react-redux';
import useChrome from '@redhat-cloud-services/frontend-components/useChrome';
import type {
  PullSecret,
  OCMErrorResponse,
  AccountsAccessToken,
} from '../types';
import { objectIsAccessToken } from '../types';
import {
  addNotification,
  clearNotifications,
} from '@redhat-cloud-services/frontend-components-notifications/redux';
import events from '../common/analytics';

export function useAccountsAccessToken() {
  const [bearerToken, setBearerToken] = React.useState<string | undefined>(
    undefined
  );
  const [accessToken, setAccessToken] = React.useState<
    AccountsAccessToken | undefined
  >(undefined);
  const { auth } = useChrome();

  // only run this on mount
  React.useEffect(() => {
    clearNotifications();
    void auth.getToken().then((t) => setBearerToken(t));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (typeof bearerToken === 'undefined') {
      console.log('authToken is undefined');
      return;
    }
    // TODO(RobotSail): Replace this with useSWR or react query to automatically handle refetch logic
    fetchAccessToken(bearerToken).then((r) => {
      if (!objectIsAccessToken(r)) {
        console.error(
          'received error response from createAuthorizationToken',
          r
        );
        return;
      }
      console.log('received authorization token');
      setAccessToken(r);
    });
  }, [bearerToken]);

  return { accessToken };
}

async function fetchAccessToken(
  bearerToken: string
): Promise<AccountsAccessToken | OCMErrorResponse> {
  const response = await fetch(
    'https://api.openshift.com/api/accounts_mgmt/v1/access_token',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    }
  );
  return (await response.json()) as AccountsAccessToken | OCMErrorResponse;
}

export const useDownloadPullSecret = () => {
  const { accessToken } = useAccountsAccessToken();
  const { analytics, auth } = useChrome();
  const dispatch = useDispatch();
  const [userHasDownloadedSecret, setUserHasDownloadedSecret] =
    React.useState(false);

  const downloadPullSecret = React.useCallback(async () => {
    // pull secret can't be downloaded
    if (typeof accessToken === 'undefined') {
      console.error(
        'could not download pull secret, access token is undefined'
      );
      dispatch(
        addNotification({
          variant: 'danger',
          title: 'Could not download the pull secret',
          description: (
            <p>
              User Access Token is empty. Please try refreshing the page and
              checking the console output for errors.
            </p>
          ),
        })
      );
      return;
    }

    // get user's orgID & userID
    const user = await auth.getUser();
    if (typeof user === 'undefined') {
      console.error('could not download pull secret, user object is undefined');
      dispatch(
        addNotification({
          variant: 'danger',
          title: 'Could not get user information',
          description: <p>Could not read the user object.</p>,
        })
      );
      return;
    }

    const pullSecret: PullSecret = {
      ...accessToken,
      orgId: user.identity.org_id,
      userId: user.identity.account_number,
    };

    const rawPullSecret = new Blob([JSON.stringify(pullSecret)], {
      type: 'application/json;charset=utf-8',
    });

    // Create a URL for the file blob
    const url = URL.createObjectURL(rawPullSecret);

    // Create a new anchor element to trigger the download
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pull-secret.json';

    // Append the anchor element to the body
    document.body.appendChild(a);

    // Trigger the download
    a.click();

    // Remove the anchor element from the body
    document.body.removeChild(a);

    // Revoke the URL to free up memory
    URL.revokeObjectURL(url);

    setUserHasDownloadedSecret(true);
  }, [accessToken, auth, dispatch, setUserHasDownloadedSecret]);

  const handleDownloadPullSecret = React.useCallback(async () => {
    analytics.track(events.TAS_PULL_SECRET_DOWNLOAD_CLICKED);
    downloadPullSecret();
  }, [analytics, downloadPullSecret]);
  return {
    userHasDownloadedSecret,
    handleDownloadPullSecret,
  };
};
