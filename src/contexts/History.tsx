/* eslint-disable no-restricted-syntax */
import { HistoryItem } from 'interfaces/history';
import { createContext, useCallback, useMemo, useReducer } from 'react';
import { toast } from 'react-toastify';
import { api } from 'services/api';
import {
  HistoryDefaultValues,
  HistoryReducer,
} from './reducers/HistoryReducer';

interface HistoryItensPropsData {
  historyItens: HistoryItem[];
  getHistoryItens: (ideaId: string) => Promise<HistoryItem[]>;
}

export const HistoryItensContext = createContext<HistoryItensPropsData>(
  {} as HistoryItensPropsData
);

export const HistoryItensProvider: React.FC = ({ children }): JSX.Element => {
  const [dataReducer, dispatch] = useReducer(
    HistoryReducer,
    HistoryDefaultValues
  );

  const getHistoryItens = useCallback(async (ideaId: string) => {
    try {
      const { data } = await api.get(`/history/${ideaId}`);
      
      dispatch({
        type: 'SET_HISTORY_ITENS',
        historyItens: data.historyList,
      });
    } catch (error) {
      toast.error('Error', error);
    }
  }, []);

  const HistoryItensDataValue = useMemo(() => {
    return {
      ...dataReducer,
      getHistoryItens,
    };
  }, [dataReducer, getHistoryItens]);

  return (
    <HistoryItensContext.Provider value={HistoryItensDataValue}>
      {children}
    </HistoryItensContext.Provider>
  );
};
