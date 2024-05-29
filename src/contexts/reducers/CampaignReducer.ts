import { Campaign, Paginate } from '@default-types';
import { CampaignField, ProcessActivity } from 'interfaces/campaign';

interface RankingCampaign {
  rank: string,
  title: string;
  createdIdeas: string;
  implementedIdeas: string;
}
interface CampaignProps {
  loading: boolean;
  paginate: Paginate | null;
  campaigns: Campaign[];
  campaignsInfo: Campaign[];
  campaignFields: CampaignField[];
  selectedCampaignFields: CampaignField[];
  campaign: Campaign | null;
  processActivities: ProcessActivity[] | null;
  campaignsRanking: RankingCampaign[] | null;
}


export const CampaignDefaultValues = {
  loading: false,
  paginate: null,
  campaigns: [],
  campaignFields: [],
  selectedCampaignFields: [],
  campaignsInfo: [],
  campaign: null,
  processActivities: [],
  campaignsRanking: [],
};

type CampaignAction =
  | { type: 'SET_LOADING'; loading: boolean }
  | { type: 'SET_CAMPAIGN'; campaign: Campaign }
  | { type: 'SET_PAGINATE'; paginate: Paginate }
  | { type: 'SET_CAMPAIGNS'; campaigns: Campaign[] }
  | { type: 'SET_CAMPAIGN_FIELDS'; campaignFields: CampaignField[] }
  | {
      type: 'SET_SELECTED_CAMPAIGN_FIELDS';
      selectedCampaignFields: CampaignField[];
    }
  | { type: 'SET_CAMPAIGNS_INFO'; campaignsInfo: Campaign[] }
  | { type: 'SET_PROCESS_ACTIVITIES'; processActivities: ProcessActivity[] }
  | { type: 'SET_CAMPAIGNS_RANKING'; campaignsRanking: RankingCampaign[]}

export const CampaignReducer = (
  state: CampaignProps,
  action: CampaignAction
): CampaignProps => {
  const nextState = { ...state };

  switch (action.type) {
    case 'SET_LOADING':
      nextState.loading = action.loading;
      break;
    case 'SET_CAMPAIGN':
      nextState.campaign = action.campaign;
      break;
    case 'SET_CAMPAIGNS':
      nextState.campaigns = action.campaigns;
      break;
    case 'SET_CAMPAIGN_FIELDS':
      nextState.campaignFields = action.campaignFields;
      break;
    case 'SET_SELECTED_CAMPAIGN_FIELDS':
      nextState.selectedCampaignFields = action.selectedCampaignFields;
      break;
    case 'SET_CAMPAIGNS_INFO':
      nextState.campaignsInfo = action.campaignsInfo;
      break;
    case 'SET_PAGINATE':
      nextState.paginate = action.paginate;
      break;
    case 'SET_PROCESS_ACTIVITIES':
      nextState.processActivities = action.processActivities;
      break;
    case 'SET_CAMPAIGNS_RANKING':
      nextState.campaignsRanking = action.campaignsRanking;
      break;
    default:
      return nextState;
  }
  return nextState;
};
