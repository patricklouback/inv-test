/* eslint-disable no-nested-ternary */
/* eslint-disable no-return-assign */
import { CardIdeia } from '@components/CardIdea';
import { UserCard } from '@components/CardUser';
import { Links } from '@components/PageComponents/ApprovalFunnel/Item/Links';
import { WarningTag } from '@components/WarningTag';
import { ApprovalFunnelContext } from 'contexts/ApprovalFunnel';
import { IdeaContext } from 'contexts/Idea';
import { IdeaChangeContext } from 'contexts/IdeaChanges';
import { Idea } from 'interfaces/idea';
import Link from 'next/link';
import { useCallback, useContext, useEffect, useState } from 'react';
import { AiOutlineEdit, AiOutlineEye } from 'react-icons/ai';
import { BsCheck } from 'react-icons/bs';
import { RiFileEditLine } from 'react-icons/ri';
import ReactMarkdown from 'react-markdown';
import { useTheme } from 'styled-components';
import { KANBAN_STATUS } from 'utils/constants';
import { getStatus } from 'utils/getStatus';
import { normalizeString } from 'utils/normalizeString';
import {
  ButtonEdit,
  ButtonView,
  ButtonsContainer,
  CircleGate,
  DraftTag,
  FirstGateTitle,
  Gate,
  GateTitle,
  H2Draft1,
  H3Draft1,
  IdeaAppId,
  Item,
  ItemProcessBar,
  ItemUser,
  KanbanStatus,
  KanbanStatusText,
  LastGateTitle,
  Line,
  LinksTooltip,
  LinksWrapper,
  ListUsers,
  ProgressBar,
  PublishedTag,
  ValueDraft2,
  ValueStrong,
  WapperContent,
  WapperDraft,
  WapperDraft1,
  WapperDraft2,
  WapperHeaderItem,
} from './styles';

interface ItemIdeaProps {
  item: Idea;
  size?: number;
  ideaHasChanges?: boolean;
}

export const ItemIdea: React.FC<ItemIdeaProps> = ({
  item,
  size,
  ideaHasChanges,
}): JSX.Element => {
  const { colors } = useTheme();

  const { setSelectedIdea, getSelectedIdeaFieldsValues } =
    useContext(IdeaContext);
  const { updateIdeaChange } = useContext(IdeaChangeContext);
  const { listIdeaLinksForIdeaUser } = useContext(ApprovalFunnelContext);

  const [linkedIdeasState, setLinkedIdeasState] = useState([]);

  const levels = [
    { status: true, number: 1 },
    { status: true, number: 2 },
    { status: false, number: 3 },
    { status: false, number: 4 },
    { status: false, number: 5 },
  ];

  const tags = {
    DRAFT: 'Rascunho',
    PUBLISHED: 'Enviada',
  };

  const handleEditIdea = useCallback(
    (idea: Idea) => {
      if (idea) {
        setSelectedIdea(idea);
        getSelectedIdeaFieldsValues(idea.id);
      }
    },
    [getSelectedIdeaFieldsValues, setSelectedIdea]
  );

  const getType = useCallback((idea: Idea): string => {
    return idea?.processActivity?.name || 'Indefinido';
  }, []);

  const getTypeIcon = useCallback(
    (idea: Idea) => {
      return idea?.processActivity?.name ? (
        <RiFileEditLine color={colors.red} size={20} />
      ) : undefined;
    },
    [colors.red]
  );

  const getSequenceNumber = useCallback((sequence: number): string | number => {
    if (sequence >= 100000) {
      return sequence;
    }
    const paddedSequence = sequence.toString().padStart(6, '0');
    return paddedSequence;
  }, []);

  const updateNewIdeaChanges = useCallback(
    async (idea: Idea) => {
      await updateIdeaChange(idea.id);
    },
    [updateIdeaChange]
  );

  useEffect(() => {
    (async () => {
      setLinkedIdeasState(await listIdeaLinksForIdeaUser(item.id));
    })();
  }, [listIdeaLinksForIdeaUser, item]);

  return (
    <div key={item.id}>
      <Item size={size} length={levels.length}>
        <WapperHeaderItem size={size}>
          <WapperDraft>
            <CardIdeia
              value={getType(item)}
              icon={getTypeIcon(item)}
              paddingLeft
            />

            {item.status === 'PUBLISHED' && (
              <PublishedTag>
                <p>{tags[item.status]}</p>
              </PublishedTag>
            )}

            {item.status === 'DRAFT' && (
              <DraftTag>
                <p>{tags[item.status]}</p>
              </DraftTag>
            )}

            <ButtonsContainer>
              <Link href={`/idea/${item.id}`}>
                <a>
                  <ButtonView
                    type="button"
                    onClick={() => updateNewIdeaChanges(item)}
                    className={`eye-details-${normalizeString(
                      KANBAN_STATUS[getStatus(item)]
                    )}`}
                  >
                    <AiOutlineEye color={colors.background} size={22} />
                  </ButtonView>
                </a>
              </Link>
              <LinksWrapper>
                <Links
                  linksCount={linkedIdeasState.length}
                  display={linkedIdeasState.length > 0}
                />
                <LinksTooltip>{`Sua iniciativa está vinculada a ${linkedIdeasState.length} iniciativas`}</LinksTooltip>
              </LinksWrapper>
              {item.status === 'DRAFT' && (
                <Link href={`/idea/manage/${item.campaignId}`}>
                  <a>
                    <ButtonEdit
                      type="button"
                      onClick={() => handleEditIdea(item)}
                    >
                      <AiOutlineEdit color={colors.background} size={22} />
                    </ButtonEdit>
                  </a>
                </Link>
              )}
              {item.status === 'PUBLISHED' &&
                item.kanbanStatus === 'OWNER_REVIEW' && (
                  <Link href={`/idea/manage/${item.campaignId}`}>
                    <a>
                      <ButtonEdit
                        type="button"
                        onClick={() => handleEditIdea(item)}
                        className={`edit-idea-details-${normalizeString(
                          KANBAN_STATUS[getStatus(item)]
                        )}`}
                      >
                        <AiOutlineEdit color={colors.background} size={22} />
                      </ButtonEdit>
                    </a>
                  </Link>
                )}
            </ButtonsContainer>
            {ideaHasChanges ? (
              <WarningTag
                text="Novas Atualizações"
                size="13px"
                margin="0.5rem 1.5rem"
              />
            ) : null}
          </WapperDraft>

          <WapperDraft>
            {/* <ButtonNotification type="button">
              <FiBell color={colors.font} size={20} />
            </ButtonNotification> */}

            {/* <ItemTag> */}
            {item.status !== 'DRAFT' && (
              <KanbanStatus
                type={getStatus(item)}
                className={`kanban-status-${normalizeString(
                  KANBAN_STATUS[getStatus(item)]
                )}`}
              >
                <KanbanStatusText>
                  {KANBAN_STATUS[getStatus(item)]}
                </KanbanStatusText>
              </KanbanStatus>
            )}
            {/* </ItemTag> */}

            {/* {item.kanbanStatus === 'PAUSED' && (
              <PausedTag>
                <AiOutlinePause color="#fff" />
                <p>Pausado</p>
              </PausedTag>
            )}

            {item.kanbanStatus !== 'PAUSED' && (
              <ButtonNextLevel type="button">
                <BiRightArrowAlt color={colors.background} size={24} />
                Proxima fase
              </ButtonNextLevel>
            )} */}
          </WapperDraft>
        </WapperHeaderItem>

        <WapperContent size={size}>
          <WapperDraft1 size={size}>
            <H3Draft1>{item?.campaign?.title}</H3Draft1>
            <IdeaAppId>{`#${getSequenceNumber(item.sequence)}`}</IdeaAppId>
            <H2Draft1>{item.title}</H2Draft1>
          </WapperDraft1>

          <WapperDraft2>
            <ValueStrong>Projeto:</ValueStrong>
            <ValueDraft2>
              {item.description.length > 160 ? (
                <ReactMarkdown>{`${item.description.substring(
                  0,
                  160
                )}...`}</ReactMarkdown>
              ) : (
                <ReactMarkdown>{item.description}</ReactMarkdown>
              )}
            </ValueDraft2>
          </WapperDraft2>

          <ListUsers size={size}>
            {item.ideaUsers.map(user => (
              <ItemUser key={user.id}>
                <UserCard name={user.user.name} image={user.user.image} />
              </ItemUser>
            ))}
          </ListUsers>
        </WapperContent>

        <ProgressBar>
          {item.ideaSteps.map((ideaStep, index) => (
            <ItemProcessBar>
              <Gate>
                {index === 0 ? (
                  <FirstGateTitle>{ideaStep.title}</FirstGateTitle>
                ) : index === item.ideaSteps.length - 1 ? (
                  <LastGateTitle>{ideaStep.title}</LastGateTitle>
                ) : (
                  <GateTitle>{ideaStep.title}</GateTitle>
                )}
                <CircleGate status={ideaStep.completed}>
                  {ideaStep.completed && (
                    <BsCheck color={colors.background} size={20} />
                  )}
                </CircleGate>
              </Gate>
              {item.ideaSteps.length !== index + 1 && (
                <Line completed={ideaStep.completed} />
              )}
            </ItemProcessBar>
          ))}
        </ProgressBar>
      </Item>
    </div>
  );
};
