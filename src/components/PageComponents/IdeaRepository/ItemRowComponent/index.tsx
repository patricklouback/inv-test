import { useTheme } from 'styled-components';
import { useCallback, useContext, useEffect, useState } from 'react';
import { ApprovalFunnelContext } from 'contexts/ApprovalFunnel';
import { Idea } from 'interfaces/idea';
import { CardIconComponent } from '@components/IconCard';
import { getSequenceNumber } from 'utils/sequenceNumber';
import { KANBAN_STATUS } from 'utils/constants';
import {
  AiOutlineEye,
  AiOutlineThunderbolt,
  AiOutlineCaretDown,
  AiOutlineCaretRight
} from 'react-icons/ai';
import { RiFileEditLine, RiSendPlaneLine } from 'react-icons/ri';
import { FiSearch } from 'react-icons/fi';
import { translateStep } from '../translate';
import {
  CardItem,
  DownIconWrapper,
  IdWrapper,
  ItemRow,
  ItemSubRow,
  IdeaId,
  ItemValue,
  ItemValueCampaign,
  ItemValueDate,
  ItemValueStatus,
  ItemValueStep,
  ItemValueTitle,
  KanbanStatus,
  KanbanStatusText
} from './styles';

interface ItemRowProps {
  item: Idea;
  handleOpenIdea: (ideaId: string) => Promise<void>;
  handleOpenSendModalIdea: (ideaId: string) => Promise<void>;
}

export const ItemRowComponent = ({
  item,
  handleOpenIdea,
  handleOpenSendModalIdea
}: ItemRowProps): JSX.Element => {
  const { colors } = useTheme();
  const { listLinkedIdeas, kanbanSteps } = useContext(ApprovalFunnelContext);

  const [linkedIdeasState, setLinkedIdeasState] = useState([]);
  const [linkIsOpen, setLinkIsOpen] = useState(false);

  const handleFormateDate = useCallback((date?: string): string => {
    return `${date.substring(8, 10)}/${date.substring(5, 7)}/${date.substring(
      0,
      4
    )}`;
  }, []);

  const getStatus = useCallback((idea: Idea): string => {
    if (
      idea.kanbanStatus === 'PAUSED' &&
      idea.status !== 'INACTIVE' &&
      idea.status !== 'DRAFT'
    ) {
      return 'PAUSED';
    }
    if (
      idea.kanbanStatus === 'OWNER_REVIEW' &&
      idea.status !== 'INACTIVE' &&
      idea.status !== 'DRAFT'
    ) {
      return 'IN_REVIEW';
    }
    if (
      (idea.kanbanStatus === 'AGENT_REVIEW' &&
        idea.status !== 'INACTIVE' &&
        idea.status !== 'DRAFT') ||
      (idea.kanbanStatus === 'TECH_REVIEW' &&
        idea.status !== 'INACTIVE' &&
        idea.status !== 'DRAFT') ||
      (idea.kanbanStatus === 'MANAGER_REVIEW' &&
        idea.status !== 'INACTIVE' &&
        idea.status !== 'DRAFT')
    ) {
      return 'EXTERNAL_REVIEW';
    }
    if (
      idea.kanbanStatus === 'APPROVED' &&
      idea.status !== 'INACTIVE' &&
      idea.status !== 'DRAFT'
    ) {
      return 'APPROVED';
    }
    if (idea.status === 'INACTIVE') {
      return 'INACTIVE';
    }
    /* if (idea.status === 'DRAFT') {
          return 'DRAFT'
        } */
    return 'WAITING';
  }, []);

  const colorSetter = useCallback((kanbanStep: string): string => {
    let result = '';
    switch (kanbanStep) {
      case translateStep[0].name:
        result = translateStep[0].color;
        break;
      case translateStep[1].name:
        result = translateStep[1].color;
        break;
      case translateStep[2].name:
        result = translateStep[2].color;
        break;
      case translateStep[3].name:
        result = translateStep[3].color;
        break;
      default:
        result = 'gray';
    }
    return result;
  }, [])

  useEffect(() => {
    (async () => {
      setLinkedIdeasState(await listLinkedIdeas(item.id));
    })();
  }, [listLinkedIdeas, item]);

  return (
    <>
      <ItemRow key={item.id}>
        <IdeaId className="id">
          <IdWrapper>
            {linkedIdeasState.length > 0 && (
              <DownIconWrapper onClick={() => setLinkIsOpen(!linkIsOpen)}>
                <AiOutlineCaretRight
                  style={
                    linkIsOpen ? { display: 'none' } : { display: 'block' }
                  }
                />
                <AiOutlineCaretDown
                  style={
                    linkIsOpen ? { display: 'block' } : { display: 'none' }
                  }
                />
              </DownIconWrapper>
            )}
            {`#${getSequenceNumber(item.sequence)}`}
          </IdWrapper>
        </IdeaId>
        <ItemValue>
          <div style={{ paddingLeft: '0.7rem' }}>
            <CardIconComponent background={colors.background}>
              {item.processActivity?.name ? (
                <RiFileEditLine color={colors.red} size={20} />
              ) : (
                <FiSearch size={20} />
              )}
            </CardIconComponent>
          </div>
        </ItemValue>
        <ItemValueTitle className="title">
          {item.title}
        </ItemValueTitle>
        <ItemValueCampaign>{item?.campaign?.title}</ItemValueCampaign>
        <ItemValueDate className="date">
          {handleFormateDate(item?.createdAt)}
        </ItemValueDate>
        <ItemValueStep>
        {kanbanSteps.length > 0 && (
          <CardItem color={colorSetter(item.kanbanStep)}>
            <span>
              {
                `${item.newKanbanStep?.sequence}/4 - ${item.newKanbanStep?.title}`
              }
            </span>
          </CardItem>
        )}
        </ItemValueStep>
        <ItemValueStatus>
          <KanbanStatus type={getStatus(item)}>
            <KanbanStatusText>
              {KANBAN_STATUS[getStatus(item)]}
            </KanbanStatusText>
          </KanbanStatus>
        </ItemValueStatus>
        <ItemValue>
          <div className="actions">
            <AiOutlineEye size={26} onClick={() => handleOpenIdea(item.id)} />
            <RiSendPlaneLine
              size={24}
              onClick={() => handleOpenSendModalIdea(item.id)}
              style={{ cursor: 'pointer' }}
            />
          </div>
        </ItemValue>
      </ItemRow>
      {linkedIdeasState.map(linkedIdea => (
        <ItemSubRow linkIsOpen={linkIsOpen} key={linkedIdea.id}>
          <IdeaId className="id">{`#${getSequenceNumber(
            linkedIdea.sequence
          )}`}</IdeaId>
          <ItemValue>
            <div style={{ paddingLeft: '0.7rem' }}>
              <CardIconComponent background={colors.background}>
                {linkedIdea.type === 'QUICK_WIN' && (
                  <AiOutlineThunderbolt color={colors.yellow} size={20} />
                )}
                {linkedIdea.type === 'PROJECT' && (
                  <RiFileEditLine color={colors.red} size={20} />
                )}
              </CardIconComponent>
            </div>
          </ItemValue>
          <ItemValueTitle className="title">
            {linkedIdea.title.charAt(0).toUpperCase() +
              linkedIdea.title.slice(1).toLowerCase()}
          </ItemValueTitle>
          <ItemValueCampaign>{item?.campaign?.title}</ItemValueCampaign>
          <ItemValueDate className="date">
            {handleFormateDate(linkedIdea?.createdAt)}
          </ItemValueDate>
          <ItemValueStep>
            {translateStep.map(step => {
              if (step?.name === linkedIdea?.kanbanStep) {
                return (
                  <CardItem color={step.color}>
                    <span>{step.value}</span>
                  </CardItem>
                );
              }
              return null;
            })}
          </ItemValueStep>
          <ItemValueStatus>
            <KanbanStatus type={getStatus(linkedIdea)}>
              <KanbanStatusText>
                {KANBAN_STATUS[getStatus(linkedIdea)]}
              </KanbanStatusText>
            </KanbanStatus>
          </ItemValueStatus>
          <ItemValue>
            <div className="actions">
              <AiOutlineEye
                size={26}
                onClick={() => handleOpenIdea(linkedIdea.id)}
              />
              <RiSendPlaneLine
                size={24}
                onClick={() => handleOpenSendModalIdea(linkedIdea.id)}
                style={{ cursor: 'pointer' }}
              />
            </div>
          </ItemValue>
        </ItemSubRow>
      ))}
    </>
  );
};
