import { FilteredIdeaTags, IdeaTag } from 'interfaces/idea';

interface IdeaTagProps {
  loading: boolean;
  allIdeaTags: IdeaTag[];
  filteredIdeaTags: FilteredIdeaTags[];
}

export const IdeaTagDefaultValues = {
  loading: false,
  allIdeaTags: [],
  filteredIdeaTags: []
};

type IdeaTagAction =
  | { type: 'SET_LOADING'; loading: boolean }
  | { type: 'SET_IDEA_TAGS'; allIdeaTags: IdeaTag[] }
  | { type: 'SET_FILTERED_IDEA_TAGS'; filteredIdeaTags: FilteredIdeaTags[] }


export const IdeaTagReducer = (
  state: IdeaTagProps,
  action: IdeaTagAction
): IdeaTagProps => {
  const nextState = { ...state };

  switch (action.type) {
    case 'SET_LOADING':
      nextState.loading = action.loading;
      break;
    case 'SET_IDEA_TAGS':
      nextState.allIdeaTags = action.allIdeaTags;
      break;
    case 'SET_FILTERED_IDEA_TAGS':
      nextState.filteredIdeaTags = action.filteredIdeaTags;
      break;
    default:
      return nextState;
  }
  return nextState;
};
