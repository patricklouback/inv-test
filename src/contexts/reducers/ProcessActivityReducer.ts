import { ProcessActivity } from 'interfaces/processActivity';

interface ProcessActivityProps {
  loading: boolean;
  processActivities: ProcessActivity[];
  processActivitiesCampaign: ProcessActivity[];
}

export const ProcessActivityDefaultValues = {
  loading: false,
  processActivities: [],
  processActivitiesCampaign: [],
};

type ProcessActivityAction =
  | { type: 'SET_LOADING'; loading: boolean }
  | { type: 'SET_PROCESS_ACTIVITIES'; processActivities: ProcessActivity[] }
  | { type: 'SET_PROCESS_ACTIVITIES_CAMPAIGN'; processActivitiesCampaign: ProcessActivity[] };;

export const ProcessActivityReducer = (
  state: ProcessActivityProps,
  action: ProcessActivityAction
): ProcessActivityProps => {
  const nextState = { ...state };

  switch (action.type) {
    case 'SET_LOADING':
      nextState.loading = action.loading;
      break;
    case 'SET_PROCESS_ACTIVITIES':
      nextState.processActivities = action.processActivities;
      break;
    case 'SET_PROCESS_ACTIVITIES_CAMPAIGN':
      nextState.processActivitiesCampaign = action.processActivitiesCampaign;
      break;
    default:
      return nextState;
  }
  return nextState;
};
