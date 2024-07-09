import { IEvaluationCriteria } from '../../interfaces/evaluationCriteria';

interface EvaluationCriteriaProps {
  loading: boolean;
  evaluationCriteriasCampaign: IEvaluationCriteria[];
}

export const EvaluationCriteriaDefaultValues = {
  loading: true,
  evaluationCriteriasCampaign: [],
};

type EvaluationCriteriaAction =
  | { type: 'SET_LOADING'; loading: boolean }
  | {
      type: 'SET_EVALUATION_CRITERIAS';
      evaluationCriteriasCampaign: IEvaluationCriteria[];
    };

export const EvaluationCriteriaCampaignReducer = (
  state: EvaluationCriteriaProps,
  action: EvaluationCriteriaAction
): EvaluationCriteriaProps => {
  const nextState = { ...state };

  switch (action.type) {
    case 'SET_LOADING':
      nextState.loading = action.loading;
      break;
    case 'SET_EVALUATION_CRITERIAS':
      nextState.evaluationCriteriasCampaign =
        action.evaluationCriteriasCampaign;
      break;
    default:
      return nextState;
  }
  return nextState;
};
