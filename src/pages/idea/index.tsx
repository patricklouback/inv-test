import { IdeaListingPage } from '@components/PageComponents/IdeaListing';
import { ApprovalFunnelProvider } from 'contexts/ApprovalFunnel';
import { IdeaChangeProvider } from 'contexts/IdeaChanges';
import { ProcessActivityProvider } from 'contexts/ProcessActivity';

export default function IdeaListing(): JSX.Element {
  return (
    <IdeaChangeProvider>
      <ApprovalFunnelProvider>
        <ProcessActivityProvider>
          <IdeaListingPage />
        </ProcessActivityProvider>
      </ApprovalFunnelProvider>
    </IdeaChangeProvider>
  );
}
