/* eslint-disable no-restricted-syntax */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/label-has-associated-control */
import Button from '@components/Button';
import { ApprovalFunnelContext } from 'contexts/ApprovalFunnel';
import { IdeaContext } from 'contexts/Idea';
import { IdeaCommentContext } from 'contexts/IdeaComments';
import { IdeaStepContext } from 'contexts/IdeaStep';
import { format } from 'date-fns';
import { Idea, IdeaStep } from 'interfaces/idea';
import { useCallback, useContext, useEffect, useState } from 'react';
import { hotjar } from 'react-hotjar';
import { BiChevronDown } from 'react-icons/bi';
import { FiCheck } from 'react-icons/fi';
import { MdOutlineMap } from 'react-icons/md';
import { useTheme } from 'styled-components';
import { HistoryItensContext } from 'contexts/History';
import { IdeaComments } from '../Components/IdeaComments';
import { SvgWallpaper } from './Svg';
import {
  Activity,
  Circle,
  Container,
  ContentSteps,
  DraftLine,
  Gate,
  Header,
  HistoryWrapper,
  IconCollapse,
  ItemActivity,
  ItemStep,
  ItemStepContainer,
  KanbanActions,
  ListActivity,
  ListSteps,
  RhombusHistoryComponent,
  StepI,
  Title,
  TitleProcess,
  Value,
  ValueActivity,
  ValueStep,
  WapperDraft,
} from './styles';

interface ProcessDevelopProps {
  idea: Idea;
  setUpdateSteps: () => void;
}

interface IdeaStepSelected extends IdeaStep {
  editable?: boolean;
}

export function ProcessDevelop({
  idea,
  setUpdateSteps,
}: ProcessDevelopProps): JSX.Element {
  const { colors } = useTheme();
  const { ideaComments, getIdeasComments, getPossibleMentionUsers } =
    useContext(IdeaCommentContext);
  const { ideaSteps, listIdeaSteps, toggleIdeaStepItem, approveIdeaStep } =
    useContext(IdeaStepContext);
  const { getHistoryItens } = useContext(HistoryItensContext);

  const { listAllLinkedIdeas } = useContext(ApprovalFunnelContext);
  const [steps, setSteps] = useState([]);
  const [ideaFilteredComments, setIdeaFilteredComments] = useState([]);
  const [stage, setStage] = useState('');
  const [redirectToStep, setRedirectToStep] = useState(true);
  const [ideaStepSelected, setIdeaStepSelected] = useState<IdeaStepSelected>();
  const [ideasIds, setIdeasIds] = useState<string[]>([]);
  const [allIdeaSteps, setAllIdeaSteps] = useState([]);
  const [relatededStepsIds, setRelatedStepsIds] = useState([]);

  useEffect(() => {
    if (ideaSteps.length > 0) {
      setSteps(ideaSteps);
    }
  }, [ideaSteps]);
  useEffect(() => {
    if (idea != null) {
      setSteps(idea.ideaSteps);
    }
  }, [idea]);

  const getFilteredComments = (ideaComments): any[] => {
    if (
      ideaStepSelected !== undefined &&
      Object.keys(ideaStepSelected).length !== 0 &&
      relatededStepsIds.length > 0
    ) {
      return ideaComments.filter(comment => {
        const filtered = relatededStepsIds.find(relatedStepItem =>
          relatedStepItem.includes(ideaStepSelected.id)
        );
        return filtered?.includes(comment.stepId);
      });
    }
    return ideaComments.filter(
      comment => comment.stepId === undefined || comment.stepId === null
    );
  };

  useEffect(() => {
    setIdeaFilteredComments(getFilteredComments(ideaComments));
  }, [ideaComments, stage, ideaStepSelected]);

  const { updateIdeaKanbanStatus, viewIdea } = useContext(IdeaContext);
  const { updateIdeaStatusInKanbanIdeas, allLinkedIdeas } = useContext(
    ApprovalFunnelContext
  );

  const handleToggleCompleted = useCallback(
    async (stepItemId: string) => {
      await toggleIdeaStepItem(ideaStepSelected.id, stepItemId);
    },
    [toggleIdeaStepItem, ideaStepSelected?.id]
  );

  const generalHistoryClick = (): void => {
    setIdeaStepSelected(undefined);
    setStage('');
  };

  const handleSelectIdea = useCallback(
    (ideaStep: IdeaStep, index: number) => {
      setStage(ideaStep.title);
      if (!index && !ideaStep.completed) {
        setIdeaStepSelected({ ...ideaStep, editable: true });
      } else if (ideaStep.completed) {
        setIdeaStepSelected({ ...ideaStep, editable: false });
      } else if (ideaSteps.length > 1) {
        const previousIdea = ideaSteps[index - 1];
        if (previousIdea.completed) {
          setIdeaStepSelected({ ...ideaStep, editable: true });
        } else {
          setIdeaStepSelected({ ...ideaStep, editable: false });
        }
      }
    },
    [ideaSteps]
  );

  const selectCurrentStep = (): void => {
    if (idea?.kanbanStep === 'SELECT' || idea?.kanbanStep === 'IMPLEMENTED') {
      for (let i = 0; i < ideaSteps.length; i += 1) {
        if (!ideaSteps[i].completed) {
          handleSelectIdea(ideaSteps[i], i);
          setRedirectToStep(false);
          return;
        }
      }
      setIdeaStepSelected(ideaSteps[ideaSteps.length - 1]);
      handleSelectIdea(ideaSteps[ideaSteps.length - 1], ideaSteps.length - 1);
    }
  };

  const handleApproveStep = useCallback(async () => {
    await approveIdeaStep(ideaStepSelected.id, idea.id);
    await getHistoryItens(idea.id);

    let isLast: boolean;
    for (const iS of ideaSteps) {
      if (iS.sequence <= ideaStepSelected.sequence) {
        isLast = true;
      } else {
        isLast = false;
      }
    }

    if (hotjar.initialized() && isLast) {
      hotjar.event('approve_last_gate');
    } else {
      console.error('hotjar não inicializado corretamente');
    }

    setIdeaStepSelected(undefined);
    setUpdateSteps();
    selectCurrentStep();
  }, [approveIdeaStep, ideaStepSelected]);

  const handlePauseIdea = useCallback(async () => {
    await updateIdeaKanbanStatus(idea?.id, 'PAUSED');
    await viewIdea(idea?.id);
    updateIdeaStatusInKanbanIdeas(idea?.id, 'PAUSED');
  }, [idea, updateIdeaKanbanStatus, updateIdeaStatusInKanbanIdeas, viewIdea]);

  const handleResumeIdea = useCallback(async () => {
    await updateIdeaKanbanStatus(idea?.id, 'WAITING');
    await viewIdea(idea?.id);
    updateIdeaStatusInKanbanIdeas(idea?.id, 'WAITING');
  }, [idea, updateIdeaKanbanStatus, updateIdeaStatusInKanbanIdeas, viewIdea]);

  useEffect(() => {
    if (ideaSteps?.length > 0 && redirectToStep) {
      selectCurrentStep();
    }
  }, [ideaSteps]);

  useEffect(() => {
    async function loadComments(): Promise<void> {
      await getIdeasComments(ideasIds, {
        type: ['DEVELOPMENT', 'EVALUATION'],
      });
      if (idea.kanbanStep === 'SELECT' || idea.kanbanStep === 'IMPLEMENTED') {
        setRedirectToStep(true);
        await listIdeaSteps(idea.id);
      }
    }

    if (idea?.id && ideasIds.length > 0) {
      loadComments();
    }
  }, [
    getPossibleMentionUsers,
    getIdeasComments,
    idea?.id,
    idea?.kanbanStep,
    listIdeaSteps,
    ideasIds,
  ]);

  const getReletadSteps = (stepName: string): string[] => {
    const relatedIds = [];
    allIdeaSteps.forEach(ideaStepItem => {
      ideaStepItem
        .filter(step => step.title === stepName)
        .forEach(step => relatedIds.push(step.id));
    });
    return relatedIds;
  };

  useEffect(() => {
    const relatedSteps = [];
    if (allIdeaSteps.length > 0) {
      ideaSteps.forEach(step => {
        relatedSteps.push(getReletadSteps(step.title));
      });
    }
    setRelatedStepsIds(relatedSteps);
  }, [allIdeaSteps, ideaSteps]);

  useEffect(() => {
    async function getAllSteps(): Promise<void> {
      const allSteps = [];
      await Promise.all(
        ideasIds.map(async ideaId => {
          allSteps.push(await listIdeaSteps(ideaId, true));
        })
      );
      setAllIdeaSteps(allSteps);
    }
    getAllSteps();
  }, [ideasIds]);

  useEffect(() => {
    if (idea?.id && allLinkedIdeas) {
      const newIdeaIds = [];
      allLinkedIdeas.forEach(linkedIdea => newIdeaIds.push(linkedIdea));
      setIdeasIds(newIdeaIds.length === 0 ? [idea.id] : newIdeaIds);
    }
  }, [allLinkedIdeas]);

  useEffect(() => {
    async function loadAllLinkedIdeas(ideaId: string): Promise<void> {
      await listAllLinkedIdeas(ideaId);
    }
    loadAllLinkedIdeas(idea.id);
  }, [idea, listAllLinkedIdeas]);

  const isInLastStage =
    stage === 'Conclusão e resultados' || stage === 'Resultados';
  const isCompleted =
    steps.filter(s => s.completed).length === steps.length && isInLastStage;

  const isActualStep =
    isCompleted ||
    (idea?.kanbanStep &&
      idea.kanbanStep !== 'SELECT' &&
      idea.kanbanStep !== 'IMPLEMENTED') ||
    (ideaStepSelected != null && ideaStepSelected.editable) ||
    (ideaStepSelected !== null &&
      ideaStepSelected?.sequence === ideaSteps.length &&
      ideaStepSelected.completed);

  return (
    <Container className="process-funnel">
      <TitleProcess>Processo de Desenvolvimento</TitleProcess>
      {idea?.kanbanStep &&
        (idea.kanbanStep === 'SELECT' || idea.kanbanStep === 'IMPLEMENTED') && (
          <>
            <ListSteps>
              <HistoryWrapper onClick={generalHistoryClick}>
                <RhombusHistoryComponent>Histórico</RhombusHistoryComponent>
              </HistoryWrapper>
              <WapperDraft>
                <DraftLine />
              </WapperDraft>
              {ideaSteps.map((ideaStep, i) => (
                <ItemStepContainer key={ideaStep.id}>
                  <ItemStep onClick={() => handleSelectIdea(ideaStep, i)}>
                    <SvgWallpaper />
                    <IconCollapse
                      selected={ideaStep.id === ideaStepSelected?.id}
                    >
                      <BiChevronDown size={20} color={colors.background} />
                    </IconCollapse>
                    <Value>{ideaStep.title}</Value>
                  </ItemStep>
                  <Gate>
                    <span>Gate {i + 1}</span>
                    <Circle completed={ideaStep.completed}>
                      <FiCheck size={20} color={colors.background} />
                    </Circle>
                  </Gate>
                </ItemStepContainer>
              ))}
            </ListSteps>

            {ideaStepSelected?.ideaStepItems?.length > 0 && (
              <ContentSteps>
                <Header>
                  <Title>
                    <StepI>Etapa {ideaStepSelected.sequence}</StepI>
                    <ValueStep>{ideaStepSelected.title}</ValueStep>
                  </Title>
                  <Activity>
                    <div id="icon">
                      <MdOutlineMap size={19} />
                    </div>
                    <ValueActivity>Atividades</ValueActivity>
                  </Activity>
                </Header>
                <ListActivity>
                  {ideaStepSelected.ideaStepItems.map(ideaStepItem => (
                    <ItemActivity key={ideaStepItem.id}>
                      <label>
                        <input
                          type="checkbox"
                          disabled={!ideaStepSelected.editable}
                          onClick={() => handleToggleCompleted(ideaStepItem.id)}
                          defaultChecked={ideaStepItem.completed}
                        />
                        <span>{ideaStepItem.title}</span>
                        <span>
                          Limite:{' '}
                          {format(
                            new Date(ideaStepItem.limitDate),
                            'dd/MM/yyyy'
                          )}
                        </span>
                      </label>
                    </ItemActivity>
                  ))}
                </ListActivity>
              </ContentSteps>
            )}
            <KanbanActions>
              {idea.kanbanStatus !== 'PAUSED' && (
                <Button onClick={handlePauseIdea}>Pausar iniciativa</Button>
              )}

              {idea.kanbanStatus === 'PAUSED' && (
                <Button onClick={handleResumeIdea}>Retomar iniciativa</Button>
              )}

              {isActualStep &&
                ideaStepSelected &&
                !ideaStepSelected?.completed && (
                  <Button className="next-level" onClick={handleApproveStep}>
                    Aprovar para o próximo estágio
                  </Button>
                )}
            </KanbanActions>
          </>
        )}

      <IdeaComments
        type={['DEVELOPMENT', 'EVALUATION']}
        idea={idea}
        ideaStepSelected={ideaStepSelected}
        showComments={isActualStep}
        ideaFilteredComments={ideaFilteredComments}
        ideasIds={ideasIds}
      />
    </Container>
  );
}
