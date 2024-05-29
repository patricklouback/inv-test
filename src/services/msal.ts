import * as msal from '@azure/msal-browser';

const msalConfig = {
  auth: {
    clientId: `${process.env.NEXT_PUBLIC_AUTH_CLIENT_ID_LAB}`,
    authority: `https://login.microsoftonline.com/${process.env.NEXT_PUBLIC_AUTH_TENANT_GUID_LAB}`,
    redirectUri: `${process.env.NEXT_PUBLIC_REDIRECT_URL_LAB}`,
  },
};

const msalInstance = new msal.PublicClientApplication(msalConfig);

export { msalInstance };

