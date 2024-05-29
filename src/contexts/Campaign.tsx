/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-syntax */
import { Campaign, CampaignCreateForm, Paginate } from 'interfaces';
import { Area, AreaCampaignSigned } from 'interfaces/areas';
import {
  CampaignField,
  CampaignStep,
  CampaignStepItem,
  CampaignUser,
  CampaignUserType,
  CampaingActiveHistory,
  CampaingStatusCount,
  IdeasHistory,
  InnovationCategory,
  ProcessActivity,
  ProjectsFunnel,
  QuickwinsFunnel,
  TopCampaigns,
} from 'interfaces/campaign';
import { User } from 'interfaces/user';
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from 'react';
import { toast } from 'react-toastify';
import { api } from 'services/api';
import {
  CampaignDefaultValues,
  CampaignReducer,
} from './reducers/CampaignReducer';

import { ProcessActivityContext } from './ProcessActivity';

type CampaignUserOptions = Pick<User, 'id' | 'name'>;

interface CampaignLoadParams {
  limit?: number;
  offset?: number;
  page?: number;
  orderColumn?: 'id' | 'createdAt';
  orderOrientation?: 'asc' | 'desc';
}

interface GraphsParams {
  initialDate?: string;
  finalDate?: string;
  campaignIds?: string;
}

interface CampaignPropsData {
  loadCampaigns?: (params?: CampaignLoadParams) => Promise<void>;
  loadAllCampaigns?: (params?: CampaignLoadParams) => Promise<void>;
  loadCampaignsUserArea?: (params?: CampaignLoadParams) => Promise<void>;
  getInnovationCategories?: (
    params?: GraphsParams
  ) => Promise<InnovationCategory[]>;
  getQuickwinsFunnel?: () => Promise<QuickwinsFunnel>;
  getProjectsFunnel?: () => Promise<ProjectsFunnel>;
  getHistoricIdeas?: (params?: GraphsParams) => Promise<IdeasHistory[]>;
  getActiveHistoric?: (
    params?: GraphsParams
  ) => Promise<CampaingActiveHistory[]>;
  calculateStatus?: () => Promise<CampaingStatusCount>;
  topMomentCampaigns?: () => Promise<TopCampaigns[]>;
  recentCampaigns?: () => Promise<Campaign[]>;
  getCampaign: (campaignId: string) => Promise<void>;
  sendNewCampaign?: (data: any) => Promise<void>;
  updateCampaign?: (
    data: Partial<CampaignCreateForm>,
    successMessage?
  ) => Promise<string>;
  sendConfigAcess?: () => Promise<void>;
  resetCampaign?: () => void;
  campaigns: Campaign[];
  campaign: Campaign;
  paginate: Paginate;
  loading: boolean;
  campaignsInfo: Campaign[];
  campaignFields: CampaignField[];
  selectedCampaignFields: CampaignField[];
  processActivities: ProcessActivity[];
  campaignsRanking: Array<{
    rank: string;
    title: string;
    createdIdeas: string;
    implementedIdeas: string;
  }>;

  signNewCampaignUser: (
    userId: string,
    campaignId: string,
    type: CampaignUserType
  ) => Promise<void>;
  signNewAreasRepresentative: (
    userId: string,
    campaignId: string,
    type: CampaignUserType
  ) => Promise<void>;
  searchCampaignUsers: (
    search: string,
    campaignId: string,
    type: CampaignUserType
  ) => Promise<CampaignUserOptions[]>;
  searchAreas: (search: string) => Promise<Area[]>;
  addNewStepItem: (
    campaignStepId: string,
    title: string,
    limitDate?: Date
  ) => Promise<CampaignStepItem>;
  updateStepItem: (
    id: string,
    title: string,
    limitDate?: Date
  ) => Promise<CampaignStepItem>;
  removeStepItem: (campaignStepId: string) => Promise<void>;
  getCampaignUsersSigned: (
    campaignId: string,
    type: CampaignUserType
  ) => Promise<CampaignUser[]>;
  getAreasRepresentative: (
    campaignId: string,
    type: CampaignUserType
  ) => Promise<CampaignUser[]>;
  getCampaignSteps: (
    campaignId: string,
    type: string
  ) => Promise<CampaignStep[]>;
  getCampaignStepItems: (campaignId: string) => Promise<CampaignStepItem[]>;
  getDefaultCampaignFields: () => Promise<any>;
  getSelectedCampaignFieldsValues: (id: string) => Promise<void>;
  removeCampaignUser: (id: string) => Promise<void>;
  removeAreasRepresentative: (id: string) => Promise<void>;
  searchCampaignAreas?: (search: string, campaignId: string) => Promise<any>;
  signNewAreaCampaign?: (campaignId: string, areaId: string) => Promise<any>;
  getAreaCampaignSigned?: (campaignId: string) => Promise<AreaCampaignSigned[]>;
  removeAreaCampaignSigned?: (areaId: string) => Promise<any>;
  getCampaignsInfo: () => Promise<void>;
  updateStep: (updatedStep: CampaignStep) => Promise<string>;
  deleteStep: (deletedStepId: string, campaignId?: string) => Promise<string>;
  createStep: (createdStep: CampaignStep) => Promise<any>;
  getCampaignsRanking: (params?: any) => Promise<void>;
}

export const CampaignContext = createContext<CampaignPropsData>(
  {} as CampaignPropsData
);

export const CampaignProvider: React.FC = ({ children }): JSX.Element => {
  const { getProcessActivities } = useContext(ProcessActivityContext);
  const [dataReducer, dispatch] = useReducer(
    CampaignReducer,
    CampaignDefaultValues
  );

  const resetCampaign = useCallback(() => {
    dispatch({ type: 'SET_CAMPAIGN', campaign: null });
  }, [dispatch]);

  const loadCampaigns = useCallback(async params => {
    try {
      dispatch({ type: 'SET_LOADING', loading: true });
      const { data } = await api.get('/campaigns/list', {
        params: {
          ...params,
        },
      });
      dispatch({ type: 'SET_CAMPAIGNS', campaigns: data.campaigns });
      dispatch({ type: 'SET_PAGINATE', paginate: data.paginate });
      dispatch({ type: 'SET_LOADING', loading: false });
    } catch (err) {
      dispatch({ type: 'SET_LOADING', loading: false });
      toast.error('Error');
    }
  }, []);

  const getCampaignsInfo = useCallback(async () => {
    try {
      dispatch({ type: 'SET_LOADING', loading: true });
      const { data } = await api.get('campaigns/info');
      dispatch({
        type: 'SET_CAMPAIGNS_INFO',
        campaignsInfo: data.campaignsInfo,
      });

      dispatch({ type: 'SET_LOADING', loading: false });
    } catch (err) {
      dispatch({ type: 'SET_LOADING', loading: false });
      toast.error('Error');
    }
  }, []);

  const loadAllCampaigns = useCallback(async params => {
    try {
      dispatch({ type: 'SET_LOADING', loading: true });
      const { data } = await api.get('campaigns/all', {
        params: {
          ...params,
        },
      });
      dispatch({ type: 'SET_CAMPAIGNS', campaigns: data.campaigns });
      dispatch({ type: 'SET_PAGINATE', paginate: data.paginate });
      dispatch({ type: 'SET_LOADING', loading: false });
    } catch (err) {
      dispatch({ type: 'SET_LOADING', loading: false });
      toast.error('Error');
    }
  }, []);

  const loadCampaignsUserArea = useCallback(async params => {
    try {
      dispatch({ type: 'SET_LOADING', loading: true });
      const { data } = await api.get('campaigns/list-campaigns-area-user', {
        params: {
          ...params,
        },
      });
      dispatch({
        type: 'SET_CAMPAIGNS',
        campaigns: data.campaigns,
      });
      dispatch({ type: 'SET_PAGINATE', paginate: data.paginate });
      dispatch({ type: 'SET_LOADING', loading: false });
    } catch (err) {
      dispatch({ type: 'SET_LOADING', loading: false });
      toast.error('Erro ao buscar direcionais da área do usuário');
    }
  }, []);

  const getCampaignStatusCount = useCallback(async params => {
    try {
      dispatch({ type: 'SET_LOADING', loading: true });
      const { data } = await api.get('campaigns/count-status');
      dispatch({ type: 'SET_CAMPAIGNS', campaigns: data.campaigns });
      dispatch({ type: 'SET_PAGINATE', paginate: data.paginate });
      dispatch({ type: 'SET_LOADING', loading: false });
    } catch (err) {
      dispatch({ type: 'SET_LOADING', loading: false });
      toast.error('Error');
    }
  }, []);

  const topMomentCampaigns = useCallback(async () => {
    try {
      dispatch({ type: 'SET_LOADING', loading: true });
      const { data } = await api.get('campaigns/top-moment');
      dispatch({ type: 'SET_LOADING', loading: false });
      return data.campaigns;
    } catch (err) {
      toast.error('Erro ao buscar o top 3 direcionais');
      return [];
    }
  }, []);

  const recentCampaigns = useCallback(async () => {
    try {
      dispatch({ type: 'SET_LOADING', loading: true });
      const { data } = await api.get('campaigns/recent');
      dispatch({ type: 'SET_LOADING', loading: false });
      return data.campaigns;
    } catch (err) {
      toast.error('Erro ao buscar o top 3 direcionais');
      return [];
    }
  }, []);

  const getCampaign = useCallback(async (campaignId: string) => {
    try {
      const { data } = await api.get(`campaigns/campaign/${campaignId}`);
      dispatch({ type: 'SET_CAMPAIGN', campaign: data.campaign });
    } catch (err) {
      toast.error('Error');
    }
  }, []);

  const sendNewCampaign = useCallback(
    async data => {
      const formData = new FormData();

      for (const key in data) {
        if (key === 'field') {
          formData.append(key, data[key][1]);
        } else {
          formData.append(key, data[key]);
        }
      }
      try {
        dispatch({ type: 'SET_LOADING', loading: true });
        const { data: responseData } = await api.post('/campaigns/campaign', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        await getCampaign(responseData.campaign.id);
        dispatch({ type: 'SET_LOADING', loading: false });
        toast.success('Direcional criada com sucesso');
      } catch (error) {
        toast.error(
          error?.response?.data?.message || 'Erro ao criar direcional'
        );
      }
    },
    [dispatch]
  );

  const updateCampaign = useCallback(
    async (data, successMessage = 'Sucesso ao atualizar direcional!') => {
      const formData = new FormData();

      for (const key in data) {
        if (key === 'field') {
          formData.append(key, data[key][1]);
        } else {
          formData.append(key, data[key]);
        }
      }
      try {
        dispatch({ type: 'SET_LOADING', loading: true });
        const { data: responseData } = await api.put(
          `/campaigns/${dataReducer.campaign.id}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        dispatch({ type: 'SET_LOADING', loading: false });
        dispatch({ type: 'SET_CAMPAIGN', campaign: responseData.campaign });
        toast.success(successMessage);
        return 'UPDATED';
      } catch (error) {
        if (error.response.status === 422) {
          toast.error(error.response.data.message);
        } else {
          toast.error('Erro ao atualizar direcional');
        }
        return 'NOT_UPDATED';
      }
    },
    [dispatch, dataReducer?.campaign?.id]
  );

  const searchCampaignUsers = useCallback(
    async (search: string, campaignId: string, type: CampaignUserType) => {
      try {
        const { data } = await api.get('/campaigns/campaign-users', {
          params: {
            search,
            campaignId,
            type,
          },
        });
        if (data?.campaignUsers?.length === 0) {
          toast.info('Nenhum usuário encontrado');
          return [];
        }
        return data.campaignUsers;
      } catch (err) {
        toast.error('Erro ao buscar usuários das campanhas');
      }
    },
    []
  );

  const signNewCampaignUser = useCallback(
    async (userId: string, campaignId: string, type: CampaignUserType) => {
      try {
        await api.post(`/campaigns/campaign-users/${campaignId}`, {
          type,
          userId,
        });
        toast.success('Usuário vinculado com sucesso');
      } catch (err) {
        toast.error('Falha ao vincular usuário');
      }
    },
    []
  );

  const removeCampaignUser = useCallback(async (id: string) => {
    try {
      await api.delete(`/campaigns/campaign-users/${id}`);
      toast.success('Usuário desvinculado com sucesso');
    } catch (error) {
      if (error.response.status === 422) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Falha ao remover usuário');
      }
    }
  }, []);

  const getCampaignUsersSigned = useCallback(
    async (campaignId: string, type: CampaignUserType) => {
      try {
        const { data } = await api.get(`/campaigns/campaign-users/${campaignId}`, {
          params: {
            type,
          },
        });
        return data.campaignUsers;
      } catch (err) {
        toast.error('Erro ao buscar usuários associados as campanhas');
        return [];
      }
    },
    []
  );

  const getCampaignSteps = useCallback(
    async (campaignId: string | null, type: string) => {
      try {
        const { data } = await api.get(
          `${
            campaignId ? `/campaigns/campaign-steps/${campaignId}` : '/campaigns/campaign-steps/'
          }`,
          {
            params: {
              type,
            },
          }
        );
        return data.campaignSteps;
      } catch (err) {
        toast.error('Erro ao buscar steps');
        return [];
      }
    },
    []
  );

  const getCampaignStepItems = useCallback(async (campaignStepId: string) => {
    try {
      const { data } = await api.get(
        `/campaign-step-items/${campaignStepId}`,
        {}
      );
      return data.campaignStepItems;
    } catch (err) {
      toast.error('Erro ao buscar steps');
      return [];
    }
  }, []);

  const getDefaultCampaignFields = useCallback(async () => {
    try {
      const { data } = await api.get(`/campaigns/campaign-fields`);
      dispatch({
        type: 'SET_CAMPAIGN_FIELDS',
        campaignFields: data.campaignFields,
      });
      return data.campaignFields;
    } catch (error) {
      toast.info('Error ao buscar campos padrão de direcional');
    }
  }, []);

  const getSelectedCampaignFieldsValues = useCallback(async (id: string) => {
    try {
      const {
        data: {
          campaign: { campaignFields },
        },
      } = await api.get(`/campaigns/campaign/${id}`);
      dispatch({
        type: 'SET_SELECTED_CAMPAIGN_FIELDS',
        selectedCampaignFields: campaignFields,
      });
    } catch (error) {
      toast.error('Error ao buscar campos da direcional');
    }
  }, []);

  const removeStepItem = useCallback(async (campaignStepId: string) => {
    try {
      await api.delete(`/campaign-step-items/${campaignStepId}`);
    } catch (err) {
      toast.error('Erro ao criar nova atividade');
    }
  }, []);

  const addNewStepItem = useCallback(
    async (campaignStepId: string, title: string, limitDate: Date) => {
      try {
        const { data } = await api.post(
          `/campaign-step-items/${campaignStepId}`,
          {
            title,
            limitDate,
          }
        );

        return data.campaignStepItem;
      } catch (err) {
        toast.error('Erro ao criar nova atividade');
        return undefined;
      }
    },
    []
  );

  const updateStepItem = useCallback(
    async (id: string, title: string, limitDate: Date) => {
      try {
        const { data } = await api.put(`/campaign-step-items/${id}`, {
          title,
          limitDate,
        });

        return data.campaignStepItem;
      } catch (err) {
        toast.error('Erro ao criar nova atividade');
        return undefined;
      }
    },
    []
  );

  const searchCampaignAreas = useCallback(
    async (search: string, campaignId: string) => {
      try {
        const { data } = await api.get('/campaigns/campaign-areas', {
          params: {
            search,
            campaignId,
          },
        });

        if (data?.campaignAreas?.length === 0) {
          toast.info('Nenhuma area encontrada');
          return [];
        }
        return data.campaignAreas;
      } catch (error) {
        toast.error(error?.response?.data?.message || 'Erro ao buscar Areas');
      }
    },
    []
  );

  const getAreasRepresentative = useCallback(
    async (campaignId: string, type: CampaignUserType) => {
      try {
        const { data } = await api.get(`/campaigns/campaign-areas/${campaignId}`, {
          params: {
            type,
          },
        });
        return data.campaignUsers;
      } catch (err) {
        toast.error('Erro ao buscar usuários representantes');
        return [];
      }
    },
    []
  );

  const removeAreasRepresentative = useCallback(async (id: string) => {
    try {
      await api.delete(`/campaigns/campaign-areas/${id}`);
    } catch (err) {
      toast.error('Falha ao remover usuário');
    }
  }, []);

  const signNewAreasRepresentative = useCallback(
    async (userId: string, campaignId: string, type: CampaignUserType) => {
      try {
        await api.post(`/campaigns/campaign-users/${campaignId}`, {
          type,
          userId,
        });
      } catch (err) {
        toast.error('Falha ao vincular usuário');
      }
    },
    []
  );

  /** AREAS */
  const searchAreas = useCallback(async search => {
    try {
      const { data } = await api.get('/areas/list', {
        params: {
          search,
        },
      });

      if (data?.areas?.length === 0) {
        toast.info('Nenhuma Area encontrada');
        return [];
      }
      return data.areas;
    } catch (error) {
      toast.error('Erro ao buscar Areas');
    }
  }, []);

  const signNewAreaCampaign = useCallback(
    async (campaignId: string, areaId: string) => {
      try {
        const { data } = await api.post(`/campaigns/campaign-areas/${campaignId}`, {
          campaignId,
          areaId,
        });

        return data;
      } catch (error) {
        toast.error('Erro ao vincular Area');
      }
    },
    []
  );

  const getAreaCampaignSigned = useCallback(async (campaignId: string) => {
    try {
      const { data } = await api.get(`/campaigns/campaign-areas/${campaignId}`);
      return data.campaignAreas;
    } catch (err) {
      toast.error('Erro ao buscar áreas da direcional');
      return [];
    }
  }, []);

  const removeAreaCampaignSigned = useCallback(async (campaignId: string) => {
    try {
      const removedArea = await api.delete(`/campaigns/campaign-areas/${campaignId}`);
      return removedArea;
    } catch (err) {
      toast.error('Erro ao remover área');
    }
  }, []);

  const calculateStatus = useCallback(async () => {
    try {
      dispatch({ type: 'SET_LOADING', loading: true });
      const { data } = await api.get('/campaigns/count-status');
      dispatch({ type: 'SET_LOADING', loading: false });
      return data;
    } catch (err) {
      dispatch({ type: 'SET_LOADING', loading: false });
      toast.error('Error');
    }
  }, []);

  const getActiveHistoric = useCallback(async (params = {}) => {
    try {
      dispatch({ type: 'SET_LOADING', loading: true });
      const response = await api.get('/campaigns/active-historic', {
        params,
      });
      const { historic } = response.data;
      dispatch({ type: 'SET_LOADING', loading: false });
      return historic;
    } catch (err) {
      dispatch({ type: 'SET_LOADING', loading: false });
      toast.error('Error');
      return [];
    }
  }, []);

  const getHistoricIdeas = useCallback(async (params = {}) => {
    try {
      dispatch({ type: 'SET_LOADING', loading: true });
      const response = await api.get('/ideas/list-historic', { params });
      const { ideasHistoric } = response.data;
      dispatch({ type: 'SET_LOADING', loading: false });
      return ideasHistoric;
    } catch (err) {
      dispatch({ type: 'SET_LOADING', loading: false });
      toast.error('Error');
      return [];
    }
  }, []);

  const getProjectsFunnel = useCallback(async () => {
    try {
      dispatch({ type: 'SET_LOADING', loading: true });
      const response = await api.get('/ideas/projects-funnel-amount');
      const { projectsByFunnelStepAmount } = response.data;
      dispatch({ type: 'SET_LOADING', loading: false });
      return projectsByFunnelStepAmount;
    } catch (err) {
      dispatch({ type: 'SET_LOADING', loading: false });
      toast.error('Error');
    }
  }, []);

  const getQuickwinsFunnel = useCallback(async () => {
    try {
      dispatch({ type: 'SET_LOADING', loading: true });
      const response = await api.get('/ideas/quickwins-funnel-amount');
      const { quickwinsByFunnelStepAmount } = response.data;
      dispatch({ type: 'SET_LOADING', loading: false });
      return quickwinsByFunnelStepAmount;
    } catch (err) {
      dispatch({ type: 'SET_LOADING', loading: false });
      toast.error('Error');
    }
  }, []);

  const getInnovationCategories = useCallback(async (params = {}) => {
    try {
      dispatch({ type: 'SET_LOADING', loading: true });
      const response = await api.get('/ideas/list-innovations-numbers', {
        params,
      });
      const { ideasInnovationsNumbers } = response.data;
      dispatch({ type: 'SET_LOADING', loading: false });
      return ideasInnovationsNumbers;
    } catch (err) {
      dispatch({ type: 'SET_LOADING', loading: false });
      toast.error('Error');
      return [];
    }
  }, []);

  const updateStep = useCallback(async (updatedStep: CampaignStep) => {
    try {
      await api.put(`/campaigns/campaign-steps/step/${updatedStep.id}`, {
        updatedStep,
      });
      await getProcessActivities(updatedStep.campaignId);
      toast.success('Nome do step editado');
      return 'OK';
    } catch (error) {
      toast.error('Error');
      return '';
    }
  }, []);

  const deleteStep = useCallback(
    async (deletedStepId: string, campaignId?: string) => {
      try {
        const result = await api.delete(
          `/campaigns/campaign-steps/step/${deletedStepId}`
        );
        await getProcessActivities(campaignId);
        toast.success('Step removido');
        return 'OK';
      } catch (error) {
        toast.error('Erro ao remover o step');
        return '';
      }
    },
    []
  );

  const createStep = useCallback(async (createdStep: CampaignStep) => {
    try {
      const newStep = await api.post(`/campaigns/campaign-steps/step`, {
        createdStep,
      });
      await getProcessActivities(createdStep.campaignId);
      toast.success('Novo step criado');
      return newStep.data.campaignStep;
    } catch (error) {
      toast.error('Erro ao criar o step');
      return '';
    }
  }, []);

  const getCampaignsRanking = useCallback(
    async (params?: any) => {
      try {
        dispatch({ type: 'SET_LOADING', loading: true });

        const { data } = await api.get(`/campaigns/ranking`, {
          params,
        });
        dispatch({
          type: 'SET_CAMPAIGNS_RANKING',
          campaignsRanking: data,
        });

        dispatch({ type: 'SET_LOADING', loading: false });
      } catch (error) {
        toast.error(
          error?.response?.data?.message ||
            'Erro ao buscar ranking de direcionais'
        );
      }
    },
    [dispatch]
  );

  const CampaignDataValue = useMemo(() => {
    return {
      ...dataReducer,
      getInnovationCategories,
      getQuickwinsFunnel,
      getProjectsFunnel,
      getHistoricIdeas,
      getActiveHistoric,
      calculateStatus,
      loadCampaigns,
      loadAllCampaigns,
      loadCampaignsUserArea,
      sendNewCampaign,
      searchCampaignUsers,
      signNewCampaignUser,
      getCampaignUsersSigned,
      removeCampaignUser,
      searchCampaignAreas,
      getCampaignSteps,
      addNewStepItem,
      getCampaignStepItems,
      removeStepItem,
      updateStepItem,
      getAreasRepresentative,
      signNewAreasRepresentative,
      removeAreasRepresentative,
      searchAreas,
      signNewAreaCampaign,
      getAreaCampaignSigned,
      removeAreaCampaignSigned,
      updateCampaign,
      topMomentCampaigns,
      recentCampaigns,
      getCampaign,
      resetCampaign,
      getCampaignsInfo,
      updateStep,
      deleteStep,
      createStep,
      getDefaultCampaignFields,
      getSelectedCampaignFieldsValues,
      getCampaignsRanking,
    };
  }, [
    dataReducer,
    getInnovationCategories,
    getQuickwinsFunnel,
    getProjectsFunnel,
    loadCampaigns,
    loadAllCampaigns,
    loadCampaignsUserArea,
    getHistoricIdeas,
    getActiveHistoric,
    calculateStatus,
    sendNewCampaign,
    updateCampaign,
    searchCampaignUsers,
    signNewCampaignUser,
    getCampaignUsersSigned,
    removeCampaignUser,
    searchCampaignAreas,
    recentCampaigns,
    topMomentCampaigns,
    getCampaignSteps,
    addNewStepItem,
    getCampaignStepItems,
    removeStepItem,
    updateStepItem,
    getAreasRepresentative,
    signNewAreasRepresentative,
    removeAreasRepresentative,
    searchAreas,
    signNewAreaCampaign,
    getAreaCampaignSigned,
    removeAreaCampaignSigned,
    getCampaign,
    resetCampaign,
    getCampaignsInfo,
    updateStep,
    deleteStep,
    createStep,
    getDefaultCampaignFields,
    getSelectedCampaignFieldsValues,
    getCampaignsRanking,
  ]);

  return (
    <CampaignContext.Provider value={CampaignDataValue}>
      {children}
    </CampaignContext.Provider>
  );
};
