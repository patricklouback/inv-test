import nookies from 'nookies';
import { GetServerSidePropsContext } from 'next';

export const getCookie = (
  key: string,
  req?: GetServerSidePropsContext['req'],
) => {
  const cookies = nookies.get({ req }, null);
  return cookies[key];
};

export const setCookie = (key: string, value: string, time?: number) => {
  nookies.set(null, key, value, {
    maxAge: time,
    path: '/',
  });
};

export const removeCookie = (key: string) => {
  nookies.destroy(null, key);
};
