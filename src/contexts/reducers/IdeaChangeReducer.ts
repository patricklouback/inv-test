import { IdeaChange } from 'interfaces/idea';

interface IdeaChangeProps {
  loading: boolean;
  ideaChanges: IdeaChange[];
  ideaChangesForUser: IdeaChange[];
}

export const IdeaChangeDefaultValues = {
  loading: false,
  ideaChanges: [],
  ideaChangesForUser: [],
};

type IdeaChangeAction =
  | { type: 'SET_LOADING'; loading: boolean }
  | { type: 'SET_IDEA_CHANGES'; ideaChanges: IdeaChange[] }
  | { type: 'SET_IDEA_CHANGES_FOR_USER'; ideaChangesForUser: IdeaChange[] };

export const IdeaChangeReducer = (
  state: IdeaChangeProps,
  action: IdeaChangeAction
): IdeaChangeProps => {
  const nextState = { ...state };

  switch (action.type) {
    case 'SET_LOADING':
      nextState.loading = action.loading;
      break;
    case 'SET_IDEA_CHANGES':
      nextState.ideaChanges = action.ideaChanges;
      break;
    case 'SET_IDEA_CHANGES_FOR_USER':
      nextState.ideaChangesForUser = action.ideaChangesForUser;
      break;
    default:
      return nextState;
  }
  return nextState;
};
