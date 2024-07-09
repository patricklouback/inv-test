/* eslint-disable no-restricted-syntax */
import { createContext, useCallback, useMemo, useReducer } from 'react';
import { toast } from 'react-toastify';
import { api } from 'services/api';
import { IEvaluationCriteria } from 'interfaces/evaluationCriteria';
import { EvaluationCriteriaAPI } from 'services/apis/evaluation-criteria';
import {
  EvaluationCriteriaDefaultValues,
  EvaluationCriteriaConfigurationReducer,
} from './reducers/EvaluationCriteriaConfigurationReducer';

interface EvaluationCriteriaPropsData {
  loading: boolean;
  evaluationCriteriasConfig: IEvaluationCriteria[];
  getEvaluationCriteriaConfig: () => Promise<IEvaluationCriteria[]>;
  updateEvaluationCriteriaConfig: (
    id: string,
    data: IEvaluationCriteria
  ) => Promise<{ updated: boolean }>;
  createEvaluationCriteriaConfig: (
    data: IEvaluationCriteria
  ) => Promise<{ created: boolean }>;
  deleteEvaluationCriteriaConfig: (id: string) => Promise<{ deleted: boolean }>;
}

export const EvaluationCriteriaConfigurationContext =
  createContext<EvaluationCriteriaPropsData>({} as EvaluationCriteriaPropsData);

export const EvaluationCriteriaConfigurationProvider: React.FC = ({
  children,
}): JSX.Element => {
  const [dataReducer, dispatch] = useReducer(
    EvaluationCriteriaConfigurationReducer,
    EvaluationCriteriaDefaultValues
  );

  const getEvaluationCriteriaConfig = useCallback(async () => {
    try {
      dispatch({
        type: 'SET_LOADING',
        loading: true,
      });
      const data = await EvaluationCriteriaAPI.getEvaluationCriteriaConfig();
      dispatch({
        type: 'SET_EVALUATION_CRITERIAS',
        evaluationCriteriasConfig: data,
      });
      dispatch({
        type: 'SET_LOADING',
        loading: false,
      });
      return data;
    } catch (error) {
      toast.error('Erro ao buscar critérios de avaliação');
      return [];
    }
  }, []);

  const updateEvaluationCriteriaConfig = useCallback(
    async (id: string, data: IEvaluationCriteria) => {
      try {
        dispatch({ type: 'SET_LOADING', loading: true });
        await EvaluationCriteriaAPI.updateEvaluationCriteriaConfig(id, data);
        await getEvaluationCriteriaConfig();
        dispatch({ type: 'SET_LOADING', loading: false });
        toast.success('Critério atualizado!');
        return { updated: true };
      } catch (err) {
        toast.error(
          err?.response?.data?.error || 'Erro ao atualizar critério!'
        );
        return { updated: false };
      }
    },
    []
  );

  const createEvaluationCriteriaConfig = useCallback(
    async (data: IEvaluationCriteria) => {
      try {
        dispatch({ type: 'SET_LOADING', loading: true });
        await EvaluationCriteriaAPI.createEvaluationCriteriaConfig(data);
        await getEvaluationCriteriaConfig();
        dispatch({ type: 'SET_LOADING', loading: false });
        toast.success('Critério criado!');
        return { created: true };
      } catch (err) {
        toast.error(err?.response?.data?.error || 'Erro ao criar critério!');
        return { created: false };
      }
    },
    []
  );

  const deleteEvaluationCriteriaConfig = useCallback(async (id: string) => {
    try {
      dispatch({ type: 'SET_LOADING', loading: true });
      await EvaluationCriteriaAPI.deleteEvaluationCriteriaConfig(id);
      await getEvaluationCriteriaConfig();
      dispatch({ type: 'SET_LOADING', loading: false });
      toast.success('Critério deletado!');
      return { deleted: true };
    } catch (err) {
      toast.error(err?.response?.data?.error || 'Erro ao deletar critério!');
      return { deleted: false };
    }
  }, []);

  const EvaluationCriteriaDataValue = useMemo(() => {
    return {
      ...dataReducer,
      updateEvaluationCriteriaConfig,
      getEvaluationCriteriaConfig,
      createEvaluationCriteriaConfig,
      deleteEvaluationCriteriaConfig,
    };
  }, [
    dataReducer,
    updateEvaluationCriteriaConfig,
    getEvaluationCriteriaConfig,
    createEvaluationCriteriaConfig,
    deleteEvaluationCriteriaConfig,
  ]);

  return (
    <EvaluationCriteriaConfigurationContext.Provider
      value={EvaluationCriteriaDataValue}
    >
      {children}
    </EvaluationCriteriaConfigurationContext.Provider>
  );
};
