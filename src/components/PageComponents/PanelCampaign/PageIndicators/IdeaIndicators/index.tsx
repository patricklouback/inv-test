import { useState, useContext, useCallback, useEffect } from 'react';
import { InfoCard } from '@components/InfoCard';
import { Dropdown } from '@components/Dropdown';
import { CampaignContext } from 'contexts/Campaign';
import { IdeasPerStatusGraph } from '../IdeasPerStatusGraph';
import { IdeasPerRouteGraph } from '../IdeasPerRouteGraph';
import { HistoryIdea } from '../HistoryIdea';
import { IdeasPerKanbanStepGraph } from '../IdeasPerKanbanStepGraph';
import { IdeasPerGateGraphs } from '../IdeasPerGateGraphs';
import {
  CampaignFilter,
  IdeasInfoCardsContainer,
  IdeasInfoCard,
  Graphs,
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

interface IdeaIndicatorsProps {
  totalIdeas: number;
  totalIdeasSentToday: number;
  onChangeSelectedCampaigns: (value: string[]) => void;
}

export const IdeaIndicators = ({
  totalIdeas,
  totalIdeasSentToday,
  onChangeSelectedCampaigns,
}: IdeaIndicatorsProps): JSX.Element => {
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
    <Graphs>
      <CampaignFilter>
        <Dropdown
          itemsList={campaignsInfo}
          handleSelect={handleSelectCampaign}
          selectedItems={selectedCampaignsIds}
        />
      </CampaignFilter>
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
                title="Total de iniciativas enviadas hoje"
                data={totalIdeasSentToday}
              />
            </IdeasInfoCard>
            <IdeasInfoCard>
              <InfoCard
                title="Total de iniciativas criadas"
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
  );
};
