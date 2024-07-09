import * as msal from '@azure/msal-browser';

import { getSsoClients } from '../utils/get-sso-clients';

const createMsalInstance = (key: string) => {
  const ssoConfig = getSsoClients(key);
  if (!ssoConfig) {
    const inventtaConfig = getSsoClients('inventta');

    const msalConfig = {
      auth: {
        clientId: inventtaConfig.authClient,
        authority: `https://login.microsoftonline.com/${inventtaConfig.authTennant}`,
        redirectUri: inventtaConfig.redirect,
      },
    };
  
    const msalInstance = new msal.PublicClientApplication(msalConfig);

    return {
      msalInstance,
      hasSSO: false,
    };
  };

  const msalConfig = {
    auth: {
      clientId: ssoConfig.authClient,
      authority: `https://login.microsoftonline.com/${ssoConfig.authTennant}`,
      redirectUri: ssoConfig.redirect,
    },
  };

  const msalInstance = new msal.PublicClientApplication(msalConfig);

  return {
    msalInstance,
    hasSSO: true,
  };
};

export { createMsalInstance };
