import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next';
import { getCookie } from 'utils/storage';
import decode from 'jwt-decode';

type WithSSRAuthOptions = {
  isAdmin?: boolean;
  isManager?: boolean;
  haveFunnelAccess?: boolean;
};

interface JWTProps {
  sub: string;
}

interface UserJWTProps {
  id: string;
  isManager: boolean;
  isAdmin: boolean;
  haveFunnelAccess: boolean;
}

export function withSSRAuth<T>(
  fn: GetServerSideProps<T>,
  options?: WithSSRAuthOptions
): GetServerSideProps {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<T>> => {
    const token = getCookie('authentication', ctx.req);

    if (!token) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }

    if (options) {
      const userSub = decode<JWTProps>(String(token));

      const user = JSON.parse(userSub.sub) as UserJWTProps;

      const { isAdmin, haveFunnelAccess, isManager } = options;

      if (isAdmin && !user.isAdmin) {
        return {
          redirect: {
            destination: '/home',
            permanent: false,
          },
        };
      }

      if (isManager && !user.isAdmin && !user.isManager) {
        return {
          redirect: {
            destination: '/home',
            permanent: false,
          },
        };
      }

      if (
        haveFunnelAccess &&
        !user.isAdmin &&
        !user.isManager &&
        !user.haveFunnelAccess
      ) {
        return {
          redirect: {
            destination: '/home',
            permanent: false,
          },
        };
      }
    }

    return fn(ctx);
  };
}
