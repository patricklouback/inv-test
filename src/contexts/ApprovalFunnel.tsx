/* eslint-disable no-restricted-syntax */
import { CampaignUserType } from 'interfaces/campaign';
import {
  Idea,
  IdeaKanbamStep,
  KanbanObject,
  IdeaLink,
  KanbanStep,
} from 'interfaces/idea';
import { User } from 'interfaces/user';
import { useContext } from 'react';
import { createContext, useCallback, useMemo, useReducer } from 'react';
import { toast } from 'react-toastify';
import { api } from 'services/api';
import { NotificationsContext } from './Notification';
import {
  ApprovalFunnelDefaultValues,
  ApprovalFunnelReducer,
} from './reducers/ApprovalFunnel';

interface GetUserOptionsParams {
  search: string;
}

type UserOptions = Pick<User, 'id' | 'name' | 'image'>;
type CampaignUserOptions = Pick<User, 'id' | 'name'>;

type IdeaKanbanStatus =
  | 'WAITING'
  | 'MANAGER_REVIEW'
  | 'TECH_REVIEW'
  | 'OWNER_REVIEW'
  | 'AGENT_REVIEW'
  | 'APPROVED'
  | 'PAUSED';

type NotificationType =
  | 'COMMENT'
  | 'REPLY_COMMENT'
  | 'SEND_CAMPAIGN'
  | 'SEND_IDEA'
  | 'NOTIFY_STATUS'
  | 'SEND_VIDEO'
  | 'KANBAN_PROCESS_DEVELOP'
  | 'OWNER_REVIEW'
  | 'TECH_REVIEW'
  | 'AGENT_REVIEW';

interface DataProps {
  notification: {
    title: string;
    description: string;
    userId?: string;
    link?: string;
    originUserId?: string;
    type?: NotificationType;
  };
  kanbanStatus?: IdeaKanbanStatus;
}

interface ApprovalFunnelData {
  kanbanIdeas: KanbanObject;
  kanbanSteps: KanbanStep[];
  loading: boolean;
  linkedIdeas: Idea[];
  allLinkedIdeas: Idea[];
  getKanbanIdeas: (params?: any) => Promise<void>;
  getKanbanSteps: () => Promise<void>;
  getIdeasForLink: (params: any) => Promise<Idea[]>;
  declineIdea: (ideaId: string, data: DataProps) => Promise<void>;
  getSupportUsers: (
    campaignId: string,
    params: GetUserOptionsParams
  ) => Promise<UserOptions[]>;
  reviewIdea: (ideaId: string, data: DataProps) => Promise<void>;
  reviewTechIdea: (ideaId: string, data: DataProps) => Promise<void>;
  reviewAgentIdea: (ideaId: string, data: DataProps) => Promise<void>;
  updateKanbanIdeaStatus: (
    idea: Idea,
    kanbanStep: IdeaKanbamStep,
    sequence: number
  ) => Promise<void>;
  searchIdeaUsers: (
    search: string,
    campaignId: string,
    type: CampaignUserType
  ) => Promise<CampaignUserOptions[]>;
  updateIdeaStatusInKanbanIdeas: (
    ideaId: string,
    kanbanStatus: IdeaKanbanStatus
  ) => void;
  linkIdeas: (
    primaryIdeaId: string,
    secondaryIdeaId: string
  ) => Promise<IdeaLink>;
  unLinkIdeas: (params?: any) => Promise<IdeaLink[]>;
  listLinkedIdeas: (ideaId: string) => Promise<Idea[]>;
  listAllLinkedIdeas: (ideaId: string) => Promise<Idea[]>;
  listIdeaLinksForIdeaUser: (ideaId: string) => Promise<Idea[]>;
  listAllSecondaryIdeaLinks: () => Promise<string[]>;
  handleSelectCampaign: (id: string) => void;
  selectedCampaignsIds: string[];
  handleSelectIdeaType: (type: string) => void;
  selectedIdeaTypes: string[];
}

export const ApprovalFunnelContext = createContext<ApprovalFunnelData>(
  {} as ApprovalFunnelData
);

export const ApprovalFunnelProvider: React.FC = ({ children }): JSX.Element => {
  const [dataReducer, dispatch] = useReducer(
    ApprovalFunnelReducer,
    ApprovalFunnelDefaultValues
  );

  const { notificateIdeaUsers } = useContext(NotificationsContext);

  const getKanbanIdeas = useCallback(async (params = {}) => {
    try {
      dispatch({ type: 'SET_LOADING', loading: true });
      const { data } = await api.get(`/ideas/kanban`, {
        params: {
          campaignsIds: params.params1,
          ideasThatHasUpdateIds: params.params2,
          ideaType: params.params3,
          search: params.params4,
        },
      });
      dispatch({ type: 'SET_KANBAN_IDEAS', kanbanIdeas: data.ideas });
      dispatch({ type: 'SET_LOADING', loading: false });
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Erro ao buscar iniciativas');
    }
  }, []);

  const getKanbanSteps = useCallback(async () => {
    try {
      dispatch({ type: 'SET_LOADING', loading: true });
      const { data } = await api.get(`/ideas/kanban-step/list`);
      dispatch({ type: 'SET_KANBAN_STEPS', kanbanSteps: data.kanbanSteps });
      dispatch({ type: 'SET_LOADING', loading: false });
    } catch (err) {
      toast.error(
        err?.response?.data?.message || 'Erro ao buscar etapas do funil'
      );
    }
  }, []);

  const getIdeasForLink = useCallback(async (params = {}) => {
    try {
      dispatch({ type: 'SET_LOADING', loading: true });
      const { data } = await api.get(`/ideas/ideas-for-link/`, {
        params: {
          search: params.params1,
          ideaId: params.params2,
        },
      });
      dispatch({ type: 'SET_IDEAS_LINK', ideasForLink: data.ideas });
      dispatch({ type: 'SET_LOADING', loading: false });
      return data;
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Erro ao buscar iniciativas');
    }
  }, []);

  const reviewIdea = useCallback(
    async (ideaId: string, data: DataProps) => {
      try {
        await api.put(`/ideas/change-kanban-status/${ideaId}`, {
          ...data,
        });
        toast.success('Solicitação de revisão enviada!');
        await getKanbanIdeas();
      } catch (error) {
        toast.error(
          error?.response?.data?.message || 'Erro ao solicitar revisão!'
        );
      }
    },
    [getKanbanIdeas]
  );

  const declineIdea = useCallback(
    async (ideaId: string, data: DataProps) => {
      try {
        await api.put(`/ideas/decline/${ideaId}`, { ...data });
        toast.success('A iniciativa foi recusada!');
        await getKanbanIdeas();
      } catch (error) {
        toast.error(
          error?.response?.data?.message ||
            'Erro ao tentar recusar a iniciativa!'
        );
      }
    },
    [getKanbanIdeas]
  );

  const getSupportUsers = useCallback(
    async (campaignId: string, params: GetUserOptionsParams) => {
      try {
        const { data } = await api.get(
          `/ideas/available-supports/${campaignId}`,
          {
            params,
          }
        );
        return data.users;
      } catch (error) {
        toast.error('Erro ao buscar usuários!');
        return [];
      }
    },
    []
  );

  const reviewTechIdea = useCallback(
    async (ideaId: string, data: DataProps) => {
      try {
        await api.put(`/ideas/change-kanban-status/${ideaId}`, {
          ...data,
        });
        toast.success('Solicitação de revisão técnica enviada!');
        await getKanbanIdeas();
      } catch (error) {
        toast.error(
          error?.response?.data?.message || 'Erro ao solicitar revisão!'
        );
      }
    },
    [getKanbanIdeas]
  );

  const reviewAgentIdea = useCallback(
    async (ideaId: string, data: DataProps) => {
      try {
        await api.put(`/ideas/change-kanban-status/${ideaId}`, {
          ...data,
        });
        toast.success('Solicitação de avaliação técnica enviada!');
        await getKanbanIdeas();
      } catch (error) {
        toast.error(
          error?.response?.data?.message || 'Erro ao solicitar revisão!'
        );
      }
    },
    [getKanbanIdeas]
  );

  const updateKanbanIdeaStatus = useCallback(
    async (idea: Idea, kanbanStep: IdeaKanbamStep, sequence: number) => {
      try {
        dispatch({ type: 'SET_LOADING', loading: true });
        if (kanbanStep !== idea.kanbanStep) {
          await api.put(`/ideas/change-kanban/${idea.id}`, {
            kanbanStep,
            sequence,
          });

          const { kanbanIdeas } = dataReducer;

          const oldKanban = kanbanIdeas[idea.kanbanStep].filter(
            i => i.id !== idea.id
          );

          let newKanban = [];

          if (kanbanIdeas[kanbanStep]) {
            newKanban = [...kanbanIdeas[kanbanStep], { ...idea, kanbanStep }];
          } else {
            newKanban = [{ ...idea, kanbanStep }];
          }

          const kanbanIdeasFormatted = {
            ...kanbanIdeas,
            [idea.kanbanStep]: oldKanban,
            [kanbanStep]: newKanban,
          };

          await notificateIdeaUsers(idea?.id, kanbanStep);

          dispatch({
            type: 'SET_KANBAN_IDEAS',
            kanbanIdeas: { ...kanbanIdeasFormatted } as KanbanObject,
          });
          dispatch({ type: 'SET_LOADING', loading: false });
        }
      } catch (err) {
        toast.error(
          err?.response?.data?.message || 'Erro ao atualizar iniciativa'
        );
      }
    },
    [dataReducer, notificateIdeaUsers]
  );

  const searchIdeaUsers = useCallback(
    async (search: string, campaignId: string, type: CampaignUserType) => {
      try {
        const { data } = await api.get('/ideas/idea-users/type', {
          params: {
            search,
            campaignId,
            type,
          },
        });
        if (data?.ideaUsers?.length === 0) {
          toast.info('Nenhum usuário encontrado');
          return [];
        }
        return data.ideaUsers;
      } catch (err) {
        toast.error('Erro ao buscar usuários da idea');
      }
    },
    []
  );

  // duif entre viewIDea e viewList
  const updateIdeaStatusInKanbanIdeas = useCallback(
    (ideaId: string, kanbanStatus: IdeaKanbanStatus) => {
      const { kanbanIdeas } = dataReducer;
      const updatedKanbanIdeas = JSON.parse(JSON.stringify(kanbanIdeas));

      for (const key in updatedKanbanIdeas) {
        // eslint-disable-next-line no-prototype-builtins
        if (updatedKanbanIdeas.hasOwnProperty(key)) {
          const currentKanbanStep = updatedKanbanIdeas[key];

          const currentIdeaIndex = currentKanbanStep.findIndex(
            idea => idea.id === ideaId
          );

          if (currentIdeaIndex >= 0) {
            const updatedIdea = {
              ...currentKanbanStep[currentIdeaIndex],
              kanbanStatus,
            };

            updatedKanbanIdeas[key][currentIdeaIndex] = updatedIdea;
          }
        }
      }

      dispatch({ type: 'SET_KANBAN_IDEAS', kanbanIdeas: updatedKanbanIdeas });
    },
    [dataReducer]
  );

  const linkIdeas = useCallback(
    async (primaryIdeaId: string, secondaryIdeaId: string) => {
      try {
        const {
          data: { createdIdeaLinks },
        } = await api.post(`/ideas/idea-links/link`, {
          primaryIdeaId,
          secondaryIdeaId,
        });
        return createdIdeaLinks;
      } catch (err) {
        toast.error(
          err?.response?.data?.message || 'Erro ao vincular iniciativas'
        );
      }
    },
    []
  );

  const unLinkIdeas = useCallback(async (params = {}) => {
    try {
      const {
        data: { deletedIdeaLink },
      } = await api.delete(`/ideas/idea-links/unlink/`, {
        params: {
          primaryIdeaId: params.params1,
          secondaryIdeaId: params.params2,
        },
      });
      return deletedIdeaLink;
    } catch (err) {
      toast.error(
        err?.response?.data?.message || 'Erro ao desvincular iniciativas'
      );
    }
  }, []);

  const listLinkedIdeas = useCallback(async (ideaId: string) => {
    try {
      const {
        data: { linkedIdeas },
      } = await api.get(`/ideas/idea-links/${ideaId}`);
      dispatch({ type: 'SET_LINKED_IDEAS', linkedIdeas });
      return linkedIdeas;
    } catch (err) {
      toast.error(
        err?.response?.data?.message || 'Erro ao buscar iniciativas vinculadas'
      );
    }
  }, []);

  const listAllLinkedIdeas = useCallback(async (ideaId: string) => {
    try {
      const {
        data: { allLinkedIdeas },
      } = await api.get(`/ideas/idea-links/all/${ideaId}`);
      dispatch({ type: 'SET_ALL_LINKED_IDEAS', allLinkedIdeas });
      return allLinkedIdeas;
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          'Erro ao buscar todas as iniciativas vinculadas'
      );
    }
  }, []);

  const listAllSecondaryIdeaLinks = useCallback(async () => {
    try {
      const {
        data: { secondaryLinkedIdeas },
      } = await api.get(`/ideas/idea-links/secondary`);
      return secondaryLinkedIdeas;
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          'Erro ao buscar iniciativas secundárias vinculadas'
      );
    }
  }, []);

  const listIdeaLinksForIdeaUser = useCallback(async (ideaId: string) => {
    try {
      const {
        data: { ideaLinksForIdeaUser },
      } = await api.get(`/ideas/idea-links/for-user/${ideaId}`);
      return ideaLinksForIdeaUser;
    } catch (err) {
      toast.error(
        err?.response?.data?.message || 'Erro ao buscar iniciativas vinculadas'
      );
    }
  }, []);

  const handleSelectCampaign = (id: string) => {
    const campaignIndex = dataReducer.selectedCampaignsIds.findIndex(
      campaignId => campaignId === id
    );

    if (campaignIndex !== -1) {
      dispatch({
        type: 'SET_SELECTED_CAMPAIGNS_IDS',
        selectedCampaignsIds: dataReducer.selectedCampaignsIds.filter(
          (campaign, index) => index !== campaignIndex
        ),
      });
    } else {
      dispatch({
        type: 'SET_SELECTED_CAMPAIGNS_IDS',
        selectedCampaignsIds: [...dataReducer.selectedCampaignsIds, id],
      });
    }
  };

  const handleSelectIdeaType = (type: string) => {
    let newSelectedIdeaTypes = [...dataReducer.selectedIdeaTypes];
    if (newSelectedIdeaTypes.includes(type)) {
      newSelectedIdeaTypes = newSelectedIdeaTypes.filter(
        selectedIdeaType => selectedIdeaType !== type
      );
    } else {
      newSelectedIdeaTypes.push(type);
    }

    dispatch({
      type: 'SET_SELECTED_IDEA_TYPES',
      selectedIdeaTypes: newSelectedIdeaTypes,
    });
  };

  const ApprovalFunnelDataValue = useMemo(() => {
    return {
      ...dataReducer,
      getKanbanIdeas,
      getKanbanSteps,
      updateKanbanIdeaStatus,
      declineIdea,
      reviewIdea,
      reviewTechIdea,
      getSupportUsers,
      searchIdeaUsers,
      reviewAgentIdea,
      updateIdeaStatusInKanbanIdeas,
      linkIdeas,
      unLinkIdeas,
      listLinkedIdeas,
      listAllLinkedIdeas,
      listIdeaLinksForIdeaUser,
      listAllSecondaryIdeaLinks,
      getIdeasForLink,
      handleSelectCampaign,
      handleSelectIdeaType,
    };
  }, [
    dataReducer,
    getKanbanIdeas,
    getKanbanSteps,
    updateKanbanIdeaStatus,
    declineIdea,
    reviewIdea,
    reviewTechIdea,
    getSupportUsers,
    searchIdeaUsers,
    reviewAgentIdea,
    updateIdeaStatusInKanbanIdeas,
    linkIdeas,
    unLinkIdeas,
    listLinkedIdeas,
    listAllLinkedIdeas,
    listIdeaLinksForIdeaUser,
    listAllSecondaryIdeaLinks,
    getIdeasForLink,
    handleSelectCampaign,
  ]);

  return (
    <ApprovalFunnelContext.Provider value={ApprovalFunnelDataValue}>
      {children}
    </ApprovalFunnelContext.Provider>
  );
};
