import React, { useState, useContext, useEffect } from 'react';
import { AreaContext } from 'contexts/AreaContext';
import { IdeaContext } from 'contexts/Idea';
import { CampaignContext } from 'contexts/Campaign';
import { CampaingStatusCount } from 'interfaces/campaign';
import { FiActivity } from 'react-icons/fi';
import { Container } from '@components/Container';
import { Navigation } from './Navigation';
import { AllIndicators } from './AllIndicators';
import { CampaignIndicators } from './CampaignIndicators';
import { EngageIndicators } from './EngageIndicators';
import { IdeaIndicators } from './IdeaIndicators';
import { ImplementIndicators } from './ImplementIndicators';
import {
  Container as C,
  FilterBar,
  GlobalIndicatorsContainer,
  IconContainer,
  TitleFilterBar,
} from './styles';

export const PageIndicators: React.FC = (): JSX.Element => {
  const { calculateStatus } = useContext(CampaignContext);
  const { getAreasContribution } = useContext(AreaContext);
  const { 
    countTotalLikes, 
    countComments, 
    countTodaySentIdeas,
    countIdeas, 
  } = useContext(IdeaContext);
  const [openIndicator, setOpenIndicator] = useState('all');
  const [statusCount, setStatusCount] = useState<CampaingStatusCount>({
    countWaiting: 0,
    countActive: 0,
    countDone: 0
  });
  const [totalIdeas, setTotalIdeas] = useState(0);
  const [totalLikes, setTotalLikes] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [totalIdeasSentToday, setTotalIdeasSentToday] = useState(0);
  const [selectedCampaignsIds, setSelectedCampaignIds] = useState<string[]>([]);

  const handleSelectedCampaignsIds = (value: string[]): void => {
    setSelectedCampaignIds(value);
  };

  useEffect(() => {
    async function fechData(): Promise<void> {
        const data = await calculateStatus();
        setStatusCount(data);

        const ideasData = await countIdeas({
          campaignIds: selectedCampaignsIds ? JSON.stringify(selectedCampaignsIds) : '[]',
        });
        setTotalIdeas(ideasData.countIdeas);

        const likesData = await countTotalLikes({
          campaignIds: selectedCampaignsIds ? JSON.stringify(selectedCampaignsIds) : '[]',
        });
        setTotalLikes(likesData.totalLikes);

        const commentsData = await countComments({
          campaignIds: selectedCampaignsIds ? JSON.stringify(selectedCampaignsIds) : '[]',
        });
        setTotalComments(commentsData.totalComments);

        const ideasSentTodayData = await countTodaySentIdeas({
          campaignIds: selectedCampaignsIds ? JSON.stringify(selectedCampaignsIds) : '[]',
        });
        setTotalIdeasSentToday(ideasSentTodayData.totalIdeasSentToday);
    }
    fechData();
  }, 
  [
    countIdeas,
    calculateStatus, 
    countTotalLikes, 
    countComments, 
    countTodaySentIdeas,
    getAreasContribution,
    selectedCampaignsIds,
  ]);

  return (
    <Container>
      <C>
        <GlobalIndicatorsContainer>
          <FilterBar>
            <TitleFilterBar>
              <IconContainer>
                <FiActivity size={24} color="2D3748" />
              </IconContainer>
              <h2>Indicadores Globais</h2>
            </TitleFilterBar>
          </FilterBar>
          <Navigation 
            stateSetter={setOpenIndicator} 
            state={openIndicator} 
          />
          {openIndicator === 'all' && 
            <AllIndicators 
              statusCount={statusCount} 
              totalLikes={totalLikes} 
              totalComments={totalComments} 
              totalIdeasSentToday={totalIdeasSentToday}
              totalIdeas={totalIdeas}
              onChangeSelectedCampaigns={handleSelectedCampaignsIds}
            />
          }
          {openIndicator === 'engagement' && 
            <EngageIndicators 
              totalLikes={totalLikes} 
              totalComments={totalComments}
              onChangeSelectedCampaigns={handleSelectedCampaignsIds} 
            />
          }
          {openIndicator === 'ideas' && 
            <IdeaIndicators 
              totalIdeasSentToday={totalIdeasSentToday}
              totalIdeas={totalIdeas}
              onChangeSelectedCampaigns={handleSelectedCampaignsIds}
            />
          }
          {openIndicator === 'campaigns' && 
            <CampaignIndicators
              statusCount={statusCount} 
            />
          }
          {openIndicator === 'implement' && <ImplementIndicators />}
        </GlobalIndicatorsContainer>
      </C>
    </Container>
  );
};
