/* eslint-disable jsx-a11y/label-has-associated-control */
import { TourDetailIdeaWithProcess } from '@components/TourApp/TourDetailIdea/TourDetailIdeaWithProcess';
import { AuthContext } from 'contexts/AuthContext';
import { IdeaStepContext } from 'contexts/IdeaStep';
import { Idea, IdeaStep } from 'interfaces/idea';
import { TourId, TourStatus } from 'interfaces/tour';
import { useCallback, useContext, useEffect, useState } from 'react';
import { BiChevronDown } from 'react-icons/bi';
import { BsCheck } from 'react-icons/bs';
import { MdOutlineMap } from 'react-icons/md';
import { useTheme } from 'styled-components';
import { ItemStep } from '../item';
import {
  ActivitiesList,
  Container,
  DraftLine,
  GateValue,
  Header,
  HistoryWrapper,
  Icon,
  ItemActivity,
  ItemStepp,
  RhombusHistoryComponent,
  ScrollableList,
  StepActivities,
  SubHeader,
  SubTitle,
  ValueStep,
  WapperCircle,
  WapperDraft,
  WapperGate,
  WapperListSteps,
  WapperRotate,
} from './styles';

interface ListStepsProps {
  idea: Idea;
  updateTitleStepSelected: (title: any) => void;
  updateEditableState: (editable: boolean) => void;
}

interface IdeaStepEditable extends IdeaStep {
  editable: boolean;
}

export const ListSteps: React.FC<ListStepsProps> = ({
  idea,
  updateTitleStepSelected,
  updateEditableState,
}): JSX.Element => {
  const { user } = useContext(AuthContext);
  const unviewedTourDetailWithProcess =
    user?.tours[TourId.DETAIL_IDEAS_WITH_PROCESS] === TourStatus.UNVIEWED;
  const { colors } = useTheme();
  const { ideaSteps, listIdeaSteps, toggleIdeaStepItem } =
    useContext(IdeaStepContext);

  const [stepSelected, setStepSelected] = useState<IdeaStepEditable>();

  useEffect(() => {
    updateTitleStepSelected(stepSelected);
    updateEditableState(stepSelected?.editable);
  }, [stepSelected]);

  const handleSelectStep = useCallback(
    async (ideaStep: IdeaStep, index: number) => {
      if (!index && !ideaStep.completed) {
        setStepSelected({ ...ideaStep, editable: true });
      } else if (ideaStep.completed) {
        setStepSelected({ ...ideaStep, editable: false });
      } else if (idea.ideaSteps.length > 1) {
        const previousIdea = idea.ideaSteps[index - 1];

        if (previousIdea.completed) {
          setStepSelected({ ...ideaStep, editable: true });
        } else {
          setStepSelected({ ...ideaStep, editable: false });
        }
      }
    },
    [idea?.ideaSteps]
  );

  const [redirectToStep, setRedirectToStep] = useState(true);

  const selectCurrentStep = (): void => {
    if (idea?.kanbanStep === 'SELECT' || idea?.kanbanStep === 'IMPLEMENTED') {
      for (let i = 0; i < ideaSteps.length; i += 1) {
        if (!ideaSteps[i].completed) {
          handleSelectStep(ideaSteps[i], i);
          setRedirectToStep(false);
          return;
        }
      }
      handleSelectStep(ideaSteps[ideaSteps.length - 1], ideaSteps.length - 1);
    }
  };

  useEffect(() => {
    if (ideaSteps?.length > 0 && redirectToStep) {
      selectCurrentStep();
    }
  }, [ideaSteps]);

  const handleToggleCompleted = useCallback(
    async (stepItemId: string) => {
      await toggleIdeaStepItem(stepSelected.id, stepItemId);
    },
    [toggleIdeaStepItem, stepSelected?.id]
  );

  useEffect(() => {
    async function loadSteps(): Promise<void> {
      if (idea.kanbanStep === 'SELECT' || idea.kanbanStep === 'IMPLEMENTED') {
        await listIdeaSteps(idea.id);
      }
    }

    if (idea?.id) {
      loadSteps();
    }
  }, [idea?.id, idea?.kanbanStep, listIdeaSteps]);

  const historyClick = (): void => {
    updateTitleStepSelected(undefined);
    updateEditableState(false);
    setStepSelected(undefined);
  };

  return (
    <Container className="process-idea-page">
      {unviewedTourDetailWithProcess && <TourDetailIdeaWithProcess />}
      <ScrollableList>
        <WapperListSteps>
          {ideaSteps?.length > 0 && (
            <WapperDraft>
              <HistoryWrapper onClick={historyClick}>
                <RhombusHistoryComponent>Histórico</RhombusHistoryComponent>
              </HistoryWrapper>
              <DraftLine />
              <DraftLine />
              <DraftLine />
            </WapperDraft>
          )}
          {ideaSteps.map((ideaStep, i) => (
            <ItemStepp
              key={ideaStep.id}
              onClick={() => handleSelectStep(ideaStep, i)}
            >
              <ValueStep>{ideaStep.title}</ValueStep>
              <ItemStep
                colors={stepSelected?.id === ideaStep.id ? '#67D1C4' : '#fff'}
              />
              <WapperRotate status={stepSelected?.id === ideaStep.id}>
                <BiChevronDown size={24} color={colors.background} />
              </WapperRotate>
              <WapperDraft>
                <DraftLine />
                <DraftLine />
                <DraftLine />
                <WapperGate>
                  <GateValue>Gate {ideaStep.sequence}</GateValue>
                  <WapperCircle status={ideaStep.completed}>
                    {ideaStep.completed && (
                      <BsCheck color={colors.background} size={20} />
                    )}
                  </WapperCircle>
                </WapperGate>
                <DraftLine />
                <DraftLine />
                <DraftLine />
              </WapperDraft>
            </ItemStepp>
          ))}
        </WapperListSteps>
      </ScrollableList>
      {stepSelected && (
        <StepActivities>
          <Header>
            <strong>Etapa {stepSelected.sequence}</strong>
            {stepSelected.title}
          </Header>
          <SubHeader>
            <Icon>
              <MdOutlineMap size={19} />
            </Icon>
            <SubTitle>Atividades</SubTitle>
          </SubHeader>
          <ActivitiesList>
            {stepSelected.ideaStepItems.map(ideaStepItem => (
              <ItemActivity key={ideaStepItem.id}>
                <label>
                  <input
                    type="checkbox"
                    disabled={!stepSelected.editable}
                    onClick={() => handleToggleCompleted(ideaStepItem.id)}
                    defaultChecked={ideaStepItem.completed}
                  />
                  <span className="process-idea-page-2">
                    {ideaStepItem.title}
                  </span>
                </label>
              </ItemActivity>
            ))}
          </ActivitiesList>
        </StepActivities>
      )}
    </Container>
  );
};
