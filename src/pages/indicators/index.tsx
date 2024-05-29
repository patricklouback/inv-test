import { ApprovalFunnelProvider } from 'contexts/ApprovalFunnel';
import { AreaProvider } from 'contexts/AreaContext';
import { CampaignProvider } from 'contexts/Campaign';
import { IdeaProvider } from 'contexts/Idea';
import { ProcessActivityProvider } from 'contexts/ProcessActivity';
import { withSSRAuth } from 'utils/withSSRAuth';
import { ProviderExcelDataReport } from 'contexts/ExcelDataReport';
import { PageIndicators } from '@components/PageComponents/PanelCampaign/PageIndicators';
import { ProviderUser } from 'contexts/User';
import { ProviderAccessData } from 'contexts/AccessData';

export default function Indicators(): JSX.Element {
  return (
    <ApprovalFunnelProvider>
      <AreaProvider>
        <CampaignProvider>
          <IdeaProvider>
            <ProviderUser>
              <ProviderExcelDataReport>
                <ProviderAccessData>
                  <ProcessActivityProvider>
                    <PageIndicators />
                  </ProcessActivityProvider>
                </ProviderAccessData>
              </ProviderExcelDataReport>
            </ProviderUser>
          </IdeaProvider>
        </CampaignProvider>
      </AreaProvider>
    </ApprovalFunnelProvider>
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