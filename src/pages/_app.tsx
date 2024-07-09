import { LayoutApp } from '@components/Layout';
import { MsalProvider } from '@azure/msal-react';
import { Loading } from '@components/LoadingPage';
import GlobalStyles from '@styles/global';
import { theme } from '@styles/theme/primary';
import { ProviderAuth } from 'contexts/AuthContext';
import { ConfigProvider } from 'contexts/ConfigContext';
import { IdeaProvider } from 'contexts/Idea';
import { NotificationsProvider } from 'contexts/Notification';
import Head from 'next/head';
import 'react-loading-skeleton/dist/skeleton.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from 'styled-components';
import { createMsalInstance } from 'services/msal';
import { useEffect, useState } from 'react';
import { IPublicClientApplication } from '@azure/msal-browser';
import { REGEX_URL } from 'utils/constants';
import { InactivityWatcher } from '@components/InactivityWatcher';
import { ProviderListenSize } from '../contexts/ListenSize';

const development = process.env.NODE_ENV === 'development';

const pathnamesWithoutWrapper = ['login', 'change-password'];

export default function MyApp({
  Component,
  pageProps,
  router: { asPath },
}): JSX.Element {
  const [msalInstance, setMsalInstance] =
    useState<IPublicClientApplication | null>(null);
  useEffect(() => {
    if (window) {
      const url = window.location.href;
      const slug = REGEX_URL.exec(url) ? REGEX_URL.exec(url)[1] : null;
      localStorage.setItem('slug', slug);

      const { msalInstance, hasSSO } = createMsalInstance(slug);
      setMsalInstance(msalInstance);
      localStorage.setItem('hasSSO', hasSSO.toString());
    }
  }, []);
  const hasWrapper = !pathnamesWithoutWrapper.some(path => {
    return asPath.includes(path);
  });

  if (!msalInstance) return <Loading />;

  return (
    <MsalProvider instance={msalInstance}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <ToastContainer />
        <ProviderAuth>
          <ConfigProvider>
            <NotificationsProvider>
              <IdeaProvider>
                <Head>
                  <title>Avantt.i</title>
                </Head>
                <Loading>
                  <ProviderListenSize>
                    <LayoutApp>
                      <Component {...pageProps} />
                      {hasWrapper && !development && <InactivityWatcher />}
                    </LayoutApp>
                  </ProviderListenSize>
                </Loading>
              </IdeaProvider>
            </NotificationsProvider>
          </ConfigProvider>
        </ProviderAuth>
      </ThemeProvider>
    </MsalProvider>
  );
}
