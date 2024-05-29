import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Loadiing } from './styles';

export const Loading: React.FC = ({ children }): JSX.Element => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    router.events.on('routeChangeStart', () => setLoading(true));
    router.events.on('routeChangeComplete', () => setLoading(false));
    router.events.on('routeChangeError', () => setLoading(false));

    return () => {
      router.events.off('routeChangeStart', () => setLoading(true));
      router.events.off('routeChangeComplete', () => setLoading(false));
      router.events.off('routeChangeError', () => setLoading(false));
    };
  });

  return loading ? (
    <Loadiing>
      <div className="loading">
        <div />
        <div />
        <div />
      </div>
    </Loadiing>
  ) : (
    <div>{children}</div>
  );
};
