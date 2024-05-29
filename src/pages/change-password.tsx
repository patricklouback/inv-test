import ChangePasswordPage from '@components/PageComponents/ChangePassword';
import { withSSRGuest } from 'utils/withSSRGuest';

export default function ChangePassword(): JSX.Element {
  return <ChangePasswordPage />;
}

export const getServerSideProps = withSSRGuest(async () => {
  return {
    props: {},
  };
});
