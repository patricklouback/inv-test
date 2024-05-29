import { IdeaField, KanbanStep } from 'interfaces/idea';
import { CampaignField } from 'interfaces/campaign';

interface ConfigProps {
  loading: boolean;
  company_image?: string;
  company_terms?: string;
  slogan?: string;
  idea_creation_weight?: string;
  idea_co_creation_weight?: string;
  idea_comment_weight?: string;
  idea_select_weight?: string;
  idea_implement_weight?: string;
  default_users_csv?: any;
  ideaFields: IdeaField[];
  campaignFields: CampaignField[];
  kanbanSteps: KanbanStep[];
}

type ConfigActions =
  | { type: 'SET_LOADING'; loading: boolean }
  | { type: 'SET_SLOGAN'; slogan: string }
  | { type: 'SET_COMPANY_IMAGE'; company_image: string }
  | { type: 'SET_COMPANY_TERMS'; company_terms: string }
  | { type: 'SET_IDEA_CREATION_WEIGHT'; idea_creation_weight: string }
  | { type: 'SET_IDEA_FIELDS'; ideaFields: IdeaField[] }
  | { type: 'SET_CAMPAIGN_FIELDS'; campaignFields: CampaignField[] }
  | { type: 'SET_IDEA_CO_CREATION_WEIGHT'; idea_co_creation_weight: string }
  | { type: 'SET_IDEA_COMMENT_WEIGHT'; idea_comment_weight: string }
  | { type: 'SET_IDEA_SELECT_WEIGHT'; idea_select_weight: string }
  | { type: 'SET_IDEA_IMPLEMENT_WEIGHT'; idea_implement_weight: string }
  | { type: 'SET_DEFAULT_USERS_CSV'; default_users_csv: any }
  | { type: 'SET_KANBAN_STEPS'; kanbanSteps: KanbanStep[] };

export const ConfigDefaultValues = {
  loading: false,
  company_image: '/images/default_company.png',
  slogan: 'Slogan de inovação',
  ideaFields: [],
  campaignFields: [],
  company_terms: '',
} as ConfigProps;

export const ConfigReducer = (
  state: ConfigProps,
  action: ConfigActions
): ConfigProps => {
  const newState = { ...state };

  switch (action.type) {
    case 'SET_LOADING':
      newState.loading = action.loading;
      break;
    case 'SET_COMPANY_IMAGE':
      newState.company_image = action.company_image;
      break;
    case 'SET_COMPANY_TERMS':
      newState.company_terms = action.company_terms;
      break;
    case 'SET_SLOGAN':
      newState.slogan = action.slogan;
      break;
    case 'SET_IDEA_CREATION_WEIGHT':
      newState.idea_creation_weight = action.idea_creation_weight;
      break;
    case 'SET_IDEA_CO_CREATION_WEIGHT':
      newState.idea_co_creation_weight = action.idea_co_creation_weight;
      break;
    case 'SET_IDEA_COMMENT_WEIGHT':
      newState.idea_comment_weight = action.idea_comment_weight;
      break;
    case 'SET_IDEA_SELECT_WEIGHT':
      newState.idea_select_weight = action.idea_select_weight;
      break;
    case 'SET_IDEA_IMPLEMENT_WEIGHT':
      newState.idea_implement_weight = action.idea_implement_weight;
      break;
    case 'SET_IDEA_FIELDS':
      newState.ideaFields = action.ideaFields;
      break;
    case 'SET_CAMPAIGN_FIELDS':
      newState.campaignFields = action.campaignFields;
      break;
    case 'SET_DEFAULT_USERS_CSV':
      newState.default_users_csv = action.default_users_csv;
      break;
    case 'SET_KANBAN_STEPS':
      newState.kanbanSteps = action.kanbanSteps;
      break;
    default:
      break;
  }
  return newState;
};
