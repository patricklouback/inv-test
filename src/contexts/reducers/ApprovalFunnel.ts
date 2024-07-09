import { Paginate } from '@default-types';
import { Idea, KanbanObject, KanbanStep } from 'interfaces/idea';





interface ApprovalFunnelProps {
  loading: boolean;
  paginate: Paginate | null;
  kanbanIdeas: KanbanObject;
  kanbanSteps: KanbanStep[];
  ideasForLink: Idea[];
  linkedIdeas: Idea[];
  allLinkedIdeas: Idea[];
  selectedCampaignsIds: string[];
  selectedIdeaTypes: string[];
  }

export const ApprovalFunnelDefaultValues = {
  loading: false,
  paginate: null,
  kanbanIdeas: {},
  kanbanSteps: [],
  ideasForLink: [],
  linkedIdeas: [],
  allLinkedIdeas: [],
  selectedCampaignsIds: [],
  selectedIdeaTypes: [],
};

type ApprovalFunnelAction =
  | { type: 'SET_LOADING'; loading: boolean }
  | { type: 'SET_KANBAN_IDEAS'; kanbanIdeas: KanbanObject }
  | { type: 'SET_KANBAN_STEPS'; kanbanSteps: KanbanStep[] }
  | { type: 'SET_IDEAS_LINK'; ideasForLink: Idea[] }
  | { type: 'SET_ALL_LINKED_IDEAS'; allLinkedIdeas: Idea[] }
  | { type: 'SET_LINKED_IDEAS'; linkedIdeas: Idea[] }
  | { type: 'SET_SELECTED_CAMPAIGNS_IDS'; selectedCampaignsIds: string[] }
  | { type: 'SET_SELECTED_IDEA_TYPES'; selectedIdeaTypes: string[] }

export const ApprovalFunnelReducer = (
  state: ApprovalFunnelProps,
  action: ApprovalFunnelAction
): ApprovalFunnelProps => {
  const nextState = { ...state };

  switch (action.type) {
    case 'SET_LOADING':
      nextState.loading = action.loading;
      break;
    case 'SET_KANBAN_IDEAS':
      nextState.kanbanIdeas = action.kanbanIdeas;
      break;
    case 'SET_KANBAN_STEPS':
      nextState.kanbanSteps = action.kanbanSteps;
      break;
    case 'SET_IDEAS_LINK':
      nextState.ideasForLink = action.ideasForLink;
      break;
    case 'SET_LINKED_IDEAS':
      nextState.linkedIdeas = action.linkedIdeas;
      break;
    case 'SET_ALL_LINKED_IDEAS':
      nextState.allLinkedIdeas = action.allLinkedIdeas;
      break;
    case 'SET_SELECTED_CAMPAIGNS_IDS':
      nextState.selectedCampaignsIds = action.selectedCampaignsIds;
      break;
    case 'SET_SELECTED_IDEA_TYPES':
      nextState.selectedIdeaTypes = action.selectedIdeaTypes;
      break;
    default:
      return nextState;
  }
  return nextState;
};
