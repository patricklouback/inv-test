import { Paginate } from '@default-types';
import { IdeaComment } from 'interfaces/idea';

interface IdeaCommentProps {
  loading: boolean;
  paginate: Paginate | null;
  ideaComments: IdeaComment[];
}

export const IdeaCommentDefaultValues = {
  loading: false,
  paginate: null,
  ideaComments: [],
};

type IdeaCommentAction =
  | { type: 'SET_LOADING'; loading: boolean }
  | { type: 'SET_IDEA_COMMENTS'; ideaComments: IdeaComment[] };

export const IdeaCommentReducer = (
  state: IdeaCommentProps,
  action: IdeaCommentAction
): IdeaCommentProps => {
  const nextState = { ...state };

  switch (action.type) {
    case 'SET_LOADING':
      nextState.loading = action.loading;
      break;
    case 'SET_IDEA_COMMENTS':
      nextState.ideaComments = action.ideaComments;
      break;
    default:
      return nextState;
  }
  return nextState;
};
