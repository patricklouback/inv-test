import LoginPage from '@components/PageComponents/Login';
import { withSSRGuest } from 'utils/withSSRGuest';

export default function Login(): JSX.Element {
  return <LoginPage />;
}

export const getServerSideProps = withSSRGuest(async () => {
  return {
    props: {},
  };
});
