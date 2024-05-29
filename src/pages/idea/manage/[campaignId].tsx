import { PanelIdeaPage } from '@components/PageComponents/PanelIdea';
import { IdeaChangeProvider } from 'contexts/IdeaChanges';

export default function PanelCampaign(): JSX.Element {
  return (
    <IdeaChangeProvider>
      <PanelIdeaPage />
    </IdeaChangeProvider>
  );
}
