import { Paginate } from 'interfaces/paginate';
import { User, UserRanked } from 'interfaces/user';
import { createContext, useCallback, useMemo, useReducer } from 'react';
import { toast } from 'react-toastify';
import { api } from 'services/api';
import {
  RankUserDefaultValues,
  RankUserReducer,
} from './reducers/RankUserReducer';

interface UsersLoadParams {
  limit?: number;
  offset?: number;
  search?: string;
  page?: number;
  orderColumn?: 'createdAt';
  orderOrientation?: 'asc' | 'desc';
  departamentIds?: string;
  areaIds?: string;
}

interface RankUserProps {
  users: User[];
  loading: boolean;
  usersRanked: UserRanked[];
  paginate: Paginate;
  getUsers: () => Promise<void>;
  getUsersRanked?: (params?: UsersLoadParams) => Promise<void>;
}

export const RankUsersContext = createContext<RankUserProps>(
  {} as RankUserProps
);

export const ProviderRankUsers = ({ children }): JSX.Element => {
  const [dataReducer, dispatch] = useReducer(
    RankUserReducer,
    RankUserDefaultValues
  );

  const getUsers = useCallback(async () => {
    try {
      dispatch({ type: 'SET_LOADING', loading: true });
      const { data } = await api.get('/users/list');
      dispatch({ type: 'SET_USERS', users: data.users });
      dispatch({ type: 'SET_LOADING', loading: false });
    } catch (error) {
      toast.info('Lista de usuários vazia');
    }
  }, [dispatch]);

  const getUsersRanked = useCallback(
    async (params = {}) => {
      try {
        dispatch({ type: 'SET_LOADING', loading: true });
        const { data } = await api.get('/users/rank', { params });
        dispatch({
          type: 'SET_USERS_RANKED',
          usersRanked: data.usersRanked,
        });
        dispatch({ type: 'SET_PAGINATE', paginate: data.paginate });
        dispatch({ type: 'SET_LOADING', loading: false });
      } catch (error) {
        toast.info('Erro ao buscar ranking de usuários');
      }
    },
    [dispatch]
  );

  const DataValues = useMemo(() => {
    return {
      ...dataReducer,
      getUsers,
      getUsersRanked,
    };
  }, [getUsers, getUsersRanked, dataReducer]);

  return (
    <RankUsersContext.Provider value={DataValues}>
      {children}
    </RankUsersContext.Provider>
  );
};
