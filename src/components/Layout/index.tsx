import { AuthContext } from 'contexts/AuthContext';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { api } from 'services/api';
import Footer from '../Elements/Footer';
import Header from '../Elements/Header';
import { LayoutContainer, Loading } from './styles';

export function LayoutApp({ children }): JSX.Element {
  const router = useRouter();
  const { asPath } = useRouter();
  const { token, user, loading } = useContext(AuthContext);

  const isNotPublicPath = asPath !== '/login' && asPath !== '/change-password';

  const paramsHeader = {
    hasUserInfo: true,
    isAdmin: user?.isAdmin,
    isManager: user?.isManager,
    data: {
      name: user?.name,
      image: user?.image,
    },
  };

  async function sendUnloadRequest(): Promise<void> {
    try {
      await api.post('/users/sessions/end-access');
    } catch (error) {
      console.error('Erro ao enviar a requisição:', error);
    }
  }

  async function sendUrl(url): Promise<void> {
    try {
      await api.post('/users/sessions/register-page', { currentURL: url });
    } catch (error) {
      console.error('Erro ao enviar a URL da página para o backend:', error);
    }
  }

  useEffect(() => {
    if (window.location.pathname === '/') sendUrl(window.location.pathname);

    router.events.on('routeChangeStart', sendUrl);

    window.addEventListener('beforeunload', sendUnloadRequest);

    return () => {
      router.events.off('routeChangeStart', sendUrl);
      window.removeEventListener('beforeunload', sendUnloadRequest);
    };
  }, [router]);

  return loading ? (
    <Loading>
      <div className="loading">
        <div />
        <div />
        <div />
      </div>
    </Loading>
  ) : (
    <>
      {token && isNotPublicPath && <Header {...paramsHeader} />}
      <LayoutContainer>{children}</LayoutContainer>
      {token && isNotPublicPath && <Footer />}
    </>
  );
}
