import { DetailedCampaignPage } from '@components/PageComponents/DetailedCampaign';
import { IdeaCommentProvider } from 'contexts/IdeaComments';
import { CampaignProvider } from 'contexts/Campaign';

export default function DetailedCampaign(): JSX.Element {
  return (
    <CampaignProvider>
      <IdeaCommentProvider>
        <DetailedCampaignPage />
      </IdeaCommentProvider>
    </CampaignProvider>
  );
}
