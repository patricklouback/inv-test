/* eslint-disable no-restricted-syntax */
import { FeatureActive } from 'interfaces/featureActive';
import { createContext, useCallback, useMemo, useReducer } from 'react';
import { toast } from 'react-toastify';
import { api } from 'services/api';
import {
  FeatureActiveDefaultValues,
  FeatureActiveReducer,
} from './reducers/FeatureActiveReducer';

interface FeatureActivePropsData {
  featureActives: FeatureActive[];
  loading: boolean;
  editFeatureActive: (id: string, value: boolean) => Promise<void>;
  getFeatureByKey: (key: string) => FeatureActive;
  getFeatureActives: () => Promise<FeatureActive[]>;
}

export const FeatureActiveContext = createContext<FeatureActivePropsData>(
  {} as FeatureActivePropsData
);

export const FeatureActiveProvider: React.FC = ({ children }): JSX.Element => {
  const [dataReducer, dispatch] = useReducer(
    FeatureActiveReducer,
    FeatureActiveDefaultValues
  );

  const getFeatureByKey = useCallback(
    (key: string): FeatureActive | undefined => {
      return dataReducer.featureActives.find(f => f.key === key);
    },
    [dataReducer.featureActives]
  );

  const getFeatureActives = useCallback(async () => {
    try {
      dispatch({
        type: 'SET_LOADING',
        loading: true,
      });
      const { data } = await api.get('/feature-active');
      dispatch({
        type: 'SET_FEATURE_ACTIVES',
        featureActives: data,
      });
      dispatch({
        type: 'SET_LOADING',
        loading: false,
      });
      return data;
    } catch (error) {
      toast.error('Erro ao buscar valor da feature');
      return [];
    }
  }, []);

  const editFeatureActive = useCallback(
    async (id: string, value: boolean) => {
      try {
        dispatch({ type: 'SET_LOADING', loading: true });
        const { data } = await api.put(`/feature-active`, { id, value });
        await getFeatureActives();
        dispatch({ type: 'SET_LOADING', loading: false });
        toast.success(value ? 'Feature ativada!' : 'Feature desativada!');
      } catch (err) {
        toast.error(
          err?.response?.data?.message || 'Erro ao ativar/desativar feature!'
        );
      }
    },
    [dispatch]
  );

  const FeatureActiveDataValue = useMemo(() => {
    return {
      ...dataReducer,
      editFeatureActive,
      getFeatureByKey,
      getFeatureActives,
    };
  }, [dataReducer, editFeatureActive, getFeatureByKey, getFeatureActives]);

  return (
    <FeatureActiveContext.Provider value={FeatureActiveDataValue}>
      {children}
    </FeatureActiveContext.Provider>
  );
};
