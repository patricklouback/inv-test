/* eslint-disable no-restricted-syntax */
import { Paginate } from '@default-types';
import { EvaluationCriteriasData } from 'interfaces/evaluationCriteriasData ';
import {
  DirectApproval,
  Idea,
  IdeaField,
  IdeaKanbanStatus,
} from 'interfaces/idea';
import { User } from 'interfaces/user';
import { useRouter } from 'next/router';
import { createContext, useCallback, useMemo, useReducer } from 'react';
import { toast } from 'react-toastify';
import { api } from 'services/api';
import { IdeaDefaultValues, IdeaReducer } from './reducers/IdeaReducer';

interface CountProps {
  countIdeas: number;
  countImplementedIdeas: number;
}

interface IdeaLoadParams {
  limit?: number;
  offset?: number;
  page?: number;
  orderColumn?: 'id' | 'createdAt';
  orderOrientation?: 'asc' | 'desc';
  campaignIds?: string;
  type?: string;
  kanbanSteps?: string;
  hasUpdate?: string;
}

interface IdeaPropsData {
  idea: Idea;
  selectedIdea: Idea;
  ideas: Idea[];
  ideasForLink: Idea[];
  ideaFields: IdeaField[];
  selectedIdeaFields: IdeaField[];
  loading: boolean;
  paginate: Paginate;
  last6ideas: Idea[];
  campaign_filter: Array<{
    id: string;
    title?: string;
  }>;
  campaignIdForNewIdea: string;
  ideasPerStatus: {
    onGoing: string;
    techReview: string;
    refused: string;
  };
  ideasPerRoute: Array<{
    routeName: string;
    ideasAmount: string;
    color: string;
  }>;
  getLast6Ideas: () => Promise<void>;
  createIdea: (form: any) => Promise<Idea>;
  setSelectedIdea: (idea: Idea) => void;
  updateIdea: (ideaId: string, data: Partial<Idea>) => Promise<void>;
  updateIdeaCampaign: (ideaId: string, data: string) => Promise<void>;
  updateIdeaComplete: (ideaId: string, formData: any) => Promise<Idea>;
  countIdeas: (params?: any) => Promise<CountProps>;
  getIdeaFieldsForIdeaForm: (campaignId: string) => Promise<void>;
  getIdeasByCampaignId: (campaignId: string) => Promise<void>;
  getIdeas: (params?: any) => Promise<Idea[]>;
  getIdeasForLink: (params?: any) => Promise<Idea[]>;
  getIdeasForUserArea: (params?: any) => Promise<void>;
  getIdeasForIdeasRepository: (params?: any) => Promise<void>;
  getIdea: (ideadId: string) => Promise<Idea>;
  viewIdea: (id: string) => Promise<void>;
  handleCleanIdea: () => void;
  likeIdea: (idea: Idea) => Promise<void>;
  getAvailableIdeaUsers: (
    search: string,
    actualUser: string
  ) => Promise<Pick<User, 'id' | 'name'>[]>;
  getIdeasUser: (params?: IdeaLoadParams) => Promise<Idea[]>;
  getFilterCampaign: () => Promise<void>;
  setIdeaCampaignId: (campaignId: string) => void;
  updateIdeaKanbanStatus: (
    ideaId: string,
    kanbanStatus: IdeaKanbanStatus,
    toastMessage?: boolean
  ) => Promise<void>;
  getSelectedIdeaFieldsValues: (id: string) => Promise<void>;
  changeIdeasHasUpdateField: (ideaId: string) => Promise<void>;
  getIdeasPerStatus: (params?: any) => Promise<void>;
  getIdeasPerRoute: (params?: any) => Promise<void>;
  countIdeasPerKanbanStep: (params?: any) => Promise<any>;
  countTotalLikes: (params?: any) => Promise<any>;
  countComments: (params?: any) => Promise<any>;
  countTodaySentIdeas: (params?: any) => Promise<any>;
  updateIdeaEvaluationCriteria(
    evaluationCriterias: EvaluationCriteriasData[],
    ideaId: string
  ): Promise<void>;
  createDirectApproval: (directApproval: DirectApproval) => Promise<boolean>;
}

const mapStepName = {
  SCREENING: { name: 'Triagem', order: 1 },
  ANALYZE: { name: 'Em análise', order: 2 },
  IMPLEMENTED: { name: 'Em implementação', order: 4 },
};

export const IdeaContext = createContext<IdeaPropsData>({} as IdeaPropsData);

export const IdeaProvider: React.FC = ({ children }): JSX.Element => {
  const [dataReducer, dispatch] = useReducer(IdeaReducer, IdeaDefaultValues);

  const { push } = useRouter();

  const setIdeaCampaignId = useCallback((campaignId: string) => {
    dispatch({
      type: 'SET_CAMPAIGN_ID_TO_IDEA',
      campaignIdForNewIdea: campaignId,
    });
  }, []);

  const createIdea = useCallback(
    async data => {
      try {
        dispatch({ type: 'SET_LOADING', loading: true });
        const {
          data: { idea },
        } = await api.post('/ideas/idea', data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        dispatch({ type: 'SET_LOADING', loading: false });

        const ideaStatus = data.get('status');

        if (ideaStatus === 'DRAFT')
          toast.success('Iniciativa salva com sucesso!');

        if (ideaStatus === 'PUBLISHED') {
          toast.success('Sucesso ao criar nova iniciativa!', {
            autoClose: false,
          });
        }

        return idea;
      } catch (error) {
        toast.error(
          'Há campos obrigatórios não preenchidos. Favor preencher! 3'
        );
      }
    },
    [dispatch]
  );

  const setSelectedIdea = useCallback(async (idea: Idea) => {
    try {
      dispatch({ type: 'SET_SELECTED_IDEA', idea });
    } catch (error) {
      toast.error('Erro selecionar iniciativa');
    }
  }, []);

  const viewIdea = useCallback(async (id: string) => {
    try {
      const { data: responseData } = await api.get(`/ideas/idea/${id}`);
      dispatch({ type: 'SET_IDEA', idea: responseData.idea });
    } catch (error) {
      toast.error('Erro ao buscar a iniciativa');
    }
  }, []);

  const changeIdeasHasUpdateField = useCallback(async (id: string) => {
    try {
      await api.put(`/ideas/change-has-update/${id}`);
    } catch (error) {
      toast.error('Erro ao marcar iniciativa como vista');
    }
  }, []);

  const getIdea = useCallback(async (id: string) => {
    try {
      const { data: responseData } = await api.get(`/ideas/${id}`);
      return responseData.idea;
    } catch (error) {
      toast.error('Erro ao buscar a iniciativa');
    }
  }, []);

  // only update idea type
  const updateIdea = useCallback(
    async (ideaId: string, data: Partial<Idea>) => {
      try {
        dispatch({ type: 'SET_LOADING', loading: true });
        await api.put(`/ideas/change-type/${ideaId}`, data);
        await viewIdea(ideaId);
        dispatch({ type: 'SET_LOADING', loading: false });
        toast.success('Sucesso ao atualizar a iniciativa');
      } catch (err) {
        toast.error(
          err?.response?.data?.message ||
            'Erro ao atualizar sua iniciativa, por favor revise seus campos!'
        );
      }
    },
    [dispatch, viewIdea]
  );

  // only update idea campaignId
  const updateIdeaCampaign = useCallback(
    async (ideaId: string, data: string) => {
      try {
        dispatch({ type: 'SET_LOADING', loading: true });
        await api.put(`/ideas/change-campaign/${ideaId}`, data);
        await viewIdea(ideaId);
        dispatch({ type: 'SET_LOADING', loading: false });
        toast.success('Sucesso ao atualizar a direcional da iniciativa');
      } catch (err) {
        toast.error(
          err?.response?.data?.message ||
            'Erro ao atualizar sua iniciativa, por favor revise seus campos!'
        );
      }
    },
    [dispatch, viewIdea]
  );

  const updateIdeaComplete = useCallback(
    async (ideaId: string, formData: any) => {
      try {
        dispatch({ type: 'SET_LOADING', loading: true });
        const { data } = await api.patch(`/ideas/idea/${ideaId}`, formData);
        dispatch({ type: 'SET_LOADING', loading: false });

        const ideaStatus = formData.get('status');

        if (ideaStatus === 'DRAFT')
          toast.success('Sucesso ao atualizar a iniciativa');

        if (ideaStatus === 'PUBLISHED') {
          toast.success('iniciativa publicada com sucesso!');
        }

        return data.idea;
      } catch (error) {
        toast.error('Erro ao atualizar a iniciativa');
      }
    },
    []
  );

  const updateIdeaStatus = useCallback(
    async data => {
      try {
        dispatch({ type: 'SET_LOADING', loading: true });
        await api.put(`/ideas/${data.id}`, data);
        dispatch({ type: 'SET_LOADING', loading: false });

        if (data.get('status') === 'PUBLISHED') {
          toast.success('Sucesso ao publicar a iniciativa!');
          await push('/home');
        }

        if (data.get('status') === 'DRAFT')
          toast.success('iniciativa atualizada com sucesso!');
      } catch (error) {
        toast.error(
          'Erro ao criar sua iniciativa, por favor revise seus campos!'
        );
      }
    },
    [dispatch, push]
  );

  const updateIdeaKanbanStatus = useCallback(
    async (
      ideaId: string,
      kanbanStatus: IdeaKanbanStatus
      /* toastMessage = true */
    ) => {
      try {
        dispatch({ type: 'SET_LOADING', loading: true });
        await api.put(`ideas/change-kanban-status/${ideaId}`, {
          kanbanStatus,
          notification: { description: 'Alteração de Status da iniciativa' },
        });
        dispatch({ type: 'SET_LOADING', loading: false });
        // if (toastMessage) {
        toast.success('Sucesso ao atualizar o status da iniciativa');
        // }
      } catch (err) {
        toast.error(
          err?.response?.data?.message ||
            'Erro ao atualizar sua iniciativa, por favor revise seus campos!'
        );
      }
    },
    []
  );

  const countIdeas = useCallback(async (params?: any) => {
    try {
      const { data: responseData } = await api.get(`/ideas/count`, {
        params,
      });
      return responseData;
    } catch (error) {
      toast.error('Erro ao buscar contador de iniciativas');
      return 0;
    }
  }, []);

  const handleCleanIdea = useCallback(() => {
    dispatch({ type: 'SET_IDEA', idea: null });
  }, []);

  const getIdeasUser = useCallback(async params => {
    try {
      const { data: responseData } = await api.get('/ideas/me', {
        params: {
          ...params,
        },
      });
      dispatch({ type: 'SET_PAGINATE', paginate: responseData.paginate });
      return responseData.ideas;
    } catch (error) {
      toast.error('Erro ao buscar iniciativas');
      return [];
    }
  }, []);

  const getLast6Ideas = useCallback(async () => {
    try {
      const {
        data: { ideas },
      } = await api.get('/ideas/me', {
        params: {
          limit: 6,
        },
      });
      dispatch({ type: 'SET_LAST_6_IDEAS', last6ideas: ideas });
    } catch (error) {
      toast.error('Erro ao buscar iniciativas');
    }
  }, []);

  const getAvailableIdeaUsers = useCallback(
    async (
      search: string,
      actualUser: string
    ): Promise<Pick<User, 'id' | 'name'>[]> => {
      try {
        const { data: responseData } = await api.get('/ideas/idea-users', {
          params: {
            search,
            actualUser,
          },
        });
        return responseData.ideaUsers;
      } catch (error) {
        toast.error('Erro ao buscar ideias dos usuários');
        return [];
      }
    },
    []
  );

  const getIdeaFieldsForIdeaForm = useCallback(async (campaignId: string) => {
    try {
      dispatch({ type: 'SET_LOADING', loading: true });
      const { data } = await api.get(
        `/ideas/idea-fields/idea-form/${campaignId}`
      );
      dispatch({ type: 'SET_LOADING', loading: false });
      dispatch({ type: 'SET_IDEA_FIELDS', ideaFields: data.ideaFields });
    } catch (error) {
      toast.info('Error ao buscar campos de iniciativa');
    }
  }, []);

  const getIdeasByCampaignId = useCallback(
    async (campaignId: string) => {
      try {
        dispatch({ type: 'SET_LOADING', loading: true });
        const { data: responseData } = await api.get(
          `/ideas/by-campaign/${campaignId}`
        );
        dispatch({ type: 'SET_LOADING', loading: false });
        dispatch({
          type: 'SET_IDEAS',
          ideas: responseData.ideas,
        });
      } catch (error) {
        toast.error('Error');
      }
    },
    [dispatch]
  );

  const getFilterCampaign = useCallback(async () => {
    try {
      dispatch({ type: 'SET_LOADING', loading: true });
      const { data } = await api.get(`campaigns/basic-filter`);
      dispatch({
        type: 'SET_FILTER_CAMPAIGN',
        campaign_filter: data.campaigns,
      });
      dispatch({ type: 'SET_LOADING', loading: false });
    } catch (error) {
      toast.error('Error');
    }
  }, [dispatch]);

  const getIdeas = useCallback(
    async (params?: any) => {
      try {
        dispatch({ type: 'SET_LOADING', loading: true });
        const { data: responseData } = await api.get(`/ideas/list`, {
          params,
        });
        dispatch({ type: 'SET_LOADING', loading: false });
        dispatch({
          type: 'SET_IDEAS',
          ideas: responseData.ideas,
        });
        return responseData.ideas;
      } catch (error) {
        toast.error('Error');
      }
    },
    [dispatch]
  );

  const getIdeasForLink = useCallback(
    async (params?: any) => {
      try {
        dispatch({ type: 'SET_LOADING', loading: true });
        const { data: responseData } = await api.get(`/ideas/ideas-for-link`, {
          params,
        });
        dispatch({ type: 'SET_LOADING', loading: false });
        dispatch({
          type: 'SET_IDEAS_FOR_LINK',
          ideasForLink: responseData.ideas,
        });
        return responseData.ideas;
      } catch (error) {
        toast.error('Error');
      }
    },
    [dispatch]
  );

  const getIdeasForUserArea = useCallback(
    async (params?: any) => {
      try {
        dispatch({ type: 'SET_LOADING', loading: true });
        const { data: responseData } = await api.get(
          `/ideas/list-from-area-user`,
          {
            params,
          }
        );
        dispatch({ type: 'SET_LOADING', loading: false });
        dispatch({
          type: 'SET_IDEAS',
          ideas: responseData.ideas,
        });
      } catch (error) {
        toast.error('Erro ao buscar as iniciativas');
      }
    },
    [dispatch]
  );

  const getIdeasForIdeasRepository = useCallback(
    async (params?: any) => {
      try {
        dispatch({ type: 'SET_LOADING', loading: true });
        const { data: responseData } = await api.get(
          `/ideas/ideas-repository`,
          {
            params,
          }
        );
        dispatch({ type: 'SET_PAGINATE', paginate: responseData.paginate });
        dispatch({ type: 'SET_LOADING', loading: false });
        dispatch({
          type: 'SET_IDEAS',
          ideas: responseData.ideas,
        });
      } catch (error) {
        toast.error('Error');
      }
    },
    [dispatch]
  );

  const getSelectedIdeaFieldsValues = useCallback(async (id: string) => {
    try {
      dispatch({ type: 'SET_LOADING', loading: true });

      const {
        data: {
          idea: { ideaFields },
        },
      } = await api.get(`/ideas/idea/${id}`);
      dispatch({
        type: 'SET_SELECTED_IDEA_FIELDS',
        selectedIdeaFields: ideaFields,
      });

      dispatch({ type: 'SET_LOADING', loading: false });
    } catch (error) {
      toast.error('Error');
    }
  }, []);

  const likeIdea = useCallback(
    async (idea: Idea) => {
      try {
        const result = await api.post(`/ideas/idea-likes/${idea.id}`);
        const { ideas } = dataReducer;

        const newIdeas = [...ideas];

        const ideaLikedIndex = newIdeas.findIndex(i => i.id === idea.id);

        if (result.data?.id) {
          newIdeas[ideaLikedIndex].ideaLikes = [result.data];
        } else {
          newIdeas[ideaLikedIndex].ideaLikes = [];
        }
        getIdeasForUserArea({
          orderColumn: 'createdAt',
          orderOrientation: 'desc',
          status: 'PUBLISHED',
        });
        dispatch({ type: 'SET_IDEAS', ideas: newIdeas });
      } catch (error) {
        toast.error(
          error?.response?.data?.message ||
            'Erro ao buscar contador de iniciativas'
        );
      }
    },
    [dataReducer, getIdeas]
  );

  const countTotalLikes = useCallback(async (params?: any) => {
    try {
      dispatch({ type: 'SET_LOADING', loading: true });
      const { data } = await api.get(`/ideas/total-likes`, {
        params,
      });
      dispatch({ type: 'SET_LOADING', loading: false });
      return data;
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          'Erro ao buscar quantidades total de Likes'
      );
    }
  }, []);

  const countComments = useCallback(async (params?: any) => {
    try {
      dispatch({ type: 'SET_LOADING', loading: true });
      const { data } = await api.get(`/ideas/total-comments`, {
        params,
      });
      dispatch({ type: 'SET_LOADING', loading: false });
      return data;
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          'Erro ao buscar quantidades total de comentários'
      );
    }
  }, []);

  const countTodaySentIdeas = useCallback(async (params?: any) => {
    try {
      dispatch({ type: 'SET_LOADING', loading: true });
      const { data } = await api.get(`/ideas/today-sent-ideas`, {
        params,
      });
      dispatch({ type: 'SET_LOADING', loading: false });
      return data;
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          'Erro ao buscar quantidades total de iniciativas enviadas hoje'
      );
    }
  }, []);

  const getIdeasPerStatus = useCallback(
    async (params?: any) => {
      try {
        dispatch({ type: 'SET_LOADING', loading: true });

        const { data } = await api.get(`/ideas/count-per-status`, {
          params,
        });
        dispatch({
          type: 'SET_IDEAS_PER_STATUS',
          ideasPerStatus: data,
        });

        dispatch({ type: 'SET_LOADING', loading: false });
      } catch (error) {
        toast.error(
          error?.response?.data?.message ||
            'Erro ao buscar quantidades de iniciativas por cada status'
        );
      }
    },
    [dispatch]
  );

  const getIdeasPerRoute = useCallback(
    async (params?: any) => {
      try {
        dispatch({ type: 'SET_LOADING', loading: true });

        const { data } = await api.get(`/ideas/count-per-route`, {
          params,
        });
        dispatch({
          type: 'SET_IDEAS_PER_ROUTE',
          ideasPerRoute: data,
        });

        dispatch({ type: 'SET_LOADING', loading: false });
      } catch (error) {
        toast.error(
          error?.response?.data?.message ||
            'Erro ao buscar quantidades de iniciativas por cada rota'
        );
      }
    },
    [dispatch]
  );

  const countIdeasPerKanbanStep = useCallback(async (params?: any) => {
    try {
      dispatch({ type: 'SET_LOADING', loading: true });
      const { data } = await api.get(`/ideas/count-kanban-step`, {
        params,
      });
      dispatch({ type: 'SET_LOADING', loading: false });
      return data;
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          'Erro ao buscar quantidades de iniciativas por etapa do funil'
      );
    }
  }, []);

  const updateIdeaEvaluationCriteria = useCallback(
    async (evaluationCriterias: EvaluationCriteriasData[], ideaId) => {
      try {
        await Promise.all(
          evaluationCriterias.map(async evaluationCriteria => {
            await api.put(
              `/evaluationcriterias/idea/${evaluationCriteria.id}`,
              { rate: evaluationCriteria.criteriaRate }
            );
          })
        );

        await api.post(`/history/item`, {
          title: `${evaluationCriterias[0].userEvaluator.name} concluiu a sua avaliação dos critérios`,
          description: `Avaliação dos critérios da etapa ${
            mapStepName[
              evaluationCriterias[0].evaluationCriteriasCampaignMetadata
                .criteriaStep
            ].name
          }`,
          ideaId,
        });

        viewIdea(ideaId);
        toast.success('Avaliação realizada com sucesso');
      } catch (error) {
        toast.error('Erro ao avaliar iniciativa');
      }
    },
    []
  );

  const createDirectApproval = useCallback(
    async (directApproval: DirectApproval) => {
      try {
        await api.post('/ideas/direct-approval', directApproval);
        toast.success('Aprovação direta criada com sucesso');
        return true;
      } catch (error) {
        toast.error('Erro ao criar aprovação direta');
        return false;
      }
    },
    []
  );

  const IdeaDataValue = useMemo(() => {
    return {
      ...dataReducer,
      createIdea,
      getAvailableIdeaUsers,
      viewIdea,
      handleCleanIdea,
      getIdeasByCampaignId,
      getIdeas,
      getIdeasForLink,
      getIdeasForUserArea,
      likeIdea,
      countIdeas,
      getIdeasUser,
      updateIdea,
      updateIdeaCampaign,
      updateIdeaComplete,
      getLast6Ideas,
      getFilterCampaign,
      setIdeaCampaignId,
      updateIdeaKanbanStatus,
      setSelectedIdea,
      getSelectedIdeaFieldsValues,
      getIdea,
      changeIdeasHasUpdateField,
      getIdeasForIdeasRepository,
      getIdeasPerStatus,
      getIdeasPerRoute,
      countTotalLikes,
      countComments,
      countTodaySentIdeas,
      countIdeasPerKanbanStep,
      getIdeaFieldsForIdeaForm,
      updateIdeaEvaluationCriteria,
      createDirectApproval,
    };
  }, [
    dataReducer,
    setIdeaCampaignId,
    createIdea,
    countIdeas,
    getIdeas,
    getIdeasForLink,
    getIdeasForUserArea,
    likeIdea,
    getAvailableIdeaUsers,
    viewIdea,
    handleCleanIdea,
    getIdeasByCampaignId,
    getIdeasUser,
    updateIdea,
    updateIdeaCampaign,
    updateIdeaComplete,
    getLast6Ideas,
    getFilterCampaign,
    updateIdeaKanbanStatus,
    setSelectedIdea,
    getSelectedIdeaFieldsValues,
    getIdea,
    changeIdeasHasUpdateField,
    getIdeasForIdeasRepository,
    getIdeasPerStatus,
    getIdeasPerRoute,
    countTotalLikes,
    countComments,
    countTodaySentIdeas,
    countIdeasPerKanbanStep,
    getIdeaFieldsForIdeaForm,
    updateIdeaEvaluationCriteria,
    createDirectApproval,
  ]);

  return (
    <IdeaContext.Provider value={IdeaDataValue}>
      {children}
    </IdeaContext.Provider>
  );
};
