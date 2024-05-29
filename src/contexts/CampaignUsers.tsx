/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-syntax */
import { createContext, useCallback, useMemo } from 'react';
import { toast } from 'react-toastify';
import { api } from 'services/api';
import { User } from 'interfaces/user';
import { CampaignUser, CampaignUserType } from 'interfaces/campaign';

type CampaignUserOptions = Pick<User, 'id' | 'name'>;

interface CampaignPropsData {
  signNewCampaignUser: (
    userId: string,
    campaignId: string,
    type: CampaignUserType
  ) => Promise<void>;
  searchCampaignUsers: (
    search: string,
    campaignId: string,
    type: CampaignUserType
  ) => Promise<CampaignUserOptions[]>;
  getCampaignUsersSigned: (
    campaignId: string,
    type: CampaignUserType
  ) => Promise<CampaignUser[]>;
  removeCampaignUser: (id: string) => Promise<void>;
  getCampaingUsers: (campaignId: string) => Promise<CampaignUser[]>;
}

export const CampaignUsersContext = createContext<CampaignPropsData>(
  {} as CampaignPropsData
);

export const CampaignUsersProvider: React.FC = ({ children }): JSX.Element => {
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
        toast.error('Erro ao pesquisar campanhas dos usuários');
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
      } catch (err) {
        toast.error('Falha ao vincular usuário');
      }
    },
    []
  );

  const removeCampaignUser = useCallback(async (id: string) => {
    try {
      await api.delete(`/campaigns/campaign-users/${id}`);
    } catch (err) {
      toast.error('Falha ao remover usuário');
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
        toast.error('Erro ao buscar campanhas associadas aos usuários');
        return [];
      }
    },
    []
  );

  const getCampaingUsers = useCallback(async (campaignId: string) => {
    try {
      const { data } = await api.get(`/campaigns/campaign-users/all`, {
        params: {
          campaignId,
        },
      });
      return data.campaignUsers;
    } catch (err) {
      toast.error('Erro ao buscar as campanhas');
      return [];
    }
  }, []);

  const CampaignDataValue = useMemo(() => {
    return {
      searchCampaignUsers,
      signNewCampaignUser,
      getCampaignUsersSigned,
      removeCampaignUser,
      getCampaingUsers,
    };
  }, [
    searchCampaignUsers,
    signNewCampaignUser,
    getCampaignUsersSigned,
    removeCampaignUser,
    getCampaingUsers,
  ]);

  return (
    <CampaignUsersContext.Provider value={CampaignDataValue}>
      {children}
    </CampaignUsersContext.Provider>
  );
};
