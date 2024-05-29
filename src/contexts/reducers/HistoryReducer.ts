import { HistoryItem } from 'interfaces/history';

interface HistoryProps {
  historyItens: HistoryItem[];
  loading: boolean;
}

type HistoryActions =
  | { type: 'SET_HISTORY_ITENS'; historyItens: HistoryItem[] }
  | { type: 'SET_LOADING'; loading: boolean };

export const HistoryDefaultValues = {
  historyItens: [],
  loading: false,
} as HistoryProps;

export const HistoryReducer = (
  state: HistoryProps,
  action: HistoryActions
): HistoryProps => {
  const newState = { ...state };

  switch (action.type) {
    case 'SET_HISTORY_ITENS':
      newState.historyItens = action.historyItens;
      break;
    case 'SET_LOADING':
      newState.loading = action.loading;
      break;
    default:
      break;
  }
  return newState;
};
