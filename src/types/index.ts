export type AccountsAccessToken = {
  auths: {
    [domain: string]: {
      auth: string;
      email?: string;
    };
  };
};

export type OCMErrorResponse = {
  kind: string;
  id: string;
  href: string;
  code: string;
  reason?: string;
};

export type PullSecret = {
  userId?: string;
  orgId: string;
} & AccountsAccessToken;

export function objectIsAccessToken(
  obj: AccountsAccessToken | OCMErrorResponse
): obj is AccountsAccessToken {
  return 'auths' in obj;
}
