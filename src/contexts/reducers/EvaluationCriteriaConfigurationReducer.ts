import { IEvaluationCriteria } from '../../interfaces/evaluationCriteria';

interface EvaluationCriteriaProps {
  loading: boolean;
  evaluationCriteriasConfig: IEvaluationCriteria[];
}

export const EvaluationCriteriaDefaultValues = {
  loading: true,
  evaluationCriteriasConfig: []
};

type EvaluationCriteriaAction =
  | { type: 'SET_LOADING'; loading: boolean }
  | {
      type: 'SET_EVALUATION_CRITERIAS';
      evaluationCriteriasConfig: IEvaluationCriteria[];
    };

export const EvaluationCriteriaConfigurationReducer = (
  state: EvaluationCriteriaProps,
  action: EvaluationCriteriaAction
): EvaluationCriteriaProps => {
  const nextState = { ...state };

  switch (action.type) {
    case 'SET_LOADING':
      nextState.loading = action.loading;
      break;
    case 'SET_EVALUATION_CRITERIAS':
      nextState.evaluationCriteriasConfig = action.evaluationCriteriasConfig;
      break;
    default:
      return nextState;
  }
  return nextState;
};
