import { ManagementUserPage } from '@components/PageComponents/ManagementUser';
import { AreaProvider } from 'contexts/AreaContext';
import { DepartamentProvider } from 'contexts/DepartamentContext';
import { withSSRAuth } from 'utils/withSSRAuth';
import { ProviderAdm } from '../../contexts/Adm';

export default function ManagementUser(): JSX.Element {
  return (
    <ProviderAdm>
      <AreaProvider>
        <DepartamentProvider>
          <ManagementUserPage />
        </DepartamentProvider>
      </AreaProvider>
    </ProviderAdm>
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
