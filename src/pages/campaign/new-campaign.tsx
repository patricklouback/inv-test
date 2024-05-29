import { PanelCampaign } from '@components/PageComponents/PanelCampaign';
import { CampaignProvider } from 'contexts/Campaign';
import { BannersProvider } from 'contexts/Banners';
import { withSSRAuth } from 'utils/withSSRAuth';

export default function NewCampaign(): JSX.Element {
  return (
    <CampaignProvider>
      <BannersProvider>
        <PanelCampaign manageCampaign />
      </BannersProvider>
    </CampaignProvider>
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
