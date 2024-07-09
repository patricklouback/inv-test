import { PanelCampaign } from '@components/PageComponents/PanelCampaign';
import { CampaignContext, CampaignProvider } from 'contexts/Campaign';
import { BannersProvider } from 'contexts/Banners';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { withSSRAuth } from 'utils/withSSRAuth';

function EditCampaignPage() {
  const { query } = useRouter();
  const { getCampaign } = useContext(CampaignContext);

  useEffect(() => {
    async function loadCampaign(): Promise<void> {
      await getCampaign(String(query.campaignId));
    }

    if (query.campaignId) {
      loadCampaign();
    }
  }, [query, getCampaign]);

  return <PanelCampaign manageCampaign campaignId={String(query.campaignId)} />;
}

export default function EditCampaign() {
  return (
    <CampaignProvider>
      <BannersProvider>
        <EditCampaignPage />
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
