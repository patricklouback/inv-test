import { ApprovalFunnelContext } from 'contexts/ApprovalFunnel';
import { IdeaContext } from 'contexts/Idea';
import { IdeaKanbamStep, IdeaType } from 'interfaces/idea';
import { useContext, useEffect, useState } from 'react';
import { AiFillCaretDown } from 'react-icons/ai';
import { ImCheckmark } from 'react-icons/im';
import { ProcessActivityContext } from 'contexts/ProcessActivity';
import { TiFilter } from 'react-icons/ti';
import { useTheme } from 'styled-components';
import {
  BoxIcons,
  Button,
  ButtonContainer,
  FilterOptions,
  HiddenCheckbox,
  StyledCheckboxContainer,
  ValueButton,
  VisibleCheckbox,
  WapperButtonsActions,
  WapperHeader,
  WapperTitleFilter,
} from './styles';
import { step_idea, update_idea } from './data/filters';

type FiltersOptions = 'CAMPAIGN' | 'PERFIL' | 'STEP' | 'UPDATE';
interface HeaderProps {
  size?: number;
  activeFilter: string;
  selectedCampaignIds: string[];
  selectedKanbanStepsIds: IdeaKanbamStep[];
  selectedTypes: IdeaType[];
  selectedIdeaUpdateStatusIds: string[];
  handleOpenFilter: (selectedFilter: FiltersOptions) => void;
  handleSelectCampaign: (campaignId: string) => void;
  handleSelectKanbanStep: (kanbanStep: string) => void;
  handleSelectType: (type: string) => void;
  handleSelectIdeasUpdateStatus: (id: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  size,
  activeFilter,
  selectedCampaignIds,
  selectedKanbanStepsIds,
  selectedTypes,
  selectedIdeaUpdateStatusIds,
  handleOpenFilter,
  handleSelectCampaign,
  handleSelectKanbanStep,
  handleSelectType,
  handleSelectIdeasUpdateStatus,
}): JSX.Element => {
  const { colors } = useTheme();
  const { getKanbanSteps, kanbanSteps } = useContext(ApprovalFunnelContext);
  const { campaign_filter } = useContext(IdeaContext);
  const { getAllProcessActivitiesName } = useContext(ProcessActivityContext);
  const [processActivitiesName, setProcessActivitiesName] = useState([]);

  useEffect(() => {
    (async (): Promise<void> => {
      setProcessActivitiesName(await getAllProcessActivitiesName());
      await getKanbanSteps();
    })();
  }, [getAllProcessActivitiesName, getKanbanSteps]);

  return (
    <WapperHeader size={size}>
      <WapperButtonsActions size={size}>
        <ButtonContainer>
          <Button type="button" onClick={() => handleOpenFilter('CAMPAIGN')}>
            <BoxIcons>
              <TiFilter size={23} color={colors.background} />
              <AiFillCaretDown size={9} color={colors.background} />
            </BoxIcons>
            <ValueButton>Direcionais</ValueButton>
          </Button>
          {activeFilter === 'CAMPAIGN' && (
            <FilterOptions>
              <WapperTitleFilter>
                <strong>Direcional</strong>
              </WapperTitleFilter>
              {campaign_filter?.map(campaign => (
                <StyledCheckboxContainer
                  key={campaign.id}
                  onClick={() => handleSelectCampaign(campaign.id)}
                >
                  <HiddenCheckbox
                    checked={selectedCampaignIds.some(e => e === campaign.id)}
                    onChange={() => handleSelectCampaign(campaign.id)}
                  />
                  <VisibleCheckbox
                    checked={selectedCampaignIds.some(e => e === campaign.id)}
                  >
                    <ImCheckmark size={12} />
                  </VisibleCheckbox>
                  <span>{campaign.title}</span>
                </StyledCheckboxContainer>
              ))}
            </FilterOptions>
          )}
        </ButtonContainer>

        <ButtonContainer>
          <Button type="button" onClick={() => handleOpenFilter('PERFIL')}>
            <BoxIcons>
              <TiFilter size={23} color={colors.background} />
              <AiFillCaretDown size={9} color={colors.background} />
            </BoxIcons>
            <ValueButton>Perfil Iniciativa</ValueButton>
          </Button>
          {activeFilter === 'PERFIL' && (
            <FilterOptions>
              <WapperTitleFilter>
                <strong>Perfil Iniciativa</strong>
              </WapperTitleFilter>
              {processActivitiesName?.map(type => (
                <StyledCheckboxContainer
                  key={type}
                  onClick={() => handleSelectType(type)}
                >
                  <HiddenCheckbox
                    checked={selectedTypes.some(e => e === type)}
                    onChange={() => handleSelectType(type)}
                  />
                  <VisibleCheckbox
                    checked={selectedTypes.some(e => e === type)}
                  >
                    <ImCheckmark size={12} />
                  </VisibleCheckbox>
                  <span>{type}</span>
                </StyledCheckboxContainer>
              ))}
            </FilterOptions>
          )}
        </ButtonContainer>
        {kanbanSteps.length > 0 && (
          <ButtonContainer>
            <Button type="button" onClick={() => handleOpenFilter('STEP')}>
              <BoxIcons>
                <TiFilter size={23} color={colors.background} />
                <AiFillCaretDown size={9} color={colors.background} />
              </BoxIcons>
              <ValueButton>Etapa da Iniciativa</ValueButton>
            </Button>
            {activeFilter === 'STEP' && (
              <FilterOptions>
                <WapperTitleFilter>
                  <strong>Etapa da Iniciativa</strong>
                </WapperTitleFilter>
                {step_idea?.map((step, index) => (
                  <StyledCheckboxContainer
                    key={step.id}
                    onClick={() => handleSelectKanbanStep(step.name)}
                  >
                    <HiddenCheckbox
                      checked={selectedKanbanStepsIds.some(
                        e => e === step.name
                      )}
                      onChange={() => handleSelectKanbanStep(step.name)}
                    />
                    <VisibleCheckbox
                      checked={selectedKanbanStepsIds.some(
                        e => e === step.name
                      )}
                    >
                      <ImCheckmark size={12} />
                    </VisibleCheckbox>
                    <span>{kanbanSteps[index].title}</span>
                  </StyledCheckboxContainer>
                ))}
              </FilterOptions>
            )}
          </ButtonContainer>
        )}
        <ButtonContainer>
          <Button type="button" onClick={() => handleOpenFilter('UPDATE')}>
            <BoxIcons>
              <TiFilter size={23} color={colors.background} />
              <AiFillCaretDown size={9} color={colors.background} />
            </BoxIcons>
            <ValueButton>Atualização</ValueButton>
          </Button>
          {activeFilter === 'UPDATE' && (
            <FilterOptions>
              <WapperTitleFilter>
                <strong>Status de Atualização</strong>
              </WapperTitleFilter>
              {update_idea?.map(update => (
                <StyledCheckboxContainer
                  key={update.id.toString()}
                  onClick={() => handleSelectIdeasUpdateStatus(update.id)}
                >
                  <HiddenCheckbox
                    checked={selectedIdeaUpdateStatusIds.some(
                      e => e === update.id
                    )}
                    onChange={() => handleSelectIdeasUpdateStatus(update.id)}
                  />
                  <VisibleCheckbox
                    checked={selectedIdeaUpdateStatusIds.some(
                      e => e === update.id
                    )}
                  >
                    <ImCheckmark size={12} />
                  </VisibleCheckbox>
                  <span>{update.value}</span>
                </StyledCheckboxContainer>
              ))}
            </FilterOptions>
          )}
        </ButtonContainer>
      </WapperButtonsActions>
    </WapperHeader>
  );
};
