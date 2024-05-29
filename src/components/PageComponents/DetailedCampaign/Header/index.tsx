import React, { useCallback, useContext } from 'react';
import { AuthContext } from 'contexts/AuthContext';
import { RiCalendarEventLine } from 'react-icons/ri';
import { FiPlus } from 'react-icons/fi';
import { format } from 'date-fns';

import { CampaingView } from '@components/CampaignView';
import { CampaignContext } from 'contexts/Campaign';
import { useTheme } from 'styled-components';
import { useRouter } from 'next/router';
import Button from '@components/Button';
import { Bottom, BoxDate, Container, ContainerButton } from './styles';

export const Header: React.FC = (): JSX.Element => {
  const { colors } = useTheme();
  const { push } = useRouter();
  const { campaign } = useContext(CampaignContext);
  const { user } = useContext(AuthContext);

  const handleNewIdea = useCallback(() => {
    push(`/idea/manage/${campaign.id}`);
  }, [push, campaign]);

  const isCampaingFromSameUserArea =
    campaign?.campaignAreas?.filter(
      campaingArea => campaingArea.areaId === user.areaId
    ).length > 0;

  const isCampaingForAllAreas = campaign?.campaignAreas?.length === 0;

  const isCampaingPublished = campaign?.status === 'PUBLISHED';

  const showCreateIdeaButton =
    isCampaingPublished &&
    (isCampaingFromSameUserArea || isCampaingForAllAreas || user.isAdmin);

  const isFinished = new Date(campaign.endDate).getTime() < Date.now();
  return (
    <Container>
      <CampaingView
        title={campaign.title}
        hashtag={`Direcional #${campaign?.sequence || 0}`}
        imagem={campaign?.image}
      />
      <Bottom className="box-button">
        <BoxDate>
          <RiCalendarEventLine size={50} />
          <div>
            <span id="detailed-header-data">Data Limite</span>
            <p id="detailed-header-data-value">
              {format(new Date(campaign.endDate), 'dd/MM/yyyy')}
            </p>
          </div>
        </BoxDate>
        <ContainerButton>
          {showCreateIdeaButton && !isFinished && (
            <Button
              value="Criar iniciativa"
              background={colors.primaryLight}
              hover={colors.primary}
              onClick={handleNewIdea}
              color={colors.background}
            >
              <FiPlus size={20} />
              Criar iniciativa
            </Button>
          )}
        </ContainerButton>
      </Bottom>
    </Container>
  );
};
