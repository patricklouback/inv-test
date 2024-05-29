import { ManagementPlatformPage } from '@components/PageComponents/ManagementPlatform';
import { BannersProvider } from 'contexts/Banners';
import { withSSRAuth } from 'utils/withSSRAuth';

export default function ManagementPlatform(): JSX.Element {
  return (
    <BannersProvider>
      <ManagementPlatformPage />
    </BannersProvider>
  );
}

export const getServerSideProps = withSSRAuth(
  async () => {
    return {
      props: {},
    };
  },
  {
    isAdmin: true,
  }
);
