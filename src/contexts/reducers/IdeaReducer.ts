import { Paginate } from '@default-types';
import { Idea, IdeaField } from 'interfaces/idea';

interface IdeaProps {
  loading: boolean;
  paginate: Paginate | null;
  ideas: Idea[];
  ideasForLink: Idea[];
  last6ideas: Idea[];
  ideaFields: IdeaField[];
  idea: Idea | null;
  selectedIdea: Idea | null;
  selectedIdeaFields: IdeaField[];
  campaignIdForNewIdea: string;
  campaign_filter: Array<{
    id: string;
    title?: string;
  }>;
  ideasPerStatus: {
    onGoing: string;
    techReview: string;
    refused: string;
  };
  ideasPerRoute: Array<{
    routeName: string;
    ideasAmount: string;
    color: string;
  }>;
}

export const IdeaDefaultValues = {
  loading: false,
  paginate: null,
  ideas: [],
  ideasForLink: [],
  last6ideas: [],
  ideaFields: [],
  idea: null,
  selectedIdea: null,
  selectedIdeaFields: [],
  campaign_filter: [],
  campaignIdForNewIdea: '',
  ideasPerStatus: {
    onGoing: '',
    techReview: '',
    refused: '',
  },
  ideasPerRoute: [],
};

type IdeaAction =
  | { type: 'SET_LOADING'; loading: boolean }
  | { type: 'SET_IDEAS'; ideas: Idea[] }
  | { type: 'SET_IDEAS_FOR_LINK'; ideasForLink: Idea[] }
  | { type: 'SET_IDEA'; idea: Idea }
  | { type: 'SET_SELECTED_IDEA'; idea: Idea }
  | { type: 'SET_SELECTED_IDEA_FIELDS'; selectedIdeaFields: IdeaField[] }
  | { type: 'SET_IDEA_FIELDS'; ideaFields: IdeaField[] }
  | { type: 'SET_CAMPAIGN_ID_TO_IDEA'; campaignIdForNewIdea: string }
  | { type: 'SET_LAST_6_IDEAS'; last6ideas: Idea[] }
  | {
      type: 'SET_FILTER_CAMPAIGN';
      campaign_filter: Array<{
        id: string;
        title?: string;
      }>;
    }
  | {
      type: 'SET_IDEAS_PER_STATUS';
      ideasPerStatus: {
        onGoing: string;
        techReview: string;
        refused: string;
      };
    }
  | {
      type: 'SET_IDEAS_PER_ROUTE';
      ideasPerRoute: Array<{
        routeName: string;
        ideasAmount: string;
        color: string;
      }>;
    }
  | { type: 'SET_PAGINATE'; paginate: Paginate };

export const IdeaReducer = (
  state: IdeaProps,
  action: IdeaAction
): IdeaProps => {
  const nextState = { ...state };

  switch (action.type) {
    case 'SET_LOADING':
      nextState.loading = action.loading;
      break;
    case 'SET_IDEAS':
      nextState.ideas = action.ideas;
      break;
    case 'SET_CAMPAIGN_ID_TO_IDEA':
      nextState.campaignIdForNewIdea = action.campaignIdForNewIdea;
      break;
    case 'SET_IDEA':
      nextState.idea = action.idea;
      break;
    case 'SET_IDEAS_FOR_LINK':
      nextState.ideasForLink = action.ideasForLink;
      break;
    case 'SET_SELECTED_IDEA':
      nextState.selectedIdea = action.idea;
      break;
    case 'SET_SELECTED_IDEA_FIELDS':
      nextState.selectedIdeaFields = action.selectedIdeaFields;
      break;
    case 'SET_IDEA_FIELDS':
      nextState.ideaFields = action.ideaFields;
      break;
    case 'SET_PAGINATE':
      nextState.paginate = action.paginate;
      break;
    case 'SET_LAST_6_IDEAS':
      nextState.last6ideas = action.last6ideas;
      break;
    case 'SET_FILTER_CAMPAIGN':
      nextState.campaign_filter = action.campaign_filter;
      break;
    case 'SET_IDEAS_PER_STATUS':
      nextState.ideasPerStatus = action.ideasPerStatus;
      break;
    case 'SET_IDEAS_PER_ROUTE':
      nextState.ideasPerRoute = action.ideasPerRoute;
      break;
    default:
      return nextState;
  }
  return nextState;
};
