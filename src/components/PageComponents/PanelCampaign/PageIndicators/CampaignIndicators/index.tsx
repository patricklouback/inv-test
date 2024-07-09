import { InfoCard } from '@components/InfoCard';
import { CampaingStatusCount } from 'interfaces/campaign';
import { CampaignsRank } from '../CampaignsRank';
import { ActiveCampaignGraph } from '../ActiveCampaignGraph';
import { CampaignIndicatorCard } from '../CampaignIndicatorCard';
import {
  CampaignInfoCardsContainer,
  CampaignInfoCard,
  IndicatorCards,
  Graphs,
  RowOne,
  RowOneLeft,
  RowOneRight,
} from './styles';

interface CampaignIndicatorsProps {
  statusCount: CampaingStatusCount;
}

export const CampaignIndicators = ({
  statusCount,
}: CampaignIndicatorsProps): JSX.Element => {
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
        <RowOne>
          <RowOneLeft>
            <ActiveCampaignGraph />
          </RowOneLeft>
          <CampaignInfoCardsContainer>
            <CampaignInfoCard>
              <InfoCard
                title="Total de direcionais publicadas"
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
      </Graphs>
    </>
  );
};
