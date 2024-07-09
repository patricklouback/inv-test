/* eslint-disable react/no-unused-prop-types */
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
import { serverApi } from 'services/api';
import { IdeaTag } from 'interfaces/idea';
import { FiltersType } from 'interfaces/filters';

interface ApprovalFunnelProps {
  ideasTags: IdeaTag[];
  filters: FiltersType;
}

export default function ApprovalFunnel({
  ideasTags,
  filters,
}: ApprovalFunnelProps) {
  console.log(filters);

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
                        <ApprovalFunnelPage
                          ideasTags={ideasTags}
                          filters={filters}
                        />
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
  async ctx => {
    const getIdeasTags = async (): Promise<IdeaTag[]> => {
      try {
        const response = await serverApi(ctx.req).get(`/ideas/ideaTag`);
        return response.data?.ideaTags || [];
      } catch (error) {
        console.log(error);
        return [];
      }
    };
    const getFilters = async (): Promise<FiltersType> => {
      try {
        const {
          data: { filters },
        } = await serverApi(ctx.req).get('/ideas/kanban-filters');
        return filters;
      } catch (error) {
        console.log(error);
      }
    };

    const ideasTags = await getIdeasTags();
    const filters = await getFilters();

    return {
      props: {
        ideasTags,
        filters,
      },
    };
  },
  {
    haveFunnelAccess: true,
  }
);
