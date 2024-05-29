import { ApprovalFunnelPage } from '@components/PageComponents/ApprovalFunnel';
import { ApprovalFunnelProvider } from 'contexts/ApprovalFunnel';
import { CampaignProvider } from 'contexts/Campaign';
import { IdeaCommentProvider } from 'contexts/IdeaComments';
import { IdeaChangeProvider } from 'contexts/IdeaChanges';
import { IdeaStepProvider } from 'contexts/IdeaStep';
import { ProviderUser } from 'contexts/User';
import { withSSRAuth } from 'utils/withSSRAuth';
import { IdeaTagProvider } from 'contexts/IdeaTags';
import { ProcessActivityProvider } from 'contexts/ProcessActivity';
import { BannersProvider } from 'contexts/Banners';
import { HistoryItensProvider } from 'contexts/History';

export default function ApprovalFunnel(): JSX.Element {
  return (
    <ApprovalFunnelProvider>
      <IdeaStepProvider>
        <ProviderUser>
          <IdeaChangeProvider>
            <IdeaCommentProvider>
              <ProcessActivityProvider>
                <CampaignProvider>
                  <IdeaTagProvider>
                    <BannersProvider>
                      <HistoryItensProvider>
                        <ApprovalFunnelPage />
                      </HistoryItensProvider>
                    </BannersProvider>
                  </IdeaTagProvider>
                </CampaignProvider>
              </ProcessActivityProvider>
            </IdeaCommentProvider>
          </IdeaChangeProvider>
        </ProviderUser>
      </IdeaStepProvider>
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
    haveFunnelAccess: true,
  }
);
