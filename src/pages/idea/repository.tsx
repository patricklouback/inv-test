import { IdeaRepositoryPage } from '@components/PageComponents/IdeaRepository';
import { ProviderAdm } from 'contexts/Adm';
import { AreaProvider } from 'contexts/AreaContext';
import { ApprovalFunnelProvider } from 'contexts/ApprovalFunnel';
import { DepartamentProvider } from 'contexts/DepartamentContext';
import { ProviderUser } from 'contexts/User';
import { ProviderExcelDataReport } from 'contexts/ExcelDataReport';
import { withSSRAuth } from 'utils/withSSRAuth';
import { ProcessActivityProvider } from 'contexts/ProcessActivity';

export default function IdeaRepository(): JSX.Element {
  return (
    <AreaProvider>
      <DepartamentProvider>
        <ProviderAdm>
          <ProviderUser>
            <ApprovalFunnelProvider>
              <ProviderExcelDataReport>
                <ProcessActivityProvider>
                  <IdeaRepositoryPage />
                </ProcessActivityProvider>
              </ProviderExcelDataReport>
            </ApprovalFunnelProvider>
          </ProviderUser>
        </ProviderAdm>
      </DepartamentProvider>
    </AreaProvider>
  );
}

export const getServerSideProps = withSSRAuth(
  async () => {
    return {
      props: {}
    };
  },
  {
    isManager: true
  }
);
