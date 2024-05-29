import { IdeaDetailPage } from '@components/PageComponents/IdeaDetail';
import { IdeaCommentProvider } from 'contexts/IdeaComments';
import { IdeaStepProvider } from 'contexts/IdeaStep';
import { ApprovalFunnelProvider } from 'contexts/ApprovalFunnel';

export default function IdeaDetail(): JSX.Element {
  return (
    <IdeaStepProvider>
      <IdeaCommentProvider>
        <ApprovalFunnelProvider>
          <IdeaDetailPage />
        </ApprovalFunnelProvider>
      </IdeaCommentProvider>
    </IdeaStepProvider>
  );
}
