import { Paginate } from 'interfaces';
import {
  Startup,
  StartupSocialMedia,
  StartupMember,
} from 'interfaces/startups';
import React, { createContext, useCallback, useMemo, useReducer } from 'react';
import { toast } from 'react-toastify';
import { api } from 'services/api';
import {
  StartupsDefaultValues,
  StartupsReducer,
} from './reducers/StartupsReducer';

interface StartupsPropsData {
  startupsList: Startup[];
  favoriteStartups: string[];
  startup: Startup;
  members: StartupMember[];
  socialMedias: StartupSocialMedia[];
  paginate: Paginate;
  getStartups: (params?: any) => Promise<void>;
  getFavoriteStartups: () => Promise<void>;
  viewStartup: (startupId: string) => Promise<void>;
  favoriteStartupToUser: (startupId: string) => Promise<void>;
  unfavoriteStartupToUser: (startupId: string) => Promise<void>;
  getStartupSocialMedias: (startupId: string) => Promise<void>;
  getStartupMembers: (startupId: string) => Promise<void>;
}

export const StartupsContext = createContext<StartupsPropsData>(
  {} as StartupsPropsData
);

export const StartupsProvider: React.FC = ({ children }): JSX.Element => {
  const [dataReducer, dispatch] = useReducer(
    StartupsReducer,
    StartupsDefaultValues
  );

  const getStartups = useCallback(
    async (params?: any) => {
      try {
        dispatch({ type: 'SET_LOADING', loading: true });
        const { data: responseData } = await api.get(`/startups/list`, {
          params,
        });
        dispatch({ type: 'SET_PAGINATE', paginate: responseData.paginate });
        dispatch({ type: 'SET_LOADING', loading: false });
        dispatch({
          type: 'SET_STARTUPS_LIST',
          startupsList: responseData.startupList,
        });
      } catch (error) {
        toast.error('Erro ao buscar startups');
      }
    },
    [dispatch]
  );

  const getFavoriteStartups = useCallback(async () => {
    try {
      dispatch({ type: 'SET_LOADING', loading: true });
      const { data: responseData } = await api.get(`/startups/favorite`);
      dispatch({ type: 'SET_LOADING', loading: false });
      dispatch({
        type: 'SET_FAVORITE_STARTUPS',
        favoriteStartups: responseData.favoriteStartups,
      });
    } catch (error) {
      toast.error('Erro ao buscar startups favoritas');
    }
  }, [dispatch]);

  const favoriteStartupToUser = useCallback(
    async (startupId: string) => {
      try {
        await api.post(`/startups/favorite/${startupId}`);
      } catch (error) {
        toast.error('Erro ao favoritar a startup');
      }
    },
    [dispatch]
  );

  const unfavoriteStartupToUser = useCallback(
    async (startupId: string) => {
      try {
        await api.post(`/startups/unfavorite/${startupId}`);
      } catch (error) {
        toast.error('Erro ao desfavoritar a startup');
      }
    },
    [dispatch]
  );

  const viewStartup = useCallback(
    async (startupId: string) => {
      try {
        const { data: responseData } = await api.get(`/startups/${startupId}`);
        dispatch({ type: 'SET_STARTUP', startup: responseData.startup });
      } catch (error) {
        toast.error('Erro ao buscar a startup');
      }
    },
    [dispatch]
  );

  const getStartupSocialMedias = useCallback(
    async (startupId: string) => {
      try {
        const { data: responseData } = await api.get(
          `/startups/social-medias/${startupId}`
        );
        dispatch({
          type: 'SET_SOCIAL_MEDIAS',
          socialMedias: responseData.socialMedias,
        });
      } catch (error) {
        toast.error('Erro ao buscar as mídias sociais da startup');
      }
    },
    [dispatch]
  );

  const getStartupMembers = useCallback(
    async (startupId: string) => {
      try {
        const { data: responseData } = await api.get(
          `/startups/members/${startupId}`
        );
        dispatch({ type: 'SET_MEMBERS', members: responseData.members });
      } catch (error) {
        toast.error('Erro ao buscar os membros da startup');
      }
    },
    [dispatch]
  );

  const StartupDataValue = useMemo(() => {
    return {
      ...dataReducer,
      getStartups,
      getFavoriteStartups,
      viewStartup,
      favoriteStartupToUser,
      unfavoriteStartupToUser,
      getStartupSocialMedias,
      getStartupMembers,
    };
  }, [
    dataReducer,
    getStartups,
    getFavoriteStartups,
    viewStartup,
    favoriteStartupToUser,
    unfavoriteStartupToUser,
    getStartupSocialMedias,
    getStartupMembers,
  ]);

  return (
    <StartupsContext.Provider value={StartupDataValue}>
      {children}
    </StartupsContext.Provider>
  );
};
