import { FeatureActive } from 'interfaces/featureActive';

interface FeatureActiveProps {
  loading: boolean;
  featureActives: FeatureActive[];
}

export const FeatureActiveDefaultValues = {
  loading: true,
  featureActives: []
};

type FeatureActiveAction =
  | { type: 'SET_LOADING'; loading: boolean }
  | { type: 'SET_FEATURE_ACTIVES'; featureActives: FeatureActive[] };

export const FeatureActiveReducer = (
  state: FeatureActiveProps,
  action: FeatureActiveAction
): FeatureActiveProps => {
  const nextState = { ...state };

  switch (action.type) {
    case 'SET_LOADING':
      nextState.loading = action.loading;
      break;
    case 'SET_FEATURE_ACTIVES':
      nextState.featureActives = action.featureActives;
      break;
    default:
      return nextState;
  }
  return nextState;
};
