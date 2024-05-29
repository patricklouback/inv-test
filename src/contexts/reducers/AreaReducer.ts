import { Area } from 'interfaces/areas';

interface AreaProps {
  areas: Area[];
  area: Area;
  loading: boolean;
}

type AreaActions = 
  | { type: 'SET_AREAS'; areas: Area[] } 
  | { type: 'SET_AREA'; area: Area } 
  | { type: 'SET_LOADING'; loading: boolean };

export const AreaDefaultValues = {
  areas: [],
  area: {},
  loading: false,
} as AreaProps;

export const AreaReducer = (
  state: AreaProps,
  action: AreaActions
): AreaProps => {
  const newState = { ...state };

  switch (action.type) {
    case 'SET_AREAS':
      newState.areas = action.areas;
      break;
    case 'SET_AREA':
      newState.area = action.area;
      break;
    case 'SET_LOADING':
      newState.loading = action.loading;
      break;
    default:
      break;
  }
  return newState;
};
