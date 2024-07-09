import { useState, useContext, useCallback, useEffect } from 'react';
import { InfoCard } from '@components/InfoCard';
import { Dropdown } from '@components/Dropdown';
import { CampaignContext } from 'contexts/Campaign';
import { CampaingStatusCount } from 'interfaces/campaign';
import { ActiveCampaignGraph } from '../ActiveCampaignGraph';
import { IdeasPerStatusGraph } from '../IdeasPerStatusGraph';
import { IdeasPerRouteGraph } from '../IdeasPerRouteGraph';
import { ActiveMembersGraph } from '../ActiveMembersGraph';
import { HistoryIdea } from '../HistoryIdea';
import { CampaignIndicatorCard } from '../CampaignIndicatorCard';
import { AreasContribuitionsGraph } from '../AreasContribuitionsGraph';
import { IdeasPerKanbanStepGraph } from '../IdeasPerKanbanStepGraph';
import { ActivityTimeGraph } from '../ActivityTimeGraph';
import { CampaignsRank } from '../CampaignsRank';
import { EngagementRank } from '../EngagementRank';
import { IdeasPerGateGraphs } from '../IdeasPerGateGraphs';
import {
  CampaignFilter,
  CampaignInfoCardsContainer,
  EngagementInfoCardsContainer,
  IdeasInfoCardsContainer,
  CampaignInfoCard,
  IdeasInfoCard,
  IndicatorCards,
  Graphs,
  RowOne,
  RowOneLeft,
  RowOneRight,
  RowTwo,
  RowTwoLeft,
  RowTwoMid,
  RowThree,
  RowThreeLeft,
  RowThreeRight,
  RowFour,
  RowFourLeft,
  RowFourRight,
  RowFive,
  RowFiveLeft,
  RowFiveMid,
  RowFiveRight,
  RowSix,
  MessageContainer,
} from './styles';

interface AllIndicatorsProps {
  statusCount: CampaingStatusCount;
  totalIdeas: number;
  totalLikes: number;
  totalComments: number;
  totalIdeasSentToday: number;
  onChangeSelectedCampaigns: (value: string[]) => void;
}

export const AllIndicators = ({
  statusCount,
  totalIdeas,
  totalLikes,
  totalComments,
  totalIdeasSentToday,
  onChangeSelectedCampaigns,
}: AllIndicatorsProps): JSX.Element => {
  const { campaignsInfo, getCampaignsInfo } = useContext(CampaignContext);

  const [selectedCampaignsIds, setSelectedCampaignIds] = useState<string[]>([]);

  const handleSelectCampaign = useCallback(
    (id: string) => {
      const campaignIndex = selectedCampaignsIds.findIndex(
        campaignId => campaignId === id
      );

      if (campaignIndex !== -1) {
        setSelectedCampaignIds(state =>
          state.filter((campaign, index) => index !== campaignIndex)
        );
        onChangeSelectedCampaigns(selectedCampaignsIds);
      } else {
        setSelectedCampaignIds(state => [...state, id]);
        onChangeSelectedCampaigns(selectedCampaignsIds);
      }
    },
    [onChangeSelectedCampaigns, selectedCampaignsIds]
  );

  useEffect(() => {
    (async (): Promise<void> => {
      await getCampaignsInfo();
    })();
    onChangeSelectedCampaigns(selectedCampaignsIds);
  }, [getCampaignsInfo, selectedCampaignsIds]);

  return (
    <>
      <IndicatorCards>
        <CampaignIndicatorCard
          color="green"
          iconPath="/images/campaign/indicators/trophy.svg"
          title="DIRECIONAIS ATIVOS"
          data={statusCount.countActive}
        />
        <CampaignIndicatorCard
          color="blue"
          iconPath="/images/campaign/indicators/save.svg"
          title="DIRECIONAIS SALVOS"
          data={statusCount.countWaiting}
        />
        <CampaignIndicatorCard
          color="gray"
          iconPath="/images/campaign/indicators/pause.svg"
          title="DIRECIONAIS PAUSADOS"
          data={statusCount.countWaiting}
        />
        <CampaignIndicatorCard
          color="pink"
          iconPath="/images/campaign/indicators/calendar.svg"
          title="DIRECIONAIS FINALIZADOS"
          data={statusCount.countDone}
        />
      </IndicatorCards>
      <Graphs>
        <CampaignFilter>
          <Dropdown
            itemsList={campaignsInfo}
            handleSelect={handleSelectCampaign}
            selectedItems={selectedCampaignsIds}
          />
        </CampaignFilter>
        <RowOne>
          <RowOneLeft>
            <ActiveCampaignGraph />
          </RowOneLeft>
          <CampaignInfoCardsContainer>
            <CampaignInfoCard>
              <InfoCard
                title="Total de direcionais publicados"
                data={statusCount.countActive + statusCount.countDone}
              />
            </CampaignInfoCard>
            <CampaignInfoCard>
              <InfoCard
                title="Total de direcionais"
                data={
                  statusCount.countActive +
                  statusCount.countDone +
                  statusCount.countWaiting
                }
              />
            </CampaignInfoCard>
          </CampaignInfoCardsContainer>
          <RowOneRight>
            <CampaignsRank />
          </RowOneRight>
        </RowOne>
        <RowTwo>
          <RowTwoLeft>
            <EngagementRank campaignIds={selectedCampaignsIds} />
          </RowTwoLeft>
          <RowTwoMid>
            <ActiveMembersGraph />
          </RowTwoMid>
          <EngagementInfoCardsContainer>
            <CampaignInfoCard>
              <InfoCard title="Total de curtidas" data={totalLikes} />
            </CampaignInfoCard>
            <CampaignInfoCard>
              <InfoCard title="Total de comentários" data={totalComments} />
            </CampaignInfoCard>
          </EngagementInfoCardsContainer>
        </RowTwo>
        <RowThree>
          <RowThreeLeft>
            <ActivityTimeGraph />
          </RowThreeLeft>
          <RowThreeRight>
            <AreasContribuitionsGraph campaignIds={selectedCampaignsIds} />
          </RowThreeRight>
        </RowThree>
        <RowFour>
          <RowFourLeft>
            <HistoryIdea campaignIds={selectedCampaignsIds} />
          </RowFourLeft>
          <RowFourRight>
            <IdeasPerKanbanStepGraph campaignIds={selectedCampaignsIds} />
          </RowFourRight>
        </RowFour>
        <RowFive>
          <RowFiveLeft>
            <IdeasPerStatusGraph campaignIds={selectedCampaignsIds} />
          </RowFiveLeft>
          <RowFiveMid>
            <IdeasPerRouteGraph campaignIds={selectedCampaignsIds} />
          </RowFiveMid>
          <RowFiveRight>
            <IdeasInfoCardsContainer>
              <IdeasInfoCard>
                <InfoCard
                  title="Total de iniciativas submetidas hoje"
                  data={totalIdeasSentToday}
                />
              </IdeasInfoCard>
              <IdeasInfoCard>
                <InfoCard
                  title="Total de iniciativas submetidas"
                  data={totalIdeas}
                />
              </IdeasInfoCard>
            </IdeasInfoCardsContainer>
          </RowFiveRight>
        </RowFive>
        <RowSix>
          {selectedCampaignsIds && selectedCampaignsIds.length === 1 ? (
            <IdeasPerGateGraphs campaignId={selectedCampaignsIds[0]} />
          ) : (
            <MessageContainer>
              <img
                src="/images/campaign/indicators/mensagem-grafico-rotas.svg"
                alt="Mensagem"
              />
            </MessageContainer>
          )}
        </RowSix>
      </Graphs>
    </>
  );
};
