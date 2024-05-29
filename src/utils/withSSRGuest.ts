import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next';
import { getCookie } from 'cookies-next';

export function withSSRGuest<T>(fn: GetServerSideProps<T>): GetServerSideProps {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<T>> => {
    const token = getCookie('authentication', {
      req: ctx.req,
      res: ctx.res,
    });

    if (token) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    return fn(ctx);
  };
}
