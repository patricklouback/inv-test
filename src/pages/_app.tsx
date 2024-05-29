import { MsalProvider } from '@azure/msal-react';
import { LayoutApp } from '@components/Layout';
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
import { ProviderListenSize } from '../contexts/ListenSize';
import { msalInstance } from '../services/msal';

function MyApp({ Component, pageProps }): JSX.Element {
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

export default MyApp;
