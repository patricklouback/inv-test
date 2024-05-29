import React, { useCallback, useContext, useEffect, useState } from 'react';
import { RiFilter2Line, RiLightbulbFlashLine } from 'react-icons/ri';
import { CampaignContext } from 'contexts/Campaign';
import { IoMdArrowDropdown } from 'react-icons/io';
import { ImCheckmark } from 'react-icons/im';
import { status_campaign } from '@components/PageComponents/IdeaRepository/data/filters';
import {
  Arrow,
  Balloon,
  ButtonContainer,
  ButtonFilter,
  GraphContainer,
  GraphFilterBar,
  TitleFilterBar,
  ToggleFilters,
  WapperTitleFilter,
  StyledCheckboxContainer,
  HiddenCheckbox,
  VisibleCheckbox,
  RankingContainer,
  RankingItem,
  LeftSide,
  RankNumber,
  CampaignTitle,
  RightSide,
  IdeasCounterWrapper,
  IdeasCounterTitle,
  IdeasCounterNumber,
} from './styles';

export function CampaignsRank(): JSX.Element {
  const { campaignsRanking, getCampaignsRanking } = useContext(CampaignContext);

  const [campaignStatus, setCampaignStatus] = useState([]);

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleOpenFilter = useCallback(() => {
    setIsFilterOpen(state => !state);
  }, []);

  const handleSelectStatus = useCallback(
    (status: string) => {
      const existsStatus = campaignStatus.findIndex(e => e === status);

      if (existsStatus !== -1) {
        setCampaignStatus(state => {
          return state.filter((aux, i) => existsStatus !== i);
        });
      } else {
        setCampaignStatus(state => [...state, status]);
      }
    },
    [campaignStatus]
  );

  useEffect(() => {
    getCampaignsRanking({
      campaignStatus:
        campaignStatus.length > 0 ? JSON.stringify(campaignStatus) : '',
    });
  }, [getCampaignsRanking, campaignStatus]);

  return (
    <GraphContainer>
      <GraphFilterBar>
        <TitleFilterBar>
          <h3>Ranking de direcionais</h3>
        </TitleFilterBar>
        <ButtonContainer>
          <ButtonFilter onClick={handleOpenFilter}>
            <RiFilter2Line size={24} />
            <Arrow selected={isFilterOpen}>
              <IoMdArrowDropdown size={22} />
            </Arrow>
          </ButtonFilter>
          {isFilterOpen && (
            <Balloon>
              <ToggleFilters>
                <WapperTitleFilter>
                  <strong>Status</strong>
                </WapperTitleFilter>
                {status_campaign.map(status => (
                  <StyledCheckboxContainer
                    key={status.id}
                    onClick={() => handleSelectStatus(status.name)}
                  >
                    <HiddenCheckbox
                      checked={campaignStatus.some(e => e === status.name)}
                      onChange={() => handleSelectStatus(status.name)}
                    />
                    <VisibleCheckbox
                      checked={campaignStatus.some(e => e === status.name)}
                    >
                      <ImCheckmark size={12} />
                    </VisibleCheckbox>
                    <span>{status.value}</span>
                  </StyledCheckboxContainer>
                ))}
              </ToggleFilters>
            </Balloon>
          )}
        </ButtonContainer>
      </GraphFilterBar>
      <RankingContainer>
        {campaignsRanking.map(cr => (
          <RankingItem>
            <LeftSide>
              <RankNumber>{cr.rank}</RankNumber>
              <CampaignTitle title={cr.title}>{cr.title}</CampaignTitle>
            </LeftSide>
            <RightSide>
              <IdeasCounterWrapper>
                <IdeasCounterTitle>iniciativas submetidas</IdeasCounterTitle>
                <IdeasCounterNumber>{cr.createdIdeas}</IdeasCounterNumber>
              </IdeasCounterWrapper>
              <IdeasCounterWrapper>
                <IdeasCounterTitle>
                  iniciativas em implementação
                </IdeasCounterTitle>
                <IdeasCounterNumber>{cr.implementedIdeas}</IdeasCounterNumber>
              </IdeasCounterWrapper>
            </RightSide>
          </RankingItem>
        ))}
      </RankingContainer>
    </GraphContainer>
  );
}
