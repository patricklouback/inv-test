import { IdeaStep } from 'interfaces/idea';

interface IdeaStepProps {
  loading: boolean;
  ideaSteps: IdeaStep[];
}

export const IdeaStepDefaultValues = {
  loading: false,
  ideaSteps: [],
};

type IdeaStepAction =
  | { type: 'SET_LOADING'; loading: boolean }
  | { type: 'SET_IDEA_STEPS'; ideaSteps: IdeaStep[] };

export const IdeaStepReducer = (
  state: IdeaStepProps,
  action: IdeaStepAction
): IdeaStepProps => {
  const nextState = { ...state };

  switch (action.type) {
    case 'SET_LOADING':
      nextState.loading = action.loading;
      break;
    case 'SET_IDEA_STEPS':
      nextState.ideaSteps = action.ideaSteps;
      break;
    default:
      return nextState;
  }
  return nextState;
};
