/* eslint-disable no-restricted-syntax */
import { ProcessActivity } from 'interfaces/processActivity';
import { createContext, useCallback, useMemo, useReducer } from 'react';
import { toast } from 'react-toastify';
import { api } from 'services/api';
import {
  ProcessActivityDefaultValues,
  ProcessActivityReducer,
} from './reducers/ProcessActivityReducer';

interface ProcessActivityPropsData {
  processActivities: ProcessActivity[];
  processActivitiesCampaign: ProcessActivity[];
  loading: boolean;
  // listProcessActivities: () => Promise<ProcessActivity[]>;
  createProcessActivity: (name: string, campaignId?: string) => Promise<void>;
  editProcessActivity: (
    processActivityID: string,
    name: string,
    campaignId?: string
  ) => Promise<void>;
  importProcessActivityTemplate: (campaignId: string) => Promise<void>;
  importCampaignProcessActivityOnIdea: (ideaId: string) => Promise<void>;
  deleteProcessActivity: (
    processActivityID: string,
    campaignId?: string
  ) => Promise<void>;
  getProcessActivities: (campaignId?: string) => Promise<ProcessActivity[]>;
  getAllProcessActivitiesName: () => Promise<ProcessActivity[]>;
  getTotalIdeasByProcess: (processActivityId?: string) => Promise<
    {
      title: string;
      ideasCount: string;
    }[]
  >;
}

export const ProcessActivityContext = createContext<ProcessActivityPropsData>(
  {} as ProcessActivityPropsData
);

export const ProcessActivityProvider: React.FC = ({
  children,
}): JSX.Element => {
  const [dataReducer, dispatch] = useReducer(
    ProcessActivityReducer,
    ProcessActivityDefaultValues
  );

  const getProcessActivities = useCallback(async (campaignId?: string) => {
    try {
      const { data } = await (campaignId === undefined || campaignId === null
        ? api.get('/processActivity/list')
        : api.get(`/processActivity/${campaignId}`));
      if (campaignId === undefined || campaignId === null) {
        dispatch({
          type: 'SET_PROCESS_ACTIVITIES',
          processActivities: data.processActivityList,
        });
      } else {
        dispatch({
          type: 'SET_PROCESS_ACTIVITIES_CAMPAIGN',
          processActivitiesCampaign: data.processActivityList,
        });
      }
      return data.processActivityList;
    } catch (error) {
      toast.error('Erro ao buscar as atividades do processo');
      return [];
    }
  }, []);

  const getTotalIdeasByProcess = useCallback(
    async (processActivityId?: string) => {
      try {
        const { data } = await api.get(
          `/processActivity/total-ideas/${processActivityId}`
        );
        return data;
      } catch (error) {
        toast.error('Erro ao buscar o total de ideias por rota');
        return [];
      }
    },
    []
  );

  const getAllProcessActivitiesName = useCallback(async () => {
    try {
      const { data } = await api.get(`/processActivity/names`);
      return data.allNames;
    } catch (error) {
      toast.error('Erro ao buscar as atividades do processo');
      return [];
    }
  }, []);

  const createProcessActivity = useCallback(
    async (name: string, campaignId: string) => {
      try {
        dispatch({ type: 'SET_LOADING', loading: true });
        const { data } = await api.post(`/processActivity/process`, {
          name,
          campaignId: campaignId || null,
        });
        await getProcessActivities(campaignId);
        dispatch({ type: 'SET_LOADING', loading: false });
        toast.success('Nova rota criada');
      } catch (err) {
        toast.error(err?.response?.data?.message || 'Erro ao criar nova rota!');
      }
    },
    [dispatch]
  );

  const editProcessActivity = useCallback(
    async (name: string, id: string, campaignId) => {
      try {
        dispatch({ type: 'SET_LOADING', loading: true });
        const { data } = await api.put(`/processActivity/process`, {
          name,
          id,
        });
        await getProcessActivities(campaignId);
        dispatch({ type: 'SET_LOADING', loading: false });
        toast.success('Nome da rota atualizado');
      } catch (err) {
        toast.error(err?.response?.data?.message || 'Erro ao criar nova rota!');
      }
    },
    [dispatch]
  );

  const importProcessActivityTemplate = useCallback(
    async (campaignId: string) => {
      try {
        dispatch({ type: 'SET_LOADING', loading: true });
        const { data } = await api.get(
          `/processActivity/import-template/${campaignId}`
        );
        await getProcessActivities(campaignId);
        dispatch({ type: 'SET_LOADING', loading: false });
        toast.success('Template de rotas importado');
      } catch (err) {
        toast.error(
          err?.response?.data?.message || 'Erro ao importar template de rotas!'
        );
      }
    },
    [dispatch]
  );

  const importCampaignProcessActivityOnIdea = useCallback(
    async (ideaId: string) => {
      try {
        dispatch({ type: 'SET_LOADING', loading: true });
        const { data } = await api.put(
          `/processActivity/import-for-idea/${ideaId}`
        );
        dispatch({ type: 'SET_LOADING', loading: false });
        toast.success('Rotas do direcional incorporados');
      } catch (err) {
        toast.error(
          err?.response?.data?.message ||
            'Erro ao incorporar rotas do direcional!'
        );
      }
    },
    [dispatch]
  );

  const deleteProcessActivity = useCallback(
    async (id: string, campaignId: string) => {
      try {
        dispatch({ type: 'SET_LOADING', loading: true });
        const { data } = await api.delete(`/processActivity/${id}`);
        await getProcessActivities(campaignId);
        dispatch({ type: 'SET_LOADING', loading: false });
        toast.success('Rota excluída');
      } catch (err) {
        toast.error(
          err?.response?.data?.message || 'Erro ao deletar nova rota!'
        );
      }
    },
    [dispatch]
  );

  const ProcessActivityDataValue = useMemo(() => {
    return {
      ...dataReducer,
      createProcessActivity,
      editProcessActivity,
      deleteProcessActivity,
      getProcessActivities,
      getAllProcessActivitiesName,
      getTotalIdeasByProcess,
      importProcessActivityTemplate,
      importCampaignProcessActivityOnIdea,
    };
  }, [
    dataReducer,
    createProcessActivity,
    editProcessActivity,
    deleteProcessActivity,
    getProcessActivities,
    getAllProcessActivitiesName,
    getTotalIdeasByProcess,
    importProcessActivityTemplate,
    importCampaignProcessActivityOnIdea,
  ]);

  return (
    <ProcessActivityContext.Provider value={ProcessActivityDataValue}>
      {children}
    </ProcessActivityContext.Provider>
  );
};
