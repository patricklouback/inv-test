/* eslint-disable no-restricted-syntax */
import { createContext, useCallback, useMemo, useReducer } from 'react';
import { toast } from 'react-toastify';
import { api } from 'services/api';
import { IEvaluationCriteria } from 'interfaces/evaluationCriteria';
import {
  EvaluationCriteriaDefaultValues,
  EvaluationCriteriaCampaignReducer,
} from './reducers/EvaluationCriteriaCampaignReducer';

interface EvaluationCriteriaPropsData {
  loading: boolean;
  evaluationCriteriasCampaign: IEvaluationCriteria[];
  getEvaluationCriteriaCampaign: (
    campaignId: string
  ) => Promise<IEvaluationCriteria[]>;
  updateEvaluationCriteriaCampaign: (
    id: string,
    data: IEvaluationCriteria
  ) => Promise<{ updated: boolean }>;
  createEvaluationCriteriaCampaign: (
    data: IEvaluationCriteria
  ) => Promise<{ created: boolean }>;
  deleteEvaluationCriteriaCampaign: (
    id: string,
    campaignId: string
  ) => Promise<{ deleted: boolean }>;
  importEvaluationCriteriaTemplate: (campaignId: string) => Promise<void>;
}

export const EvaluationCriteriaCampaignContext =
  createContext<EvaluationCriteriaPropsData>({} as EvaluationCriteriaPropsData);

export const EvaluationCriteriaCampaignProvider: React.FC = ({
  children,
}): JSX.Element => {
  const [dataReducer, dispatch] = useReducer(
    EvaluationCriteriaCampaignReducer,
    EvaluationCriteriaDefaultValues
  );

  const getEvaluationCriteriaCampaign = useCallback(
    async (campaignId: string) => {
      try {
        dispatch({
          type: 'SET_LOADING',
          loading: true,
        });
        const { data } = await api.get(
          `/evaluationcriterias/campaign/all/${campaignId}`
        );
        dispatch({
          type: 'SET_EVALUATION_CRITERIAS',
          evaluationCriteriasCampaign: data,
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
    },
    []
  );

  const updateEvaluationCriteriaCampaign = useCallback(
    async (id: string, data: IEvaluationCriteria) => {
      try {
        dispatch({ type: 'SET_LOADING', loading: true });
        await api.put(`/evaluationcriterias/campaign/${id}`, data);
        await getEvaluationCriteriaCampaign(data.campaignId);
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

  const createEvaluationCriteriaCampaign = useCallback(
    async (data: IEvaluationCriteria) => {
      try {
        dispatch({ type: 'SET_LOADING', loading: true });
        await api.post(`/evaluationcriterias/campaign`, data);
        await getEvaluationCriteriaCampaign(data.campaignId);
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

  const deleteEvaluationCriteriaCampaign = useCallback(
    async (id: string, campaignId: string) => {
      try {
        dispatch({ type: 'SET_LOADING', loading: true });
        await api.delete(`/evaluationcriterias/campaign/${id}`);
        await getEvaluationCriteriaCampaign(campaignId);
        dispatch({ type: 'SET_LOADING', loading: false });
        toast.success('Critério deletado!');
        return { deleted: true };
      } catch (err) {
        toast.error(err?.response?.data?.error || 'Erro ao deletar critério!');
        return { deleted: false };
      }
    },
    []
  );

  const importEvaluationCriteriaTemplate = useCallback(
    async (campaignId: string) => {
      try {
        dispatch({ type: 'SET_LOADING', loading: true });
        await api.post(`/evaluationcriterias/import-template/${campaignId}`);
        await getEvaluationCriteriaCampaign(campaignId);
        dispatch({ type: 'SET_LOADING', loading: false });
        toast.success('Critérios importados!');
      } catch (err) {
        toast.error(
          err?.response?.data?.error || 'Erro ao importar critérios!'
        );
      }
    },
    []
  );

  const EvaluationCriteriaDataValue = useMemo(() => {
    return {
      ...dataReducer,
      updateEvaluationCriteriaCampaign,
      getEvaluationCriteriaCampaign,
      createEvaluationCriteriaCampaign,
      deleteEvaluationCriteriaCampaign,
      importEvaluationCriteriaTemplate
    };
  }, [
    dataReducer,
    updateEvaluationCriteriaCampaign,
    getEvaluationCriteriaCampaign,
    createEvaluationCriteriaCampaign,
    deleteEvaluationCriteriaCampaign,
    importEvaluationCriteriaTemplate
  ]);

  return (
    <EvaluationCriteriaCampaignContext.Provider
      value={EvaluationCriteriaDataValue}
    >
      {children}
    </EvaluationCriteriaCampaignContext.Provider>
  );
};
