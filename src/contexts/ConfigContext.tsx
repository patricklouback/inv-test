/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { CampaignField } from 'interfaces/campaign';
import { IdeaField, KanbanStep } from 'interfaces/idea';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import { toast } from 'react-toastify';
import { api } from 'services/api';
import { AuthContext } from './AuthContext';
import { ConfigDefaultValues, ConfigReducer } from './reducers/ConfigReducer';

interface ConfigPropsData {
  loading: boolean;
  company_image?: string;
  company_terms?: string;
  slogan?: string;
  idea_creation_weight?: string;
  idea_co_creation_weight?: string;
  idea_comment_weight?: string;
  idea_select_weight?: string;
  idea_implement_weight?: string;
  ideaFields: IdeaField[];
  campaignFields: CampaignField[];
  default_users_csv?: any;
  kanbanSteps: KanbanStep[];
  getGlobalConfigs: () => Promise<void>;
  getDefaultIdeaFields: () => Promise<any>;
  getCampaignIdeaFields: (campaignId: string) => Promise<any>;
  getIdeaFieldsForIdeaForm: (campaignId: string) => Promise<any>;
  deleteIdeaField: (ideaFieldId: string) => Promise<void>;
  updateIdeaField: (ideaFieldId: string, body: any) => Promise<void>;
  updateIdeaFieldsSequence: (body: any) => Promise<void>;
  createIdeaField: (body: any) => Promise<void>;
  createIdeaFieldForCampaign: (body: any, campaignId: string) => Promise<void>;
  editLogoOrganization: (image: any) => Promise<void>;
  editOrganizationSlogan: (slogan: string) => Promise<void>;
  editIdeaCreationWeight: (value: string) => Promise<void>;
  editCompanyTerms: (value: string) => Promise<void>;
  editIdeaCoCreationWeight: (value: string) => Promise<void>;
  editIdeaCommentWeight: (value: string) => Promise<void>;
  editIdeaSelectWeight: (value: string) => Promise<void>;
  editIdeaImplementWeight: (value: string) => Promise<void>;
  updatePointsService: () => Promise<void>;
  createCampaignField: (body: any) => Promise<void>;
  deleteCampaignField: (campaignFieldId: string) => Promise<void>;
  updateCampaignField: (campaignFieldId: string, body: any) => Promise<void>;
  getDefaultCampaignFields: () => Promise<any>;
  updateCampaignFieldsSequence: (body: any) => Promise<void>;
  updateKanbanStep: (kanbanStepId: string, newTitle: string) => Promise<void>;
  getKanbanSteps: () => Promise<KanbanStep[]>;
  importIdeaFieldsForCampaign: (campaignId: string) => Promise<void>;
}

export const ConfigContext = createContext<ConfigPropsData>(
  {} as ConfigPropsData
);

export const ConfigProvider: React.FC = ({ children }): JSX.Element => {
  const { token } = useContext(AuthContext);
  const [dataReducer, dispatch] = useReducer(
    ConfigReducer,
    ConfigDefaultValues
  );

  const updatePointsService = useCallback(async () => {
    try {
      await api.put('/users/update-points');
      toast.info('Pontos resetados com sucesso!');
    } catch (error) {
      toast.info('Error ao resetar pontos');
    }
  }, []);

  const updateKanbanStep = useCallback(
    async (kanbanStepId: string, newTitle: string) => {
      try {
        await api.put(`/ideas/kanban-step/${kanbanStepId}`, {
          newTitle,
        });
      } catch (err) {
        toast.error(
          err?.response?.data?.message || 'Erro ao atualizar etapa do funil'
        );
      }
    },
    []
  );

  const getGlobalConfigs = useCallback(async () => {
    try {
      dispatch({ type: 'SET_LOADING', loading: true });
      const { data } = await api.get('/configs/list');

      dispatch({
        type: 'SET_SLOGAN',
        slogan: data.configs.find(e => e.parameter === 'slogan')?.value,
      });
      dispatch({
        type: 'SET_COMPANY_IMAGE',
        company_image: data.configs.find(e => e.parameter === 'company_image')
          ?.value,
      });
      dispatch({
        type: 'SET_IDEA_CREATION_WEIGHT',
        idea_creation_weight: data.configs.find(
          e => e.parameter === 'idea_creation_weight'
        )?.value,
      });
      dispatch({
        type: 'SET_IDEA_CO_CREATION_WEIGHT',
        idea_co_creation_weight: data.configs.find(
          e => e.parameter === 'idea_co_creation_weight'
        )?.value,
      });
      dispatch({
        type: 'SET_IDEA_COMMENT_WEIGHT',
        idea_comment_weight: data.configs.find(
          e => e.parameter === 'idea_comment_weight'
        )?.value,
      });
      dispatch({
        type: 'SET_IDEA_SELECT_WEIGHT',
        idea_select_weight: data.configs.find(
          e => e.parameter === 'idea_select_weight'
        )?.value,
      });
      dispatch({
        type: 'SET_IDEA_IMPLEMENT_WEIGHT',
        idea_implement_weight: data.configs.find(
          e => e.parameter === 'idea_implement_weight'
        )?.value,
      });
      dispatch({
        type: 'SET_COMPANY_TERMS',
        company_terms: data.configs.find(e => e.parameter === 'company_terms')
          ?.value,
      });

      dispatch({ type: 'SET_LOADING', loading: false });
    } catch (error) {
      toast.info('Error ao buscar configurações globais');
    }
  }, [dispatch]);

  const editLogoOrganization = useCallback(
    async (form: any) => {
      try {
        dispatch({ type: 'SET_LOADING', loading: true });

        const { data } = await api.put('/configs/company_image', form);
        dispatch({
          type: 'SET_COMPANY_IMAGE',
          company_image: data.config.value,
        });
        dispatch({ type: 'SET_LOADING', loading: false });
      } catch (error) {
        toast.info('Error ao buscar logo da organização');
      }
    },
    [dispatch]
  );

  const deleteIdeaField = useCallback(async (ideaFieldId: string) => {
    try {
      await api.delete(`/ideas/idea-fields/${ideaFieldId}`);
      toast.success('Campo de iniciativa deletado com sucesso!');
    } catch (error) {
      toast.error(
        error?.response?.data?.message || 'Erro ao deletar campo da inciativa'
      );
    }
  }, []);

  const updateIdeaField = useCallback(
    async (ideaFieldId: string, body: any) => {
      try {
        await api.put(`/ideas/idea-fields/${ideaFieldId}`, body);
        toast.success('Campo de iniciativa atualizado com sucesso!');
      } catch (error) {
        toast.error(
          error?.response?.data?.message ||
            'Error ao atualizar campo de iniciativa.'
        );
      }
    },
    []
  );

  const createIdeaField = useCallback(async (body: any) => {
    try {
      await api.post(`/ideas/idea-fields`, body);
      toast.success('Campo de iniciativa criado com sucesso!');
    } catch (error) {
      toast.error(
        error?.response?.data?.message || 'Error ao criar campo de iniciativa.'
      );
    }
  }, []);

  const createIdeaFieldForCampaign = useCallback(
    async (body: any, campaignId: string) => {
      try {
        await api.post(`/ideas/idea-fields/${campaignId}`, body);
        toast.success('Campo de iniciativa criado com sucesso!');
      } catch (error) {
        toast.error(
          error?.response?.data?.message ||
            'Error ao criar campo de iniciativa.'
        );
      }
    },
    []
  );

  const editOrganizationSlogan = useCallback(
    async (slogan: string) => {
      try {
        dispatch({ type: 'SET_LOADING', loading: true });
        const { data } = await api.put(`/configs/slogan`, {
          value: slogan,
        });
        dispatch({ type: 'SET_SLOGAN', slogan: data.config.value });
        dispatch({ type: 'SET_LOADING', loading: false });
      } catch (error) {
        toast.info('Erro ao editar slogan');
      }
    },
    [dispatch]
  );

  const editCompanyTerms = useCallback(
    async (value: string) => {
      try {
        dispatch({ type: 'SET_LOADING', loading: true });
        const { data } = await api.put(`/configs/company_terms`, {
          value,
        });
        dispatch({
          type: 'SET_COMPANY_TERMS',
          company_terms: data.config.value,
        });
        dispatch({ type: 'SET_LOADING', loading: false });
      } catch (error) {
        toast.info('Error ao editar termos de uso');
      }
    },
    [dispatch]
  );

  const editIdeaCreationWeight = useCallback(
    async (value: string) => {
      try {
        dispatch({ type: 'SET_LOADING', loading: true });
        const { data } = await api.put(`/configs/idea_creation_weight`, {
          value,
        });
        dispatch({
          type: 'SET_IDEA_CREATION_WEIGHT',
          idea_creation_weight: data.config.value,
        });
        dispatch({ type: 'SET_LOADING', loading: false });
      } catch (error) {
        toast.info('Erro ao buscar pesos da ideia');
      }
    },
    [dispatch]
  );

  const editIdeaCoCreationWeight = useCallback(
    async (value: string) => {
      try {
        dispatch({ type: 'SET_LOADING', loading: true });
        const { data } = await api.put(`/configs/idea_co_creation_weight`, {
          value,
        });
        dispatch({
          type: 'SET_IDEA_CO_CREATION_WEIGHT',
          idea_co_creation_weight: data.config.value,
        });
        dispatch({ type: 'SET_LOADING', loading: false });
      } catch (error) {
        toast.info('Erro ao buscar co criadores');
      }
    },
    [dispatch]
  );

  const editIdeaCommentWeight = useCallback(
    async (value: string) => {
      try {
        dispatch({ type: 'SET_LOADING', loading: true });
        const { data } = await api.put(`/configs/idea_comment_weight`, {
          value,
        });
        dispatch({
          type: 'SET_IDEA_COMMENT_WEIGHT',
          idea_comment_weight: data.config.value,
        });
        dispatch({ type: 'SET_LOADING', loading: false });
      } catch (error) {
        toast.info('Error ao buscar usúarios');
      }
    },
    [dispatch]
  );

  const editIdeaSelectWeight = useCallback(
    async (value: string) => {
      try {
        dispatch({ type: 'SET_LOADING', loading: true });
        const { data } = await api.put(`/configs/idea_select_weight`, {
          value,
        });
        dispatch({
          type: 'SET_IDEA_SELECT_WEIGHT',
          idea_select_weight: data.config.value,
        });
        dispatch({ type: 'SET_LOADING', loading: false });
      } catch (error) {
        toast.info('Error ao buscar peso para seleção de iniciativas');
      }
    },
    [dispatch]
  );

  const editIdeaImplementWeight = useCallback(
    async (value: string) => {
      try {
        dispatch({ type: 'SET_LOADING', loading: true });
        const { data } = await api.put(`/configs/idea_implement_weight`, {
          value,
        });
        dispatch({
          type: 'SET_IDEA_IMPLEMENT_WEIGHT',
          idea_implement_weight: data.config.value,
        });
        dispatch({ type: 'SET_LOADING', loading: false });
      } catch (error) {
        toast.info('Error ao buscar peso para iniciativas em implementação');
      }
    },
    [dispatch]
  );

  const getDefaultIdeaFields = useCallback(async () => {
    try {
      const { data } = await api.get(`/ideas/idea-fields`);
      dispatch({ type: 'SET_IDEA_FIELDS', ideaFields: data.ideaFields });
      return data.ideaFields;
    } catch (error) {
      toast.info('Error ao buscar campos de iniciativa');
    }
  }, []);

  const getCampaignIdeaFields = useCallback(async (campaignId: string) => {
    try {
      const { data } = await api.get(`/ideas/idea-fields/${campaignId}`);
      dispatch({ type: 'SET_IDEA_FIELDS', ideaFields: data.ideaFields });
      return data.ideaFields;
    } catch (error) {
      toast.info('Error ao buscar campos de iniciativa desta campanha');
    }
  }, []);

  const importIdeaFieldsForCampaign = useCallback(
    async (campaignId: string) => {
      try {
        await api.put(`/ideas/idea-fields/import/${campaignId}`);
        toast.success('Template importado com sucesso.');
      } catch (error) {
        toast.info(
          'Error ao importar template de campos de iniciativa para a campanha'
        );
      }
    },
    []
  );

  const getKanbanSteps = useCallback(async () => {
    try {
      const { data } = await api.get(`/ideas/kanban-step/list`);
      dispatch({ type: 'SET_KANBAN_STEPS', kanbanSteps: data.kanbanSteps });
      return data.kanbanSteps;
    } catch (err) {
      toast.error(
        err?.response?.data?.message || 'Erro ao buscar etapas do funil'
      );
    }
  }, []);

  const getIdeaFieldsForIdeaForm = useCallback(async (campaignId: string) => {
    try {
      const { data } = await api.get(`/ideas/idea-fields/idea-form/${campaignId}`);
      dispatch({ type: 'SET_IDEA_FIELDS', ideaFields: data.ideaFields });
      return data.ideaFields;
    } catch (error) {
      toast.info('Error ao buscar campos de iniciativa');
    }
  }, []);

  const updateIdeaFieldsSequence = useCallback(async (body: any) => {
    try {
      await api.put(`/ideas/idea-fields`, body);
      // toast.success('Sequencia de campos atualizada!');
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          'Error ao atualizar sequência de campos de iniciativa.'
      );
    }
  }, []);

  const createCampaignField = useCallback(async (body: any) => {
    try {
      await api.post(`/campaigns/campaign-fields`, body);
      toast.success('Campo de direcional criado com sucesso!');
    } catch (error) {
      toast.error(
        error?.response?.data?.message || 'Error ao criar campo de iniciativa.'
      );
    }
  }, []);

  const deleteCampaignField = useCallback(async (campaignFieldId: string) => {
    try {
      await api.delete(`/campaigns/campaign-fields/${campaignFieldId}`);
      toast.success('Campo de iniciativa deletado com sucesso!');
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Erro ao deletar campanha');
    }
  }, []);

  const updateCampaignField = useCallback(
    async (campaignFieldId: string, body: any) => {
      try {
        await api.put(`/campaigns/campaign-fields/${campaignFieldId}`, body);
        toast.success('Campo de iniciativa atualizado com sucesso!');
      } catch (error) {
        toast.error(
          error?.response?.data?.message ||
            'Error ao atualizar campo de iniciativa.'
        );
      }
    },
    []
  );

  const getDefaultCampaignFields = useCallback(async () => {
    try {
      const { data } = await api.get(`/campaigns/campaign-fields`);
      dispatch({
        type: 'SET_CAMPAIGN_FIELDS',
        campaignFields: data.campaignFields,
      });
      return data.campaignFields;
    } catch (error) {
      toast.info('Error ao buscar campos de direcional');
    }
  }, []);

  const updateCampaignFieldsSequence = useCallback(async (body: any) => {
    try {
      await api.put(`/campaigns/campaign-fields`, body);
      // toast.success('Sequencia de campos atualizada!');
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          'Error ao atualizar sequência de campos de direcional.'
      );
    }
  }, []);

  useEffect(() => {
    // @ts-ignore
    if (token && api?.defaults?.headers?.Authorization) {
      getGlobalConfigs();
    }
  }, [getGlobalConfigs, token]);

  const AuthDataValue = useMemo(() => {
    return {
      ...dataReducer,
      getGlobalConfigs,
      editLogoOrganization,
      editOrganizationSlogan,
      editIdeaCreationWeight,
      editIdeaCoCreationWeight,
      editIdeaSelectWeight,
      editIdeaImplementWeight,
      deleteIdeaField,
      editIdeaCommentWeight,
      getDefaultIdeaFields,
      getCampaignIdeaFields,
      updateIdeaField,
      updateIdeaFieldsSequence,
      createIdeaField,
      createIdeaFieldForCampaign,
      updatePointsService,
      createCampaignField,
      deleteCampaignField,
      updateCampaignField,
      getDefaultCampaignFields,
      updateCampaignFieldsSequence,
      editCompanyTerms,
      getIdeaFieldsForIdeaForm,
      updateKanbanStep,
      getKanbanSteps,
      importIdeaFieldsForCampaign,
    };
  }, [
    dataReducer,
    getGlobalConfigs,
    editLogoOrganization,
    editOrganizationSlogan,
    editIdeaCreationWeight,
    editIdeaCoCreationWeight,
    editIdeaCommentWeight,
    editIdeaSelectWeight,
    editIdeaImplementWeight,
    getDefaultIdeaFields,
    getCampaignIdeaFields,
    deleteIdeaField,
    updateIdeaField,
    updateIdeaFieldsSequence,
    createIdeaField,
    createIdeaFieldForCampaign,
    updatePointsService,
    createCampaignField,
    deleteCampaignField,
    updateCampaignField,
    getDefaultCampaignFields,
    updateCampaignFieldsSequence,
    editCompanyTerms,
    getIdeaFieldsForIdeaForm,
    updateKanbanStep,
    getKanbanSteps,
    importIdeaFieldsForCampaign,
  ]);

  return (
    <ConfigContext.Provider value={AuthDataValue}>
      {children}
    </ConfigContext.Provider>
  );
};
