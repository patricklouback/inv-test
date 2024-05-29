import { PanelCampaign } from '@components/PageComponents/PanelCampaign';
import { AreaProvider } from 'contexts/AreaContext';
import { CampaignProvider } from 'contexts/Campaign';
import { withSSRAuth } from 'utils/withSSRAuth';
import { ProviderExcelDataReport } from 'contexts/ExcelDataReport';
import { BannersProvider } from 'contexts/Banners';
import { EvaluationCriteriaCampaignProvider } from 'contexts/EvaluationCriteriaCampaign';

export default function Campaign(): JSX.Element {
  return (
    <AreaProvider>
      <CampaignProvider>
        <ProviderExcelDataReport>
          <BannersProvider>
            <EvaluationCriteriaCampaignProvider>
              <PanelCampaign />
            </EvaluationCriteriaCampaignProvider>
          </BannersProvider>
        </ProviderExcelDataReport>
      </CampaignProvider>
    </AreaProvider>
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
