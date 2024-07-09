import LoginPage from '@components/PageComponents/Login';
import { withSSRGuest } from 'utils/withSSRGuest';

export default function Login() {
  return <LoginPage />;
}

export const getServerSideProps = withSSRGuest(async () => {
  return {
    props: {},
  };
});
