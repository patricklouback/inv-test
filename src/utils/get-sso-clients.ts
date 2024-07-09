interface EnvConfig {
  redirect: string;
  authClient: string;
  authTennant: string;
}

export const getSsoClients = (key: string): EnvConfig | null => {
  const envConfig = {
    inventta: {
      redirect: process.env.NEXT_PUBLIC_REDIRECT_URL_LAB,
      authClient: process.env.NEXT_PUBLIC_AUTH_CLIENT_ID_LAB,
      authTennant: process.env.NEXT_PUBLIC_AUTH_TENANT_GUID_LAB,
    },
    pkr: {
      redirect: process.env.NEXT_PUBLIC_REDIRECT_URL_PARKER,
      authClient: process.env.NEXT_PUBLIC_AUTH_CLIENT_ID_PARKER,
      authTennant: process.env.NEXT_PUBLIC_AUTH_TENANT_GUID_PARKER,
    },
    votorantim: {
      redirect: process.env.NEXT_PUBLIC_REDIRECT_URL_VOTORANTIM,
      authClient: process.env.NEXT_PUBLIC_AUTH_CLIENT_ID_VOTORANTIM,
      authTennant: process.env.NEXT_PUBLIC_AUTH_TENANT_GUID_VOTORANTIM,
    },
    accamargo: {
      redirect: process.env.NEXT_PUBLIC_REDIRECT_URL_ACC,
      authClient: process.env.NEXT_PUBLIC_AUTH_CLIENT_ID_ACC,
      authTennant: process.env.NEXT_PUBLIC_AUTH_TENANT_GUID_ACC,
    },
  };

  return envConfig[key] || null;
};