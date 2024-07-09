import { StartupsProvider } from 'contexts/Startups';
import { withSSRAuth } from 'utils/withSSRAuth';
import { StartupRepositoryPage } from '@components/PageComponents/StartupRepository';

export default function StartupsRepository() {
  return (
    <StartupsProvider>
      <StartupRepositoryPage />
    </StartupsProvider>
  );
}

export const getServerSideProps = withSSRAuth(
  async () => {
    return {
      props: {},
    };
  },
  {
    isManager: true,
  }
);
