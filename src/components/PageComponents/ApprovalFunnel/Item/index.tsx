/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Links } from '@components/PageComponents/ApprovalFunnel/Item/Links';
import { Idea, IdeaTag } from 'interfaces/idea';
import React, {
  DragEventHandler,
  HTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { useTheme } from 'styled-components';
import { KANBAN_STATUS } from 'utils/constants';
import { getSequenceNumber } from 'utils/sequenceNumber';
import OptionsButtonIcon from '../../../../assets/inventta/optionsButton.svg';
import SelectOptions from '../../../../assets/inventta/selectOptions.svg';
import Ticket from '../../../../assets/inventta/ticket.svg';
import {
  getStringWith3Dots,
  getTextWidth,
} from '../../../../utils/wordLengthCounter';
import { LinkedIdea } from './Links/LinkedIdea';
import { TagList } from './Tags';
import {
  AllOptionsWrapper,
  Circle,
  CircleCheck,
  Collapse,
  Container,
  Content,
  Description,
  Dot,
  IdeaAppId,
  ItemTag,
  KanbanStatus,
  KanbanStatusText,
  LinksTooltip,
  LinksWrapper,
  ListTag,
  OptionAndSubOptionWrapper,
  OptionItem,
  OptionsAvailable,
  OptionsButton,
  OptionsWrapper,
  ProgressBarWithCircle,
  SeeMoreComponent,
  SelectedTags,
  Step,
  TagName,
  Title,
  Top,
  VisibleTagsWrapper,
  CardHeader,
  Separator,
} from './styles';
import { EvaluationCriteriaInfo } from './EvaluationCriteriaInfo';

interface ItemProps extends HTMLAttributes<HTMLDivElement> {
  idea: Idea;
  updateStepStatus?: boolean;
  // ideaHasChanges?: boolean;
  onDragStart: DragEventHandler<HTMLDivElement>;
  onClick?: () => void;
  openLinked?: any;
  kanbanStep?: string;
  wasScrolled?: boolean;
  allIdeaTags: IdeaTag[];
}

export const Item: React.FC<ItemProps> = ({
  idea,
  onDragStart,
  onClick,
  updateStepStatus,
  // ideaHasChanges,
  openLinked,
  kanbanStep,
  wasScrolled,
  allIdeaTags,
}): JSX.Element => {
  const { colors } = useTheme();
  const [collapse, setCollapse] = useState(false);
  const [lastUpdateStep, setLastUpdateSteps] = useState(true);
  const [showOptions, setShowOptions] = useState(false);
  const [showTagOptions, setShowTagOptions] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState(0);
  const [ideaTagsNames, setIdeaTagsNames] = useState([]);
  const [totalSelectedTags, setTotalSelectedTags] = useState(0);
  const [linkIsOpen, setLinkIsOpen] = useState(false);

  const elementRef = useRef(null);
  const ticketsAvailableRef = useRef(null);
  const optionItemRef = useRef(null);

  const MAX_TAG_AREA_WIDTH = 130;

  function buildIdeaTagsName(ideaTags: IdeaTag[]): any[] {
    const ideaTagsNameBuilding = [];
    const gap_between_tags = 10;
    let actualLength = 0;
    for (
      let i = 0;
      i < ideaTags.length && actualLength < MAX_TAG_AREA_WIDTH;
      i += 1
    ) {
      if (
        actualLength +
          getTextWidth(ideaTags[i].tag.name, '400 12px Montserrat bold') +
          gap_between_tags <=
        MAX_TAG_AREA_WIDTH
      ) {
        ideaTagsNameBuilding.push({
          name: ideaTags[i].tag.name,
          backgroundColor: ideaTags[i].tag.color,
          textColor: ideaTags[i].tag.textColor,
        });
      } else {
        const max_text_width = MAX_TAG_AREA_WIDTH - actualLength;
        const nameWith3Dots = getStringWith3Dots(
          ideaTags[i].tag.name,
          max_text_width,
          '400 12px Montserrat bold'
        );
        if (nameWith3Dots !== undefined) {
          ideaTagsNameBuilding.push({
            name: nameWith3Dots,
            backgroundColor: ideaTags[i].tag.color,
            textColor: ideaTags[i].tag.textColor,
          });
        } else {
          const lastElementIndex = ideaTagsNameBuilding.length - 1;
          ideaTagsNameBuilding[lastElementIndex].name = getStringWith3Dots(
            ideaTagsNameBuilding[lastElementIndex].name,
            max_text_width +
              getTextWidth(
                ideaTagsNameBuilding[lastElementIndex].name,
                '400 12px Montserrat bold'
              ),
            '400 12px Montserrat bold'
          );
        }
      }
      actualLength +=
        getTextWidth(ideaTags[i].tag.name, '400 12px Montserrat bold') +
        gap_between_tags;
    }
    return ideaTagsNameBuilding;
  }

  useEffect(() => {
    if (allIdeaTags.length !== 0) {
      const ideaTagsList = allIdeaTags.filter(
        ideaTag => ideaTag.ideaId === idea.id
      );
      const ideaTagsNameList = buildIdeaTagsName(
        ideaTagsList.filter(tag => tag.checked)
      );
      setIdeaTagsNames(ideaTagsNameList);
      setTotalSelectedTags(ideaTagsList.filter(tag => tag.checked).length);
    }
  }, [allIdeaTags, idea.id]);

  useEffect(() => {
    if (idea?.id && updateStepStatus !== lastUpdateStep) {
      setLastUpdateSteps(updateStepStatus);
    }
  }, [
    idea?.id,
    idea?.kanbanStep,
    idea?.ideaSteps,
    updateStepStatus,
    lastUpdateStep,
  ]);

  const getStatus = useCallback((idea: Idea): string => {
    if (idea.kanbanStatus === 'PAUSED') {
      return 'PAUSED';
    }
    if (idea.kanbanStatus === 'OWNER_REVIEW') {
      return 'IN_REVIEW';
    }
    if (
      idea.kanbanStatus === 'AGENT_REVIEW' ||
      idea.kanbanStatus === 'TECH_REVIEW' ||
      idea.kanbanStatus === 'MANAGER_REVIEW'
    ) {
      return 'EXTERNAL_REVIEW';
    }
    if (idea.kanbanStatus === 'APPROVED') {
      return 'APPROVED';
    }
    return 'WAITING';
  }, []);

  const customEvent = new CustomEvent('clicouFora', { detail: {} });

  const showOptionsToggle = (event): void => {
    event.stopPropagation();
    const showOptionState = showOptions;
    document.dispatchEvent(customEvent);
    setShowOptions(!showOptionState);
  };

  const showOptionsTagToggle = (event): void => {
    event.stopPropagation();
    setShowTagOptions(!showTagOptions);
  };

  const setPosition = useCallback((): void => {
    const interval = setInterval(() => {
      if (elementRef?.current)
        setTooltipPosition(elementRef.current.getBoundingClientRect().top);
    }, 17);
    setTimeout(() => {
      clearInterval(interval);
    }, 100);
  }, [elementRef, setTooltipPosition]);

  const handleMouseScroll = useCallback((): void => {
    setPosition();
  }, [setPosition]);

  const handleOptionsAndSubOptions = (event): void => {
    event.stopPropagation();
  };

  useEffect(() => {
    setPosition();
  }, [elementRef, setPosition]);

  useEffect(() => {
    setPosition();
  }, [setPosition, wasScrolled]);

  useEffect(() => {
    window.addEventListener('scroll', handleMouseScroll);

    return () => {
      window.removeEventListener('scroll', handleMouseScroll);
    };
  }, [handleMouseScroll]);

  useEffect(() => {
    const handleOutsideClick = (event): void => {
      if (
        (!ticketsAvailableRef.current ||
          (ticketsAvailableRef.current &&
            !ticketsAvailableRef.current.contains(event.target))) &&
        optionItemRef.current &&
        !optionItemRef.current.contains(event.target)
      ) {
        setShowOptions(false);
        setShowTagOptions(false);
        event.stopPropagation();
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    const handleOutsideClick = (): void => {
      setShowOptions(false);
      setShowTagOptions(false);
    };

    document.addEventListener('clicouFora', handleOutsideClick);

    return () => {
      document.removeEventListener('clicouFora', handleOutsideClick);
    };
  }, []);

  const totalNotShowedTags = totalSelectedTags - ideaTagsNames.length;

  return (
    <>
      <Container
        open={collapse}
        datatype="itemDrag"
        draggable={!showOptions}
        onDragStart={onDragStart}
        status={colors.greenHipeLight}
        linkIsOpen={linkIsOpen}
        className="funnel-item"
      >
        <Content onClick={onClick}>
          <CardHeader>
            {idea.kanbanStep === 'SELECT'
              ? idea.ideaSteps.map((step, i) => (
                  <ProgressBarWithCircle>
                    <Step
                      checked={idea.ideaSteps[i - 1]?.completed || i === 0}
                    />
                    <CircleCheck checked={step.completed} />
                  </ProgressBarWithCircle>
                ))
              : idea.campaign.usingCriteria && (
                  <EvaluationCriteriaInfo idea={idea} />
                )}
          </CardHeader>
          <Separator
            height={
              idea.campaign.usingCriteria && idea.kanbanStep !== 'SELECT'
                ? '1px'
                : '0px'
            }
          />
          <div>
            <Top>
              <Title>
                <span>
                  {`${idea?.title.slice(0, 40)}${
                    idea?.title.length > 40 ? '...' : ''
                  }`}
                </span>
              </Title>
              <OptionsWrapper ref={elementRef}>
                <OptionsButton onClick={showOptionsToggle}>
                  <OptionsButtonIcon />
                </OptionsButton>
                {showOptions && (
                  <OptionsAvailable top={tooltipPosition}>
                    <AllOptionsWrapper onClick={handleOptionsAndSubOptions}>
                      <OptionAndSubOptionWrapper>
                        <OptionItem
                          onClick={showOptionsTagToggle}
                          ref={optionItemRef}
                        >
                          <Ticket />
                          <div>Etiqueta</div>
                          <div />
                          <div />
                          <SelectOptions />
                        </OptionItem>
                        {showTagOptions && <TagList ideaId={idea.id} />}
                      </OptionAndSubOptionWrapper>
                    </AllOptionsWrapper>
                  </OptionsAvailable>
                )}
              </OptionsWrapper>
            </Top>
            {/* {ideaHasChanges ? (
              <WarningTag
                text="Novas Atualizações"
                size="13px"
                margin="0.5rem 0"
              />
            ) : null} */}
            <IdeaAppId>{`#${getSequenceNumber(idea.sequence)}`}</IdeaAppId>
            <p style={{ paddingTop: 10, fontSize: 16 }}>
              {' '}
              {`#${idea?.campaign?.sequence.toString().padStart(2, '0')} ${
                idea.campaign?.title
              }`}
            </p>
          </div>

          <Description open={collapse}>{idea.description}</Description>

          <ListTag>
            {idea.kanbanStep !== 'IMPLEMENTED' && (
              <ItemTag>
                <KanbanStatus type={getStatus(idea)}>
                  <Dot>·</Dot>
                  <KanbanStatusText>
                    {KANBAN_STATUS[getStatus(idea)]}
                  </KanbanStatusText>
                </KanbanStatus>
              </ItemTag>
            )}
            <LinksWrapper
              onClick={event => {
                event.stopPropagation();
                setLinkIsOpen(!linkIsOpen);
              }}
            >
              <Links
                linksCount={idea.secondaryLinks.length}
                display={idea.secondaryLinks.length > 0}
              />
              <LinksTooltip>Visualize iniciativas vinculadas</LinksTooltip>
            </LinksWrapper>
          </ListTag>
        </Content>

        <SelectedTags>
          <VisibleTagsWrapper>
            {ideaTagsNames.map(ideaTagName => (
              <TagName
                backgroundColor={ideaTagName.backgroundColor}
                color={ideaTagName.textColor}
              >
                {ideaTagName.name}
              </TagName>
            ))}
          </VisibleTagsWrapper>
          {totalNotShowedTags > 0 && (
            <SeeMoreComponent>
              <Circle>{`+${totalNotShowedTags}`}</Circle>
            </SeeMoreComponent>
          )}
        </SelectedTags>
        <Collapse open={collapse} onClick={() => setCollapse(!collapse)}>
          <FiChevronDown size={20} />
        </Collapse>
      </Container>
      {idea.secondaryLinks.map(linkedIdea => (
        <LinkedIdea
          linkIsOpen={linkIsOpen}
          linkedIdea={linkedIdea}
          hasBorder
          showCreator={false}
          openLinked={openLinked}
          kanbanStep={kanbanStep}
        />
      ))}
    </>
  );
};
