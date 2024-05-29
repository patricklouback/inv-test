import { PageAllCampaigns } from '@components/PageComponents/AllCampaigns';
import { CampaignProvider } from 'contexts/Campaign';

export default function AllCampaigns(): JSX.Element {
  return (
    <CampaignProvider>
      <PageAllCampaigns />
    </CampaignProvider>
  );
}
