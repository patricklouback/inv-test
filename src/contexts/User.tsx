/* eslint-disable prettier/prettier */
import { IdeaKanbamStep } from 'interfaces/idea';
import { User } from 'interfaces/user';
import React, { createContext, useCallback, useMemo, useReducer } from 'react';
import { toast } from 'react-toastify';
import { api } from 'services/api';
import { UserDefaultValues, UserReducer } from './reducers/UserReducer';

type UserOptions = Pick<User, 'id' | 'name'>;
interface GetUserOptionsParams {
  search: string;
}

export interface UserEvaluationCriteriasData {
  id: number;
  title: string;
  createdAt: string;
  criteriaStep: IdeaKanbamStep;
  status: string;
  ideaId: string;
}

interface UserPropsData {
  getUser: () => Promise<void>;
  getUserOptions: (params: GetUserOptionsParams) => Promise<UserOptions[]>;
  editImageProfile: (file: any) => Promise<void>;
  listTopUsers: () => Promise<User[]>;
  countMembers: () => Promise<any>;
  getEngagementRanking: (params?: any) => Promise<void>;
  getUsersEvaluationCriterias: () => Promise<UserEvaluationCriteriasData[]>;
  loading: boolean;
  user: User;
  engagementRanking: Array<{
    rank: string;
    name: string;
    image: string;
    points: string;
    createdIdeas: string;
    comments: string;
    likes: string;
  }>;
}

export const UserContext = createContext<UserPropsData>({} as UserPropsData);

export const ProviderUser: React.FC = ({ children }): JSX.Element => {
  const [dataReducer, dispatch] = useReducer(UserReducer, UserDefaultValues);

  const getUser = useCallback(async () => {
    try {
      dispatch({ type: 'SET_LOADING', loading: true });
      const {
        data: { user },
      } = await api.get('/users/me');
      dispatch({ type: 'SET_USER', user });
      dispatch({ type: 'SET_LOADING', loading: false });
    } catch (error) {
      toast.error('Error interno!');
    }
  }, [dispatch]);

  const listTopUsers = useCallback(async () => {
    try {
      const {
        data: { users },
      } = await api.get('/users/top');
      return users;
    } catch (error) {
      toast.error('Error interno!');
      return [];
    }
  }, []);

  const getUserOptions = useCallback(async (params: GetUserOptionsParams) => {
    try {
      const { data } = await api.get('/users/options', {
        params,
      });

      return data.users;
    } catch (error) {
      toast.error('Erro ao buscar usuários!');
      return [];
    }
  }, []);

  const editImageProfile = useCallback(
    async file => {
      try {
        dispatch({ type: 'SET_LOADING', loading: true });

        await api.put('/users/profile-image', file);
        await getUser();
        dispatch({ type: 'SET_LOADING', loading: false });
      } catch (error) {
        toast.error('Error interno!');
      }
    },
    [dispatch, getUser]
  );

  const countMembers = useCallback(async () => {
    try {
      dispatch({ type: 'SET_LOADING', loading: true });

      const { data } = await api.get('/users/count');

      dispatch({ type: 'SET_LOADING', loading: false });
      return data;
    } catch (error) {
      toast.error('Erro ao buscar taxas de usuários!');
    }
  }, [dispatch]);

  const getEngagementRanking = useCallback(
    async (params?: any) => {
      try {
        dispatch({ type: 'SET_LOADING', loading: true });

        const { data } = await api.get('/users/detailed-rank', {
          params,
        });

        dispatch({
          type: 'SET_ENGAGEMENT_RANKING',
          engagementRanking: data,
        });

        dispatch({ type: 'SET_LOADING', loading: false });
      } catch (err) {
        toast.error(
          err?.response?.data?.message || 'Erro ao buscar ranking de interações'
        );
      }
    },
    [dispatch]
  );

  const getUsersEvaluationCriterias = useCallback(async () => {
    try {
      dispatch({ type: 'SET_LOADING', loading: true });

      const { data } = await api.get('/users/evaluation-criterias');

      // dispatch({
      //   type: 'SET_USERS_EVALUATION_CRITERIAS',
      //   usersEvaluationCriterias: data,
      // });

      dispatch({ type: 'SET_LOADING', loading: false });

      return data;
    } catch (err) {
      toast.error(
        err?.response?.data?.message || 'Erro ao buscar critérios de avaliação'
      );
    }
  }, [dispatch]);

  const UserDataValue = useMemo(() => {
    return {
      ...dataReducer,
      getUser,
      editImageProfile,
      getUserOptions,
      listTopUsers,
      countMembers,
      getEngagementRanking,
      getUsersEvaluationCriterias,
    };
  }, [
    dataReducer,
    getUser,
    editImageProfile,
    getUserOptions,
    listTopUsers,
    countMembers,
    getEngagementRanking,
    getUsersEvaluationCriterias,
  ]);

  return (
    <UserContext.Provider value={UserDataValue}>
      {children}
    </UserContext.Provider>
  );
};
