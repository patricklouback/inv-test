declare namespace NodeJS {
    interface ProcessEnv {
        NEXT_PUBLIC_API: string;
        NEXT_PUBLIC_API_HML: string;

        NEXT_PUBLIC_WEBSITE_URL: string;

        NEXT_PUBLIC_REDIRECT_URL_LAB: string;
        NEXT_PUBLIC_REDIRECT_URL_PARKER: string;
        NEXT_PUBLIC_REDIRECT_URL_VOTORANTIM: string;
        NEXT_PUBLIC_REDIRECT_URL_ACC: string;

        NEXT_PUBLIC_AUTH_CLIENT_ID_LAB: string;
        NEXT_PUBLIC_AUTH_CLIENT_ID_PARKER: string;
        NEXT_PUBLIC_AUTH_CLIENT_ID_VOTORANTIM: string;
        NEXT_PUBLIC_AUTH_CLIENT_ID_ACC: string;

        NEXT_PUBLIC_AUTH_TENANT_GUID_LAB: string;
        NEXT_PUBLIC_AUTH_TENANT_GUID_PARKER: string;
        NEXT_PUBLIC_AUTH_TENANT_GUID_VOTORANTIM: string;
        NEXT_PUBLIC_AUTH_TENANT_GUID_ACC: string;
    }
  }
  